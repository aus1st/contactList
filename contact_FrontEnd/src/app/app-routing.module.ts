import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactComponent } from "./contacts/contact.component";
import { ContactDtlsComponent } from "./contacts/contact-dtl/contact-dtls.component";
import { ContactListComponent } from "./contacts/contact-list/contact-list.component";
import { LoginComponent } from "./Login/Login.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "contacts", component: ContactComponent },
  {
    path: "contact",
    children: [
      { path: "", component: ContactComponent },
      { path: "edit/:id", component: ContactComponent }
    ]
  },
  { path: "contactDtl", component: ContactDtlsComponent },
  { path: "contactList", component: ContactListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
