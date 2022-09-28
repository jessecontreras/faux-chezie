//Ng dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Local dependencies
import { LoginComponent } from './account/login.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () =>
  import('./account/account.module').then((x) => x.AccountModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  {
    path: 'account',
    loadChildren: accountModule,
  },
  //if no route matches redirect home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
