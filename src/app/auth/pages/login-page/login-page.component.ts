import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../state/auth.service';
import {AuthQuery} from '../../state/auth.query';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public authQuery: AuthQuery,
    public loginService: LoginService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!await this.loginService.isLoggedIn()) {
      this.loginService.initializeForm();
    }
  }

}
