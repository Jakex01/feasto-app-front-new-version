import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { RestaurantInfoModel } from "../../model/RestaurantInfoModel";

interface FoodType {
  name: string;
}

@Component({
  selector: 'app-create-restaurant-card',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgOptimizedImage,
  ],
  templateUrl: './create-restaurant-card.component.html',
  styleUrl: './create-restaurant-card.component.css',
})
export class CreateRestaurantCardComponent {
  @Output() imageSelected = new EventEmitter<string | ArrayBuffer | null>();
  @Output() onSubmitForm = new EventEmitter<RestaurantInfoModel>();
  selectedImage: string | ArrayBuffer | null = null;
  fileError: string | null = null;
  submittedData: RestaurantInfoModel = {
    name: '',
    description: '',
    phoneNumber: '',
    foodType: '',
    openingHours: '',
  };


  form = new FormGroup(
    {
      restaurantName: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.maxLength(70)]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[+]?[0-9]{10,15}$'),
      ]),
      Opening: new FormControl('', [Validators.required]),
      Closing: new FormControl('', [Validators.required]),
      foodTypeControl: new FormControl('', Validators.required),
      photo: new FormControl<File | null>(null, Validators.required),

    },
    { validators: this.compareOpeningClosingTimes }
  );

  foodTypeControl = new FormControl<FoodType>(Validators.required);

  foodTypes: FoodType[] = [
    { name: 'Italian' },
    { name: 'Chinese' },
    { name: 'American' },
    { name: 'Tai' },
  ];

  compareOpeningClosingTimes(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    const opening = group.get('Opening')?.value;
    const closing = group.get('Closing')?.value;
    if (opening && closing && opening >= closing) {
      return { timeInvalid: true };
    }
    return null;
  }

  submitForm() {
    if (this.form.valid) {
      this.fillRestaurantInfo();
      this.onSubmitForm.emit(this.submittedData);
    }
  }

  fillRestaurantInfo() {
    this.submittedData.name = this.form.get('restaurantName')?.value ?? '';
    this.submittedData.description = this.form.get('description')?.value ?? '';
    this.submittedData.phoneNumber = this.form.get('phoneNumber')?.value ?? '';
    this.submittedData.foodType = this.form.get('foodTypeControl')?.value ?? '';
    this.submittedData.openingHours =
      `${this.form.get('Opening')?.value} - ${this.form.get('Closing')?.value}`;
  }

  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    for (let i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mimeString });
  }

  onFileSelect(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.fileError = 'Unsupported file format. Please upload JPEG or PNG.';
        this.selectedImage = null;
        this.form.get('photo')?.setValue(null);
        this.imageSelected.emit(null); // Emit null for invalid image
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.fileError = 'File size exceeds 5MB.';
        this.selectedImage = null;
        this.form.get('photo')?.setValue(null);
        this.imageSelected.emit(null); // Emit null for invalid image
        return;
      }
      this.fileError = null;
      this.form.get('photo')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.imageSelected.emit(this.selectedImage); // Emit the valid image
      };
      reader.readAsDataURL(file);
    }
  }


}
