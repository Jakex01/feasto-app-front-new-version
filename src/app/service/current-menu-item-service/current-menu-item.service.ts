import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MenuItemOrderModel} from "../../model/MenuItemOrderModel";

@Injectable({
  providedIn: 'root'
})
export class CurrentMenuItemService {
  private menuItemSource = new BehaviorSubject<MenuItemOrderModel | null>(null);
  currentMenuItem = this.menuItemSource.asObservable();

  changeMenuItem(item: MenuItemOrderModel) {
    this.menuItemSource.next(item);
  }
}
