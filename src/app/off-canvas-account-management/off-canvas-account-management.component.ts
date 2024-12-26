import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as bootstrap from "bootstrap";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {AuthenticationService} from "../service/authentication-service/authentication.service";

@Component({
  selector: 'app-off-canvas-account-management',
  standalone: true,
  imports: [
    MatDivider,
    MatListItem,
    MatList,
    MatIcon,
    NgForOf
  ],
  templateUrl: './off-canvas-account-management.component.html',
  styleUrl: './off-canvas-account-management.component.css'
})
export class OffCanvasAccountManagementComponent implements OnInit{
  @ViewChild('modalManagement') modalElementRef: ElementRef;
  isManager: boolean = false;
  constructor(private authenticationService: AuthenticationService) {
  }
  showModal(): void {
    setTimeout(() => {
      if (this.modalElementRef.nativeElement) {
        const offcanvasElement = new bootstrap.Offcanvas(this.modalElementRef.nativeElement);
        offcanvasElement.show();
      }
    }, 0);
  }
  ngOnInit(): void {
    this.authenticationService.getCurrentlyLoggedUserRole().subscribe({
      next: (roles) => {
        this.isManager = roles.includes('ADMIN') || roles.includes('MANAGER');
      },
      error: (err) => {
        console.error('Failed to fetch user roles', err);
      }
    });
  }
}
