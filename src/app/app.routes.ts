import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { ClientSignupComponent } from './components/pages/Client/client-signup/client-signup.component';
import { CustomerSignUpComponent } from './components/pages/Customer/customer-sign-up/customer-sign-up.component';
import { HomeComponent } from './components/shared/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: CustomerSignUpComponent,
  },
  {
    path: 'signup-client',
    component: ClientSignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
