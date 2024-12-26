import {Component, Input, OnInit} from '@angular/core';
import {RestaurantDtoModel} from "../../model/RestaurantDtoModel";
import {RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    NgbTooltip,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent implements OnInit{

  @Input() restaurant: RestaurantDtoModel;

  checkIfOpened(openingHours: string): boolean {
    const currentTime = new Date();
    const openingParts = openingHours.split('-')
      .map(part => part.split(':'));

    const openingTime = new Date(currentTime);
    openingTime.setHours(parseInt(openingParts[0][0]), parseInt(openingParts[0][1]));
    const closingTime = new Date(currentTime);
    closingTime.setHours(parseInt(openingParts[1][0]), parseInt(openingParts[1][1]));

    return currentTime >= openingTime && currentTime <= closingTime;
  }
  ngOnInit(): void {
  }

  getImageUrl(photoUrl: string): string {
    if (!photoUrl) {
      return 'assets/delicious1.jpg';
    }
    if (photoUrl.includes("drive.google.com")) {
      const fileId = this.extractGoogleDriveFileId(photoUrl);
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
    if (photoUrl.includes("lh3.googleusercontent.com")) {
      return photoUrl;
    }
    console.warn('Unsupported image URL format:', photoUrl);
    return photoUrl;
    return 'assets/delicious1.jpg';
  }
  private extractGoogleDriveFileId(url: string): string {
    const match = url.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  }


}
