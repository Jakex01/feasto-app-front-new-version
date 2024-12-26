import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubmitRestaurantService {
  private checkOperationFinishedSource = new BehaviorSubject<boolean>(false);
  currentMenuItem = this.checkOperationFinishedSource.asObservable();

  changeMenuItem(item: boolean) {
    this.checkOperationFinishedSource.next(item);
  }
}
