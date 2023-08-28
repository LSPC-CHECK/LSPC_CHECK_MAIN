//Importaciones del Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Guards
import { AuthGuard } from './guards/auth.guard';
import { AuthRoleGuard } from './guards/auth-role.guard';
//componentes
import { ListPqrsComponent } from './components/list-pqrs/list-pqrs.component';
import { UpdatePqrsComponent } from './components/list-pqrs/update-pqrs/update-pqrs.component';
import { DataHistoryComponent } from './components/data-history/data-history.component';
import { HomeComponent } from './components/home/home.component';
import { ForpasswComponent } from './components/login/forpassw/forpassw.component';
import { LoginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserAddComponent } from './components/list-users/user-add/user-add.component';
import { UserUpdateComponent } from './components/list-users/user-update/user-update.component';
import { QrcheckComponent } from './components/qrcheck/qrcheck.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { CreateuserprofileComponent } from './components/userprofile/createuserprofile/createuserprofile.component';
import { UpdateuserprofileComponent } from './components/userprofile/updateuserprofile/updateuserprofile.component';
import { UserprfconfigComponent } from './components/userprfconfig/userprfconfig.component';
import { ListComputerComponent } from "./components/list-computer/list-computer.component";
import { ComputerAddComponent } from "./components/list-computer/computer-add/computer-add.component";
import { ComputerUpdateComponent } from "./components/list-computer/computer-update/computer-update.component";
import { ListEntSalComponent } from './components/list-ent-sal/list-ent-sal.component';
import { ResetpasswComponent } from './components/login/forpassw/resetpassw/resetpassw.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {path: 'reset-password/:resetPasswordToken',component: ResetpasswComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'forpassw', component: ForpasswComponent,},
  { path: 'list-users', component:  ListUsersComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: 'users-add', component:  UserAddComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: 'users-update/:id', component:  UserUpdateComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: 'list-pqrs', component: ListPqrsComponent, canActivate: [AuthGuard]},
  { path: 'update-pqrs/:id', component: UpdatePqrsComponent, canActivate: [AuthGuard] },
  { path: 'userprofile', component: UserprofileComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: 'createuserprofile', component:CreateuserprofileComponent, canActivate: [AuthGuard,AuthRoleGuard]},
  { path: 'updateuserprofile/:id', component:UpdateuserprofileComponent, canActivate: [AuthGuard,AuthRoleGuard]},
  { path: 'userprfconfig/:id', component: UserprfconfigComponent, canActivate: [AuthGuard] },
  { path: 'data-history', component: DataHistoryComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: 'qrcheck/:id', component: QrcheckComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: 'list-computers', component: ListComputerComponent, canActivate: [AuthGuard] },
  { path: 'add-computer', component: ComputerAddComponent, canActivate: [AuthGuard] },
  { path: 'update-computer/:id', component: ComputerUpdateComponent, canActivate: [AuthGuard] },
  { path: 'list-ent-sal', component: ListEntSalComponent, canActivate: [AuthGuard,AuthRoleGuard] },
  { path: '**', pathMatch:'full', redirectTo:'' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
