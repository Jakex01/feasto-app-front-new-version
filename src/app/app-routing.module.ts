import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RestaurantsListComponent} from "./restaurants-list/restaurants-list.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {CreateRestaurantComponent} from "./create-restaurant/create-restaurant.component";
import {RestaurantPageComponent} from "./restaurant-page/restaurant-page.component";
import {TestCompComponent} from "./test-comp/test-comp.component";
import {LoginPageComponent} from "./authentication/login-page/login-page.component";
import {RegisterPageComponent} from "./authentication/register-page/register-page.component";
import {OrderCheckoutPageComponent} from "./order-checkout-page/order-checkout-page.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {MessageExchangeComponent} from "./pages/message-exchange/message-exchange.component";
import {RestaurantStatisticsComponent} from "./restaurant-statistics/restaurant-statistics.component";
import {
  RestaurantItemsListAdminComponent
} from "./shared/restaurant-items-list-admin/restaurant-items-list-admin.component";
import {RegisterFinalVersionComponent} from "./register-final-version/register-final-version.component";
import {SuccessPaymentComponent} from "./pages/success-payment/success-payment.component";
import {FailurePaymentComponent} from "./pages/failure-payment/failure-payment.component";
import {RedirectComponent} from "./pages/redirect/redirect.component";
import {authGuard} from "./authentication/auth/auth.guard";
import {OrdersRestaurantSideComponent} from "./orders-restaurant-side/orders-restaurant-side.component";
import {ClientsListComponent} from "./clients-list/clients-list.component";



const routes: Routes = [

  { path: 'restaurants',
    component: RestaurantsListComponent,
    data: { animation: 'RestaurantsPage' },
    canActivate: [authGuard]
  },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [authGuard]
  },
  {
    path:'add-restaurant',
    component:CreateRestaurantComponent,
    canActivate: [authGuard]
  },
  {
    path: 'restaurants/:id',
    component: RestaurantPageComponent,
    data: { animation: 'RestaurantPage' },
    canActivate: [authGuard]
  },
  {
    path: 'testing',
    component: TestCompComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'checkout',
    component: OrderCheckoutPageComponent,
    canActivate: [authGuard]
  },
  {
    path:'orders',
    component: OrdersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    component: MessageExchangeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'stats',
    component: RestaurantStatisticsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'test-stats',
    component: RestaurantItemsListAdminComponent
  },
  {
    path: 'register-test',
    component: RegisterFinalVersionComponent
  },
  {
    path: 'payment-success',
    component: SuccessPaymentComponent
  },
  {
    path: 'payment-failure',
    component: FailurePaymentComponent
  },
  {
    path: 'redirect',
    component: RedirectComponent
  },
  {
    path: 'orders-restaurant',
    component: OrdersRestaurantSideComponent
  },
  {
    path: 'customers-list',
    component: ClientsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
