import {Component, ElementRef} from '@angular/core';
import {ModalManagerService} from "../../service/modal-service/modal-manager.service";


declare var bootstrap: any;
@Component({
  selector: 'app-menu-item-modal',
  standalone: true,
  imports: [],
  templateUrl: './menu-item-modal.component.html',
  styleUrl: './menu-item-modal.component.css'
})
export class MenuItemModalComponent {
  // private modalInstance: any;
  //
  // constructor(private elRef: ElementRef, private modalManager: ModalManagerService) {}
  //
  // ngOnInit(): void {
  //
  // }
  //
  // ngAfterViewInit(): void {
  //   this.modalInstance = new bootstrap.Modal(this.elRef.nativeElement.querySelector('#foodAdditiveModal'), {
  //     keyboard: false
  //   });
  //   this.modalManager.register(this);
  // }
  //
  // show() {
  //   this.modalInstance.show();
  // }
  //
  // hide() {
  //   this.modalInstance.hide();
  // }
}
