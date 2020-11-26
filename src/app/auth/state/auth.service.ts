import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthState, AuthStore, createAuth} from './auth.store';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private authStore: AuthStore,
    private http: HttpClient
  ) {
  }

  async getUser(id: number): Promise<void> {
    await this.http.get<AuthState>(`${environment.apiUrl}/user/${id}`).pipe(
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
