import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RatingResponse} from "../../model/response/RatingResponse";
import {RatingService} from "../../service/rating-service/rating.service";
import {RestaurantDescAndIdModel} from "../../model/RestaurantDescAndIdModel";

@Component({
  selector: 'app-restaurant-desc-opinion',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './restaurant-desc-opinion.component.html',
  styleUrl: './restaurant-desc-opinion.component.css'
})
export class RestaurantDescOpinionComponent implements OnInit{

  @Input() restaurant: RestaurantDescAndIdModel;

  CommentsByRestaurant: RatingResponse[] = [];
  isCommentVisible = false;
  ratingResponse: RatingResponse;
  stars: string[] = [];
    ngOnInit(): void {
      this.updateStars(this.restaurant.rating);
    }

  toggleCommentVisibility() {
    this.getAverageComment(this.restaurant.restaurantId, this.restaurant.rating)
    this.isCommentVisible = !this.isCommentVisible;
  }
  constructor(private ratingService: RatingService,
  ) {
  }
  updateStars(rating: number): void {
    this.stars = [];
    let hasHalfStarBeenAdded = false;

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        this.stars.push('star');
      } else if (!hasHalfStarBeenAdded && rating % 1 !== 0 && i - 1 < rating && i > rating) {
        this.stars.push('star_half');
        hasHalfStarBeenAdded = true;
      } else {
        this.stars.push('star_outline');
      }
    }
  }
  fetchAllComments() {

    if (this.restaurant && this.restaurant.restaurantId) {
      this.ratingService.getRestaurantComments(this.restaurant.restaurantId).subscribe({
        next: (response) => {
          this.CommentsByRestaurant = response;
          console.log('Comments:', response);
        },
        error: (error) => {
          console.error('Error fetching comments:', error);

        }
      });
    } else {
      console.error('Restaurant ID is not defined.');
    }

  }
  checkingRatingCreateDate(date: string): string {
    const today = new Date();
    const commentDate = new Date(date);
    let diffInDays = Math.floor((today.getTime() - commentDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 7) {
      return diffInDays === 0 ? `today` : `${diffInDays} days ago`;
    } else {
      return commentDate.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
  }
  getAverageComment(restaurantId: number, averageRating: number){
    this.ratingService.getAverageComment(restaurantId, averageRating)
      .subscribe({
        next: (rating) => {
          this.ratingResponse = rating;
          console.log(rating);
        },
        error: (err) => {
          console.error('Failed to load average rating:', err);
        }
      });
  }

}
