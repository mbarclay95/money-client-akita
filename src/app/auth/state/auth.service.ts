import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState, AuthStore, createAuth} from './auth.store';
import {environment} from '../../../environments/environment';
import {filter, tap} from 'rxjs/operators';
import {AuthStorageService} from '../../services/auth/auth-storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private authStore: AuthStore,
    private http: HttpClient,
    private authStorageService: AuthStorageService
  ) {
  }

  async login(email: string, password: string): Promise<void> {
    await this.http.post<{accessToken: string}>(`${environment.apiUrl}/login`, {
      email, password
    }).pipe(
      filter(authToken => !!authToken),
      tap(authToken => this.authStorageService.setAuthToken(authToken.accessToken))
    ).toPromise();
  }

  async logout(): Promise<void> {
    await this.http.get<{success: boolean}>(`${environment.apiUrl}/logout`).pipe(
      filter(response => response.success),
      tap(() => this.authStorageService.clearToken())
    ).toPromise();
  }

  async updatePassword(newPassword: string): Promise<void> {
    await this.http.post(`${environment.apiUrl}/change-password`, {newPassword}).toPromise();
  }

  async getUser(id: number): Promise<void> {
    await this.http.get<AuthState>(`${environment.apiUrl}/user/${id}`).pipe(
      tap(user => this.authStore.update(createAuth(user)))
    ).toPromise();
  }

  async getMe(): Promise<void> {
    await this.http.get<AuthState>(`${environment.apiUrl}/me`).pipe(
      tap(user => this.authStore.update(createAuth(user)))
    ).toPromise();
  }

  async update(user: Partial<AuthState>): Promise<void> {
    const updatedUser = createAuth({...this.authStore.getValue(), ...user});

    await this.http.patch<AuthState>(`${environment.apiUrl}/user/${updatedUser.id}`, updatedUser).pipe(
      tap(u => this.authStore.update(createAuth(u)))
    ).toPromise();
  }

}
