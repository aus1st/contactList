import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactService } from "./services/contact.service";
import { ContactComponent } from "./contacts/contact.component";
import { ContactDtlsComponent } from "./contacts/contact-dtl/contact-dtls.component";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { LoginComponent } from "./Login/Login.component";
import { LoginService } from "./services/login.service";

@NgModule({
  declarations: 
  [AppComponent,
     ContactComponent, 
     ContactDtlsComponent,
     ContactListComponent,
     LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents: [ContactDtlsComponent],
  providers: [ContactService,LoginService],

  bootstrap: [AppComponent]
})
export class AppModule {}
