import { Component, OnInit } from "@angular/core";
import { ContactService } from "../services/contact.service";

import { NgForm } from "@angular/forms";
import { ContactMst } from "../models/contact-mst";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ContactDtlsComponent } from "./contact-dtl/contact-dtls.component";
import { ContactDtls } from "../models/contact-dtls";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  constructor(
    private cntctService: ContactService,
    private dialog: MatDialog,
    private router: Router,
    private currRoute: ActivatedRoute
  ) {}

  // cnct: ContactMst = {
  //   cntct_mst_id: null,
  //   cntct_nme: "Ahmed",
  //   cntct_ocptn: "",
  //   cntct_gndr: "",
  //   cntct_addrss_1: "",
  //   cntct_addrss_2: "",
  //   cntct_city: "",
  //   cntct_country: ""
  // };

  ngOnInit() {
    const cnctId = this.currRoute.snapshot.paramMap.get("id");
    if (cnctId == null) {
      this.resetMyForm();
    } else {
      this.getContactById(+cnctId);
    }
  }

  resetMyForm(form?: NgForm) {
    if ((form = null)) form.resetForm();
    this.cntctService.contact = {
      cntct_mst_id: null,
      cntct_nme: "Ahmed",
      cntct_ocptn: "",
      cntct_gndr: "",
      cntct_addrss_1: "",
      cntct_addrss_2: "",
      cntct_city: "",
      cntct_country: ""
    };
    this.cntctService.contactDtl = [];
  }

  AddEditDtl(itemIndex = 0, cntct_mst_id = 0) {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = true;
    config.width = "50%";
    config.height = "50%";
    config.data = { itemIndex, cntct_mst_id };
    this.dialog
      .open(ContactDtlsComponent, config)
      .afterClosed()
      .subscribe(res => {
        console.log("do nothing");
      });
  }

  deleteLineItem(i: number) {
    this.cntctService.contactDtl.splice(i, 1);
  }

  onSubmit(form: NgForm) {
    this.cntctService.saveContacts().subscribe(
      result => {
        if (result === 200) {
          console.log("Record Saved");
          this.router.navigate(["/contactList"]);
        } else {
          //console.log("Error Occured");
        }
      },
      err => {
        //console.log(err);
      }
    );
  }

  getContactById(id: number) {
    this.cntctService.getContactById(id).subscribe(res => {
      this.cntctService.contact = res.cnct_mst;
      this.cntctService.contactDtl = res.cnct_dtl;
    });
  }
}
