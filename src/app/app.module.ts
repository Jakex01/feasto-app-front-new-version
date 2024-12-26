import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainNavbarComponent} from "./main-navbar/main-navbar.component";
import {RestaurantPageComponent} from "./restaurant-page/restaurant-page.component";
import {CreateRestaurantComponent} from "./create-restaurant/create-restaurant.component";
import {TestCompComponent} from "./test-comp/test-comp.component";
import {RestaurantsListComponent} from "./restaurants-list/restaurants-list.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ObjectToArrayPipe} from "./pipes/ObjectToArrayPipe";
import {OffCanvasCartComponent} from "./off-canvas-cart/off-canvas-cart.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MessageExchangeComponent} from "./pages/message-exchange/message-exchange.component";
import {OrderStatusFilterPipe} from "./pipes/OrderStatusFilterPipe";
import {RestaurantCardComponent} from "./shared/restaurant-card/restaurant-card.component";
import {FilterPanelComponent} from "./shared/filter-panel/filter-panel.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {CreateRestaurantCardComponent} from "./shared/create-restaurant-card/create-restaurant-card.component";
import {
  CreateRestaurantLocationComponent
} from "./shared/create-restaurant-location/create-restaurant-location.component";
import {
  CreateRestaurantMenuItemComponent
} from "./shared/create-restaurant-menu-item/create-restaurant-menu-item.component";
import {SubmitRestaurantComponent} from "./shared/submit-restaurant/submit-restaurant.component";
import {RestaurantDescOpinionComponent} from "./shared/restaurant-desc-opinion/restaurant-desc-opinion.component";
import {RestaurantStatisticsComponent} from "./restaurant-statistics/restaurant-statistics.component";
import {BaseChartDirective} from "ng2-charts";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatTab, MatTabsModule} from "@angular/material/tabs";
import {MatList, MatListItem} from "@angular/material/list";
import {UpdateRestaurantDataComponent} from "./shared/update-restaurant-data/update-restaurant-data.component";
import {
    RestaurantItemsListAdminComponent
} from "./shared/restaurant-items-list-admin/restaurant-items-list-admin.component";
import {RegisterFinalVersionComponent} from "./register-final-version/register-final-version.component";
import {LoginPageComponent} from "./authentication/login-page/login-page.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {RegisterPageComponent} from "./authentication/register-page/register-page.component";
import {MatDivider} from "@angular/material/divider";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {
    OffCanvasAccountManagementComponent
} from "./off-canvas-account-management/off-canvas-account-management.component";
import {OrdersRestaurantSideComponent} from "./orders-restaurant-side/orders-restaurant-side.component";
import {MatChip, MatChipsModule} from "@angular/material/chips";
import {ClientsListComponent} from "./clients-list/clients-list.component";
import {ChatModalComponent} from "./chat-modal/chat-modal.component";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatTooltip} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainPageComponent,
    RestaurantStatisticsComponent,
    RestaurantsListComponent,
    TestCompComponent,
    CreateRestaurantComponent,
    ObjectToArrayPipe,
    RestaurantPageComponent,
    RegisterFinalVersionComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MessageExchangeComponent,
    OrderStatusFilterPipe,
    OrdersRestaurantSideComponent,
    ClientsListComponent,
    ChatModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatTabsModule,
    MatLabel,
    MatSelectModule,
    MatNativeDateModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    OffCanvasCartComponent,
    CommonModule,
    RestaurantCardComponent,
    FilterPanelComponent,
    MatInput,
    MatIcon,
    MatFabButton,
    MatButton,
    MatPaginator,
    MatCardTitle,
    MatCard,
    MatCardContent,
    CreateRestaurantCardComponent,
    CreateRestaurantLocationComponent,
    CreateRestaurantMenuItemComponent,
    SubmitRestaurantComponent,
    RestaurantDescOpinionComponent,
    BaseChartDirective,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatDatepicker,
    MatHeaderCell,
    MatHeaderCellDef,
    MatTable,
    MatTab,
    MatCell,
    MatCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatList,
    MatListItem,
    MatIconButton,
    UpdateRestaurantDataComponent,
    RestaurantItemsListAdminComponent,
    MatCheckbox,
    MatCardHeader,
    MatDivider,
    MatCardActions,
    MatSlideToggle,
    OffCanvasAccountManagementComponent,
    MatChip,
    MatDialogContent,
    MatTooltip,
    MatDialogActions,
    MatDialogTitle,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
