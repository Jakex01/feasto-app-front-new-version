import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {SizePriceModel} from "../../model/SizePriceModel";
import {MenuItemModel} from "../../model/MenuItemModel";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogAddMenuItemComponent} from "../dialog-add-menu-item/dialog-add-menu-item.component";
import {FoodAdditivesPriceModel} from "../../model/FoodAdditivesPriceModel";

@Component({
  selector: 'app-create-restaurant-menu-item',
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
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './create-restaurant-menu-item.component.html',
  styleUrl: './create-restaurant-menu-item.component.css'
})
export class CreateRestaurantMenuItemComponent implements OnInit {
  menuItemForm: FormGroup;
  @Output() menuItemSubmitted = new EventEmitter<MenuItemModel>();
  @Output() menuItemFinished = new EventEmitter<boolean>();

  readonly foodCategories = [
    'BREAKFAST', 'BRUNCH', 'LUNCH', 'DINNER', 'SANDWICH', 'BURGER', 'SOUP',
    'SALAD', 'DESSERT', 'SNACK', 'PASTA', 'PIZZA', 'SEAFOOD', 'VEGAN', 'VEGETARIAN', 'BEVERAGES'
  ];

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.menuItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      available: [false, Validators.required],
      foodCategory: ['', Validators.required],
      additives: this.fb.array([]),
      sizes: this.fb.array([])
    });
  }
  get additives(): FormArray {
    return this.menuItemForm.get('additives') as FormArray;
  }
  addAdditive(): void {
    this.additives.push(
      this.fb.group({
        name: ['', Validators.required],
        price: [0, [Validators.required, Validators.min(0)]],
      })
    );
  }

  removeAdditive(index: number): void {
    this.additives.removeAt(index);
  }
  get sizes() {
    return this.menuItemForm.get('sizes') as FormArray;
  }

  addSize() {
    const sizePriceGroup = this.fb.group({
      size: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+\.?\d{0,2}$/)]]
    });
    this.sizes.push(sizePriceGroup);
  }

  removeSize(index: number) {
    this.sizes.removeAt(index);
  }

  submitMenuItemForm() {
    if (this.menuItemForm.valid) {
      const sizesWithPrices: SizePriceModel[] = this.sizes.controls.map(control => {
        const sizeControl = control as FormGroup;
        return {
          size: sizeControl.value.size,
          price: parseFloat(sizeControl.value.price)
        };
      });

      const additives: FoodAdditivesPriceModel[] = this.additives.controls.map(control => {
        const foodAdditiveControl = control as FormGroup;
        return {
          foodAdditive: foodAdditiveControl.value.size,
          price: parseFloat(foodAdditiveControl.value.price)
        };
      });
      const menuItem: MenuItemModel = {
        name: this.menuItemForm.value.name,
        description: this.menuItemForm.value.description,
        available: this.menuItemForm.value.available,
        foodCategory: this.menuItemForm.value.foodCategory,
        sizesWithPrices: sizesWithPrices,
        foodAdditivePrices: additives
      };
      console.log(menuItem);
      this.menuItemSubmitted.emit(menuItem);
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px';
    dialogConfig.enterAnimationDuration = enterAnimationDuration;
    dialogConfig.exitAnimationDuration = exitAnimationDuration;
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = ['dialog-slide-in', 'dialog-slide-out'];

    const dialogRef = this.dialog.open(DialogAddMenuItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.menuItemFinished.emit(true);
      }
    });
  }
}
