import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { ClientSignupComponent } from './components/pages/Client/client-signup/client-signup.component';
import { CustomerSignUpComponent } from './components/pages/Customer/customer-sign-up/customer-sign-up.component';
import { HomeComponent } from './components/shared/home/home.component';
import { DashboardComponent } from './components/pages/Admin/dashboard/dashboard.component';
import { ClientProfileComponent } from './components/pages/Client/client-profile/client-profile.component';
import { CustomerProfileComponent } from './components/pages/Customer/customer-profile/customer-profile.component';
import { DriverProfileComponent } from './components/pages/Driver/driver-profile/driver-profile.component';

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
    path: 'client-dashboard',
    component: ClientProfileComponent,
  },
  {
    path: 'customer-dashboard',
    component: CustomerProfileComponent,
  },
  {
    path: 'driver-dashboard',
    component: DriverProfileComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
const routes: Routes = [
  { path: 'driver', component: DriverComponent },
];
