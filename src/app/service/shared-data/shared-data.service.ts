import { Injectable } from '@angular/core';
import {MenuItemOrderModel} from "../../model/MenuItemOrderModel";
import {BehaviorSubject} from "rxjs";
import {MenuItemOrderUpdate} from "../../model/MenuItemOrderUpdate";
import {OrderRequest} from "../../model/request/OrderRequest";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private menuItemOrderSource = new BehaviorSubject<MenuItemOrderModel | null>(null);
  private orderRequestSource = new BehaviorSubject<OrderRequest | null>(null);

  currentMenuItemOrder$ = this.menuItemOrderSource.asObservable();
  currentOrderRequest$ = this.orderRequestSource.asObservable();

  updateMenuItemOrder(order: MenuItemOrderModel) {
    this.menuItemOrderSource.next(order);
  }

  updateCheckOutOrder(orderRequest: OrderRequest) {
    this.orderRequestSource.next(orderRequest);
  }

  getRecordCount(): number {
    const value = this.orderRequestSource.getValue()?.items;
    return value ? value.length : 0;
  }
}
