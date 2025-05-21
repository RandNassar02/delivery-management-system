import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { ClientSignupComponent } from './components/pages/Client/client-signup/client-signup.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'signUp-client',
    component: ClientSignupComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
