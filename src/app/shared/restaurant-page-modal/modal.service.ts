import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private display = new BehaviorSubject<'open' | 'close'>('close');

  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open(): void {
    this.display.next('open');
  }

  close(): void {
    this.display.next('close');
  }
}
