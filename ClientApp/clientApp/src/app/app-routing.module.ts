import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';

const routes: Routes = [
  { component: UserProfileComponent, path: 'user/:email' },
  { component: StaffProfileComponent, path: 'staff/:email' },
  { component: RegisterComponent, path: 'register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
