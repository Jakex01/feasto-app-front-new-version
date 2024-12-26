import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalManagerService {

  private modalRef: ElementRef;

  constructor() {}

  register(modalRef: ElementRef) {
    this.modalRef = modalRef;
  }

  open() {
    (this.modalRef.nativeElement as any).show(); // Tutaj wywołaj metodę 'show' twojego modalu
  }
}
