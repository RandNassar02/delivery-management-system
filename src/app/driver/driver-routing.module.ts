import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { RoleGuard } from '../auth/role.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [RoleGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'requests/:id', component: RequestDetailsComponent },
      { path: '', redirectTo: 'requests', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule {}
