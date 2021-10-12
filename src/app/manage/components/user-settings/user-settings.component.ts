import { Component, OnInit } from '@angular/core';
import {AuthQuery} from '../../../auth/state/auth.query';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {AuthService} from '../../../auth/state/auth.service';
import {LoginService} from '../../../services/auth/login.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  newPassword = '';
  confirmNewPassword = '';
  savingPassword = false;
  error = false;
  success = false;

  constructor(
    public authQuery: AuthQuery,
    public authService: AuthService,
    public subCategoriesQuery: SubCategoriesQuery,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  async updatePassword(): Promise<void> {
    this.savingPassword = true;
    this.success = false;
    this.error = false;

    try {
      await this.authService.updatePassword(this.newPassword);
    } catch (e) {
      this.error = true;
      this.savingPassword = false;
      return;
    }

    this.newPassword = '';
    this.confirmNewPassword = '';
    this.success = true;
    setTimeout(() => this.success = false, 4000);
    this.savingPassword = false;
  }

}
