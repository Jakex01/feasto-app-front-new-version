import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";

type EditableFieldKeys = 'name' | 'description' | 'phoneNumber' | 'openingHours' | 'foodType' | 'image' | 'city' | 'street' | 'streetNumber' | 'country' | 'postalCode';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-update-restaurant-data',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './update-restaurant-data.component.html',
  styleUrl: './update-restaurant-data.component.css'
})
export class UpdateRestaurantDataComponent implements OnInit {
  restaurantForm: FormGroup;
  // @Output() save = new EventEmitter<void>();
  selectedRestaurant: Restaurant | null = null;
  constructor(private fb: FormBuilder) { }
  editableFields: { [key in EditableFieldKeys]: boolean } = {
    name: false,
    description: false,
    phoneNumber: false,
    openingHours: false,
    foodType: false,
    image: false,
    city: false,
    street: false,
    streetNumber: false,
    country: false,
    postalCode: false
  };
  ngOnInit(): void {
    this.createForm();
  }
  restaurants: Restaurant[] = [
    { id: 1, name: 'Pizza Place', address: '123 Main St', phone: '123-456-7890' },
    { id: 2, name: 'Sushi Spot', address: '456 Side St', phone: '987-654-3210' }
  ];
  createForm() {
    this.restaurantForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      openingHours: [{ value: '', disabled: true }],
      foodType: [{ value: '', disabled: true }],
      image: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      street: [{ value: '', disabled: true }],
      streetNumber: [{ value: '', disabled: true }],
      country: [{ value: '', disabled: true }],
      postalCode: [{ value: '', disabled: true }]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log('Selected file:', file);
    }
  }
  onRestaurantChange(): void {
    if (this.selectedRestaurant) {
      this.restaurantForm.patchValue({
        name: this.selectedRestaurant.name,
        address: this.selectedRestaurant.address,
        phone: this.selectedRestaurant.phone
      });
    }
  }
  saveRestaurant() {
    Object.keys(this.editableFields).forEach(field => {
      this.editableFields[field as EditableFieldKeys] = false;
      this.restaurantForm.get(field)?.disable();
    });
  }

  toggleFieldEdit(field: EditableFieldKeys) {
    this.editableFields[field] = !this.editableFields[field];
    const control = this.restaurantForm.get(field);
    if (control) {
      this.editableFields[field] ? control.enable() : control.disable();
    }
  }


}
