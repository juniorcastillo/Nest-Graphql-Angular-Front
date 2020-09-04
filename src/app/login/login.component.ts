import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map, isEmpty } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

declare let Swal;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username = '';
  public pwd = '';
  public userData: Observable<any>;
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (Object.values(this.authService.getCurrentUser()).length > 1) {
      console.log('Login reload');
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
  getUserValidated() {
    this.authService.login(this.username, this.pwd);
  }
}
