import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import { NgForOf } from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";

// Enum for FoodCategory
export enum FoodCategory {
  Appetizer = 'Appetizer',
  MainCourse = 'MainCourse',
  Dessert = 'Dessert',
  Beverage = 'Beverage'
}

// Enum for FoodAdditive
export enum FoodAdditive {
  Cheese = 'Cheese',
  Bacon = 'Bacon',
  Mushroom = 'Mushroom'
}

// Interface for Sizes with Prices
export interface SizesWithPrices {
  size: string;
  price: number;
}

// Interface for Menu Item
export interface MenuItem {
  menuItemId: number;
  name: string;
  description: string;
  available: boolean;
  foodCategory: FoodCategory;
  sizesWithPrices: SizesWithPrices[];
  lowestPrice: number;
  editing?: boolean;
}

@Component({
  selector: 'app-restaurant-items-list-admin',
  templateUrl: './restaurant-items-list-admin.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    ReactiveFormsModule,
    MatCardTitle,
    MatLabel,
    MatCardContent,
    NgForOf,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    FormsModule,
    MatList,
    MatListItem,
    MatIcon,
    MatIconButton
  ],
  styleUrls: ['./restaurant-items-list-admin.component.css']
})
export class RestaurantItemsListAdminComponent implements OnInit {
  menuItemsForm: FormGroup;
  menuItems: MenuItem[] = [];
  selectedMenuItem: MenuItem;
  // Selected filters
  selectedCategory: FoodCategory | null = null;
  selectedSize: string | null = null;

  constructor(private fb: FormBuilder) {}
  addNewItem(): void {
    this.menuItems1.push('Nowy Dodatek');
  }
  ngOnInit(): void {
    this.menuItemsForm = this.fb.group({
      menuItems: this.fb.array(this.getMenuItems())
    });
  }
  menuItems1: any[] = [
    { name: 'Dodatek 1', isEditing: false },
    { name: 'Dodatek 2', isEditing: false },
    { name: 'Dodatek 3', isEditing: false }
  ];

  toggleEdit1(item: any, index: number): void {
    if (item.isEditing) {
      // Handle saving edited item here if needed
    }
    item.isEditing = !item.isEditing;
  }

  removeItem(index: number): void {
    this.menuItems.splice(index, 1);
  }
  getMenuItems(): FormGroup[] {
    return [{
      menuItemId: 1,
      name: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta with eggs, cheese, bacon, and black pepper',
      available: true,
      foodCategory: FoodCategory.MainCourse,
      sizesWithPrices: [
        { size: 'Small', price: 5.99 },
        { size: 'Large', price: 9.99 }
      ],
      lowestPrice: 5.99,
      editing: false
    }].map(item => this.fb.group({
      ...item,
      sizesWithPrices: this.fb.array(
        item.sizesWithPrices.map(size => this.fb.group({
          size: [size.size],
          price: [size.price]
        }))
      )
    }));
  }

  get menuItemsArray(): FormArray {
    return this.menuItemsForm.get('menuItems') as FormArray;
  }

  getSizesWithPrices(index: number): FormArray {
    return this.menuItemsArray.at(index).get('sizesWithPrices') as FormArray;
  }

  // Getter for FoodCategory enum values
  get foodCategories(): string[] {
    return Object.values(FoodCategory);
  }

  // Unique sizes based on menu items data
  get availableSizes(): string[] {
    const sizes = new Set<string>();
    this.menuItemsArray.controls.forEach((item) => {
      const sizesArray = item.get('sizesWithPrices') as FormArray;
      sizesArray.controls.forEach((sizeControl) => {
        sizes.add(sizeControl.get('size')?.value);
      });
    });
    return Array.from(sizes);
  }

  toggleEdit(index: number): void {
    const item = this.menuItemsArray.at(index);
    item.get('editing')?.setValue(!item.get('editing')?.value);
  }

  saveItem(index: number): void {
    console.log('Saving item:', this.menuItemsArray.at(index).value);
    this.menuItemsArray.at(index).get('editing')?.setValue(false);
  }

  cancelEdit(index: number): void {
    this.menuItemsArray.at(index).get('editing')?.setValue(false);
  }
  onMenuItemChange(selectedItem: MenuItem): void {
    this.selectedMenuItem = selectedItem;
    this.menuItemsForm.patchValue(selectedItem);
  }

  // Filtered menu items based on selected filters
  get filteredMenuItems() {
    return this.menuItemsArray.controls.filter((item) => {
      const categoryMatch = !this.selectedCategory || item.get('foodCategory')?.value === this.selectedCategory;
      const sizesArray = item.get('sizesWithPrices') as FormArray;
      const sizeMatch = !this.selectedSize || sizesArray.controls.some(size => size.get('size')?.value === this.selectedSize);
      return categoryMatch && sizeMatch;
    });

  }
  getAdditives(index: number): FormArray {
    return this.menuItemsArray.at(index).get('foodAdditivePrices') as FormArray;
  }
  addAdditive(index: number): void {
    const additives = this.getAdditives(index);
    additives.push(
      this.fb.group({
        foodAdditive: [''],  // default name for the new additive
        price: [0]           // default price for the new additive
      })
    );
  }
  removeAdditive(menuIndex: number, additiveIndex: number): void {
    const additives = this.getAdditives(menuIndex);
    additives.removeAt(additiveIndex);
  }


}
