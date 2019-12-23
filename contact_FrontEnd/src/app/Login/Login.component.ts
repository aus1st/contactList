import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from "../services/login.service";
@Component({
  selector: "app-Login",
  templateUrl: "./Login.component.html",
  styleUrls: ["./Login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private currRoute: ActivatedRoute,
    private loginService: LoginService
  ) {}

  userName: string = "";
  password: string = "";

  ngOnInit() {}

  login() {
    this.loginService.connect(this.userName, this.password).subscribe(
      res => {
        if (res) {
          sessionStorage.setItem("accessToken", res.access_token);
          this.router.navigate(["/contactList"]);
        }
      },
      err => {
        console.log(err.responseText);
      }
    );
  }
}
