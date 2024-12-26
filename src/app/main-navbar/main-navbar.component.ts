import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrentMenuItemService} from "../service/current-menu-item-service/current-menu-item.service";
import {MenuItemOrderModel} from "../model/MenuItemOrderModel";
import {OffCanvasCartComponent} from "../off-canvas-cart/off-canvas-cart.component";
import {LocationModel} from "../model/LocationModel";
import {LocationService} from "../service/location-service/location.service";
import {LocationRequest} from "../model/request/LocationRequest";
import {SharedDataService} from "../service/shared-data/shared-data.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication-service/authentication.service";
import {CartService} from "../service/cart-service/cart.service";
import {CartItemResponse} from "../model/response/CartItemResponse";
import {
  OffCanvasAccountManagementComponent
} from "../off-canvas-account-management/off-canvas-account-management.component";

interface DateInfo {
  day: string;
  date: string;
}
interface TimeSlot {
  time: string;
  selected: boolean;
}
interface SubmitedDate{
  date: string,
  hour: string
}
@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})


export class MainNavbarComponent implements OnInit{

  currentLocation: String = '';
  currentMenuItem: MenuItemOrderModel | null = null;
  locationItem: LocationModel = {
    id: 0,
    city: '',
    street: '',
    streetNumber: '',
    country: '',
    postalCode: '',
    locationName: '',
    current: false
  };

  @ViewChild(OffCanvasCartComponent) childComponent: OffCanvasCartComponent;
  @ViewChild(OffCanvasAccountManagementComponent) childComponentAcc: OffCanvasCartComponent;
  constructor(private menuItemService: CurrentMenuItemService,
              private locationService: LocationService,
              private sharedDataService: SharedDataService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private cartService: CartService
              ) {}
  selectedDeliveryTime: string;
  deliveryTimeOptions: string[] = [];
  selectedDeliveryStreetName: string;
  selectedPostalCode: string;
  displayDeliveryTime: string = 'Pick up now';
  selectedLocationName: string;
  city: string;
  public timeSlots: TimeSlot[] = [];

  locations: LocationModel[] = [];

  public dates: DateInfo[][] = this.generateDateSlides();

  private generateDateSlides(): DateInfo[][] {
    let currentDay = new Date();
    const daysOfWeek = [];
    const daysFormatOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    for (let i = 0; i < 6; i++) {
      const newDate = new Date(currentDay);
      newDate.setDate(currentDay.getDate() + i);
      let dayLabel = newDate.toLocaleDateString('en-US', { weekday: 'short' });

      // Custom labels for today and tomorrow
      if (i === 0) {
        dayLabel = 'Today';
      } else if (i === 1) {
        dayLabel = 'Tomorrow';
      }

      daysOfWeek.push({
        day: dayLabel,
        date: newDate.toLocaleDateString('en-US', daysFormatOptions)
      });
    }
    return [daysOfWeek.slice(0, 3), daysOfWeek.slice(3, 6)];
  }
  selectedHour: string = '';

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  isSelectedHour(hour: string): boolean {
    return this.selectedHour === hour;  // Check if the hour is the selected hour
  }
  selectedDate: string = '';

  selectDate(date: string) {
    this.generateTimeSlots();
    this.selectedDate = date; // Set the selected date
  }
  saveDate(){
    if (this.selectedDate && this.selectedHour) {
      const myDate: SubmitedDate = {
        date: this.selectedDate,
        hour: this.selectedHour
      };

      localStorage.setItem('selectedDateHour', JSON.stringify(myDate));
      const storedData = localStorage.getItem('selectedDateHour');
    }
  }

  isSelectedDate(date: string): boolean {
    return this.selectedDate === date;
  }
  loadDateFromLocalStorage() {
    const storedData = localStorage.getItem('selectedDateHour');
    if (storedData) {
      const myDate = JSON.parse(storedData);
      this.selectedDate = myDate.date;
      this.selectedHour = myDate.hour;
    }
  }
   number_of_items: number;
  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (response: CartItemResponse[])=>{
        this.number_of_items = response.length;
      }, error: (error)=>{
        console.error('Error fetching locations:', error);
      },
    });
    this.loadDateFromLocalStorage();
    this.initializeTimeSlots();
    this.generateDeliveryTimeOptions();
    this.locationService.getCurrentLocation().subscribe({
      next: (response: string) => {
        this.currentLocation = response;
      },
      error: (error) => {
        console.error("Error fetching location", error);
      },
    });

    this.locationService.getAllLocationsByUser().subscribe({
      next: (response: LocationModel[])=>{
        this.locations = response;
        const currentLocation = response.find(location => location.current);
        this.locationItem = currentLocation || {
          id: 0,
          city: '',
          street: '',
          streetNumber: '',
          country: '',
          postalCode: '',
          locationName: '',
          current: false
        };
      }, error: (error)=>{
        console.error('Error fetching locations:', error);
      },
    });


    this.menuItemService.currentMenuItem.subscribe(item => {
      this.currentMenuItem = item;
    });

}
  parentToChild(){
  this.childComponent.showModal();
  }
  parentToChildAcc() {
    this.childComponentAcc.showModal();
  }

  generateDeliveryTimeOptions(): void {
    const now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    if (minutes > 30) {
      hour++;
    }

    while (hour < 22) {
      this.deliveryTimeOptions.push(this.formatTime(hour, 0));
      this.deliveryTimeOptions.push(this.formatTime(hour, 30));
      hour++;
    }
  }

  formatTime(hour: number, minutes: number): string {
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  formatPostalCode(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d]/g, ''); // Remove non-digits

    // Adding a hyphen after the second digit
    if (value.length >= 2) {
      value = value.substring(0, 2) + '-' + value.substring(2, 5);
    }

    this.selectedPostalCode = value; // Update the bound value
    input.value = value; // Update the input's displayed value
  }
  saveLocation() {
    const newLocation: LocationRequest = {
      city: this.city,
      street: this.selectedDeliveryStreetName,
      streetNumber: "30",
      country: "Poland",
      postalCode: this.selectedPostalCode,
      locationName: this.selectedLocationName,
      current: false

    };
    this.locationService.postLocation(newLocation)
      .subscribe({
        next: (response: any)=>{
          const locationResponse = response as LocationModel;
          this.locations = [...this.locations, locationResponse];
        },

      });

    this.selectedPostalCode = '';
    this.city = '';
    this.selectedDeliveryStreetName = '';
  }

  selectLocation(location: LocationModel) {
    this.locations.forEach(loc => loc.current = false);
    const foundLocation = this.locations.find(loc => loc.id === location.id);
    if (foundLocation) {
      foundLocation.current = true;
      this.selectedDeliveryStreetName = `${foundLocation.street} ${foundLocation.streetNumber}`;
      this.locationService.updateLocation(foundLocation.id).subscribe(
        response => {
          console.log('Location updated', response);
        },
        error => {
          console.error('Error updating location', error);
        }
      );
    }

  }
  private initializeTimeSlots(): void {
    this.timeSlots = [];
    let currentHour = new Date().getHours();
    let startHour = currentHour < 20 ? currentHour + 1 : 8;

    for (let hour = startHour; hour <= 20; hour++) {
      this.timeSlots.push({ time: `${hour}:00`, selected: false });
    }
  }
  private generateTimeSlots(): void {
    const today = new Date().toDateString();
    const isToday = new Date(this.selectedDate).toDateString() === today;

    this.timeSlots = [];
    const startHour = isToday ? new Date().getHours() + 1 : 8;
    const endHour = 20;

    for (let hour = startHour; hour <= endHour; hour++) {
      this.timeSlots.push({ time: `${hour}:00`, selected: false });
    }
  }
  logOut(){
    this.authenticationService.logOut();
  }

  protected readonly location = location;
}
