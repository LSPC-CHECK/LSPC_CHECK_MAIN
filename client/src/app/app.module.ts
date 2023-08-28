import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { QrcheckComponent } from './components/qrcheck/qrcheck.component';
import { DataHistoryComponent } from './components/data-history/data-history.component';
import { LoginComponent } from './components/login/login.component'
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ForpasswComponent } from './components/login/forpassw/forpassw.component';
import { JwtHelperService, JWT_OPTIONS} from "@auth0/angular-jwt";
import { DataTablesModule } from 'angular-datatables';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ListPqrsComponent } from './components/list-pqrs/list-pqrs.component';
import { UserprfconfigComponent } from './components/userprfconfig/userprfconfig.component';
import { UpdateuserprofileComponent } from './components/userprofile/updateuserprofile/updateuserprofile.component';
import { CreateuserprofileComponent } from './components/userprofile/createuserprofile/createuserprofile.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { UpdatePqrsComponent } from './components/list-pqrs/update-pqrs/update-pqrs.component';
import { UserUpdateComponent } from './components/list-users/user-update/user-update.component';
import { UserAddComponent } from './components/list-users/user-add/user-add.component';
import { ComputerAddComponent } from './components/list-computer/computer-add/computer-add.component';
import { ComputerUpdateComponent } from './components/list-computer/computer-update/computer-update.component';
import { ListComputerComponent } from './components/list-computer/list-computer.component';
import { ListEntSalComponent } from './components/list-ent-sal/list-ent-sal.component';
import { ResetpasswComponent } from './components/login/forpassw/resetpassw/resetpassw.component';

@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    HomeComponent,
    UserprofileComponent,
    QrcheckComponent,
    DataHistoryComponent,
    LoginComponent,
    FooterComponent,
    ListUsersComponent,
    AboutUsComponent,
    ForpasswComponent,
    ListPqrsComponent,
    UserprfconfigComponent,
    UpdateuserprofileComponent,
    CreateuserprofileComponent,
    SafeResourceUrlPipe,
    UpdatePqrsComponent,
    UserUpdateComponent,
    UserAddComponent,
    ComputerAddComponent,
    ComputerUpdateComponent,
    ListComputerComponent,
    ListEntSalComponent,
    ResetpasswComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    DataTablesModule,
    QRCodeModule,
    NgxChartsModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
