import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { ClientSignupComponent } from './components/pages/Client/client-signup/client-signup.component';
import { CustomerSignUpComponent } from './components/pages/Customer/customer-sign-up/customer-sign-up.component';
import { HomeComponent } from './components/shared/home/home.component';
import { DashboardComponent } from './components/pages/Admin/dashboard/dashboard.component';
import { ClientProfileComponent } from './components/pages/Client/client-profile/client-profile.component';
import { DriverProfileComponent } from './components/pages/Driver/driver-profile/driver-profile.component';
import { ClientAddplantComponent } from './components/pages/Client/client-addplant/client-addplant.component';
import { StoreComponent } from './components/shared/store/store.component';
import { CustomerAccountComponent } from './components/pages/Customer/customer-account/customer-account.component';
import { CustomerEditAccountComponent } from './components/pages/Customer/customer-edit-account/customer-edit-account.component';
import { CustomerOrderComponent } from './components/pages/Customer/customer-order/customer-order.component';
import { CartComponent } from './components/pages/Customer/cart/cart.component';
import { ClientAllPlantsComponent } from './components/pages/Client/client-all-plants/client-all-plants.component';
import { ClientAccountComponent } from './components/pages/Client/client-account/client-account.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: CustomerSignUpComponent,
  },
  {
    path: 'signup-client',
    component: ClientSignupComponent,
  },
  {
    path: 'signup-driver',
    component: HomeComponent, //mest add the driver sign up component
  },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'customer-dashboard',
    component: StoreComponent,
  },
  {
    path: 'driver-dashboard',
    component: DriverProfileComponent,
  },
  {
    path: 'client-profile',
    component: ClientProfileComponent,
  },
  {
    path: 'client-addplant',
    component: ClientAddplantComponent,
  },
  {
    path: 'client-plants',
    component: ClientAllPlantsComponent,
  },
  {
    path: 'client-account',
    component: ClientAccountComponent,
  },
  { path: 'store', component: StoreComponent },
  { path: 'store/:category', component: StoreComponent },
  { path: 'customer-account', component: CustomerAccountComponent },
  { path: 'customer-edit-account', component: CustomerEditAccountComponent },
  { path: 'customer-account/orders', component: CustomerOrderComponent },
  { path: 'cart', component: CartComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
