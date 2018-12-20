import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DragulaModule } from 'ng2-dragula';
const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full"},
	{ path: "home", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "createuser", component: UserComponent },
	{ path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DragulaModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
