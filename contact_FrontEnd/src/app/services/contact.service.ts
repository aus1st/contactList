import { Injectable } from "@angular/core";
import { ContactMst } from "../models/contact-mst";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ContactList } from "../models/contact-list";
import { ContactDtls } from "../models/contact-dtls";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  contact: ContactMst;
  contactDtl: ContactDtls[];

  constructor(private http: HttpClient) {}

  getContacts() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + sessionStorage.getItem("accessToken")
      })
    };
    return this.http.get<ContactList>(
      environment.apiUrl + "/Contacts/GetContacts",
      httpOptions
    );
  }

  saveContacts() {
    const body = {
      ...this.contact,
      contact_dtl: this.contactDtl
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + sessionStorage.getItem("accessToken")
      })
    };
    return this.http.post(
      environment.apiUrl + "/Contacts/SaveContact",
      body,
      httpOptions
    );
  }

  getContactById(contactId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + sessionStorage.getItem("accessToken")
      })
    };
    return this.http.get<any>(
      environment.apiUrl + "/Contacts/GetContactById/" + contactId,
      httpOptions
    );
  }
}
