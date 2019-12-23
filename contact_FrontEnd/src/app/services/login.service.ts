import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  connect(userName, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const body = {
      userName: userName,
      password: password,
      grant_type: "password"
    };
    return this.http.post<any>(
      environment.apiUrl + "/token",
      body,
      httpOptions
    );
  }
}
