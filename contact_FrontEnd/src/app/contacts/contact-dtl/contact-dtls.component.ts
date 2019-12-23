import { Component, OnInit, Inject, Optional } from "@angular/core";
import { ContactDtls } from "../../models/contact-dtls";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgForm } from "@angular/forms";
import { ContactService } from "../../services/contact.service";

// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
@Component({
  selector: "app-contact-dtls",
  templateUrl: "./contact-dtls.component.html",
  styleUrls: ["./contact-dtls.component.css"]
})
export class ContactDtlsComponent implements OnInit {
  cnctcDtls: ContactDtls;
  isValid: boolean;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public diaglogRef: MatDialogRef<ContactDtlsComponent>,
    private service: ContactService
  ) {}

  ngOnInit() {
    this.cnctcDtls = {
      contact_dtl_id: null,
      cntct_mst_id: this.data.cntct_mst_id,
      cntct_no_typ: "",
      cntct_no: ""
    };
  }

  validateForm(cd: ContactDtls) {
    if (cd.cntct_no !== "") {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
    return this.isValid;
  }

  onSumit(form: NgForm) {
    if (this.validateForm(form.value)) {
      this.service.contactDtl.push(form.value);
      this.diaglogRef.close();
    }
  }
}
