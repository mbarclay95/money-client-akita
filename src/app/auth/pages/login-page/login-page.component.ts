import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../state/auth.service';
import {AuthQuery} from '../../state/auth.query';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public authQuery: AuthQuery
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser(): Promise<void> {
    await this.authService.getUser(1);
  }

}
