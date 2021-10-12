import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/state/auth.service';
import {Router} from '@angular/router';
import {AuthStorageService} from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginForm: FormGroup | undefined;
  error = false;
  unauthorized = false;
  loading = false;

  constructor(
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private router: Router,
  ) { }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login(): Promise<void> {
    if (!this.loginForm || this.loginForm.invalid) {
      this.error = true;
      return;
    }
    this.error = false;
    this.loading = true;
    this.unauthorized = false;

    try {
      await this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    } catch (e) {
      this.unauthorized = true;
      this.loading = false;
      return;
    }

    this.loading = false;
    await this.router.navigateByUrl('app/add-transactions');
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.authStorageService.isTokenSet()) {
      return false;
    }

    try {
      await this.authService.getMe();
    } catch (e) {
      this.authStorageService.clearToken();
      return false;
    }

    await this.router.navigateByUrl('app/add-transactions');
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigateByUrl('login');
  }
}
