import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {SharedCreateRestaurantDataService} from "../../service/shared-restaurant/shared-create-restaurant-data.service";
import {CreateRestaurantModel} from "../../model/CreateRestaurantModel";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatLine} from "@angular/material/core";
import {RestaurantService} from "../../service/restaurant-service/restaurant.service";

@Component({
  selector: 'app-submit-restaurant',
  standalone: true,
  imports: [
    MatCardActions,
    MatListItem,
    MatList,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    NgForOf,
    MatButton,
    MatLine,
    NgIf
  ],
  templateUrl: './submit-restaurant.component.html',
  styleUrl: './submit-restaurant.component.css'
})
export class SubmitRestaurantComponent implements OnDestroy, OnInit{
  // restaurantData: CreateRestaurantModel;
  subscription: Subscription;
  @Input() restaurantData!: CreateRestaurantModel;
  @Input() selectedImage: string | ArrayBuffer | null = null;

  constructor(private restaurantDataService: SharedCreateRestaurantDataService,
              private fb: FormBuilder,
              private restaurantService: RestaurantService) {
    this.subscription = this.restaurantDataService.currentRestaurantData.subscribe(data => {
      if (data) {
        this.restaurantData = data;
      }
    });
  }
  // Sample restaurant object
  restaurant = {
    name: 'La Piazza',
    city: 'Warsaw',
    street: 'Nowy Świat',
    streetNumber: '15A',
    postalCode: '00-001',
    country: 'Poland',
    menuItems: [
      {
        name: 'Margherita',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        available: true,
        sizes: [
          { size: 'Small', price: 20 },
          { size: 'Medium', price: 25 },
          { size: 'Large', price: 30 }
        ]
      },
      {
        name: 'Pepperoni',
        description: 'Spicy pepperoni with mozzarella and tomato',
        available: true,
        sizes: [
          { size: 'Medium', price: 28 },
          { size: 'Large', price: 35 }
        ]
      },
      {
        name: 'Vegetarian',
        description: 'Fresh vegetables with mozzarella and tomato sauce',
        available: false,
        sizes: [
          { size: 'Small', price: 22 },
          { size: 'Large', price: 32 }
        ]
      }
    ]
  };

  // Define your form
  locationForm: FormGroup;

  ngOnInit(): void {
    console.log(this.restaurantData);
    // Initialize the form (you can also bind this form to restaurant data if needed)
    this.locationForm = this.fb.group({
      city: [''],
      street: [''],
      streetNumber: [''],
      country: [''],
      postalCode: ['']
    });
  }

  // Submit handler for the location form (if you plan to use it)
  submitLocationForm(): void {
    if (this.locationForm.valid) {
      console.log('Location form data:', this.locationForm.value);
    }
  }

  // Method to handle editing the restaurant
  editRestaurant(): void {
    if (!this.restaurantData) {
      console.error('Restaurant data is missing');
      return;
    }
    console.log(this.restaurantData);
    this.restaurantService.postRestaurant(this.restaurantData).subscribe({
      next: (response) => {
        console.log('Restaurant created successfully:', response);
        const restaurantId = response.restaurantId;

        // If an image is selected, upload it
        if (this.selectedImage && typeof this.selectedImage === 'string') {
          const file = this.dataURLToFile(this.selectedImage, 'restaurant-image.png'); // Convert base64 string to file

          this.restaurantService.postImage(file, restaurantId).subscribe({
            next: () => {
              console.log('Image uploaded successfully');
              alert('Restaurant and image created successfully!');
              // Perform further actions, like navigation
            },
            error: (error) => {
              console.error('Error uploading image:', error);
              alert('Restaurant created, but image upload failed.');
            },
          });
        } else {
          alert('Restaurant created successfully, but no image was uploaded.');
        }
      },
      error: (error) => {
        console.error('Error creating/updating restaurant:', error);
        alert('Failed to create/update restaurant.');
      },
    });
  }

  // Helper function to convert Base64 to File
  private dataURLToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'; // Default MIME type
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // Method to handle deleting the restaurant
  deleteRestaurant(): void {
    // Logic to delete the restaurant (e.g., API call)
    console.log('Deleting restaurant:', this.restaurant);
  }

  // Method to go back to the restaurant form (if applicable)
  goBackToRestaurantForm(): void {
    // Logic to navigate back (if you're using a router, for example)
    console.log('Navigating back to restaurant form');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
