import {Component, EventEmitter, Output} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import {LocationRestaurantModel} from "../../model/LocationRestaurantModel";

@Component({
  selector: 'app-create-restaurant-location',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatSelectModule
  ],
  templateUrl: './create-restaurant-location.component.html',
  styleUrls: ['./create-restaurant-location.component.css']
})
export class CreateRestaurantLocationComponent {
  @Output() onSubmitForm = new EventEmitter<LocationRestaurantModel>();
  @Output() requestToShowRestaurantInfo = new EventEmitter<void>();

  location: LocationRestaurantModel = {
    city: '',
    street: '',
    streetNumber: '',
    country: '',
    postalCode: '',
    current: false
  }

  locationForm = new FormGroup({
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)]),
    current: new FormControl(false)
  });
  submitLocationForm() {
    if (this.locationForm.valid) {
      console.log("Form data:", this.locationForm.value);
      this.fillLocation();
      this.onSubmitForm.emit(this.location);
    }
  }
  goBackToRestaurantForm() {
    this.requestToShowRestaurantInfo.emit();
  }
  fillLocation() {
    this.location.city = this.locationForm.value.city ?? "";
    this.location.street = this.locationForm.value.street ?? "";
    this.location.country = this.locationForm.value.country ?? "";
    this.location.streetNumber = this.locationForm.value.streetNumber ?? "";
    this.location.postalCode = this.locationForm.value.postalCode ?? "";
    this.location.current = this.locationForm.value.current ?? false;

  }
}
