import { Component, OnInit } from "@angular/core";

import { ContactList } from "../../models/contact-list";
import { ContactService } from "../../services/contact.service";
import { Router } from "@angular/router";

// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  cnctcLst: ContactList[] = [];
  constructor(private service: ContactService, private router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem("accessToken") === null) {
      this.router.navigate(["/login"]);
    }
  }

  fetchContacts() {
    this.service.getContacts().subscribe(data => {
      this.cnctcLst = data;
    });
  }

  EditRecord(id: number) {
    this.router.navigate(["/order/edit/" + id]);
  }
}
