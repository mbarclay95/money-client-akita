import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthQuery} from '../../auth/state/auth.query';
import {AuthStorageService} from './auth-storage.service';
import {AuthService} from '../../auth/state/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
  ) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authUser = this.authQuery.getValue();
    if (!!authUser.id) {
      return true;
    }

    if (this.authStorageService.isTokenSet()) {
      await this.authService.getMe();
      return true;
    }

    return false;
  }

}
