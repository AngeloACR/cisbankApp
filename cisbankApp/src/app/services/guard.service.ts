import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  constructor(public auth: AuthService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAuthenticated() && state.url != '/login') {
      this.router.navigate(['/login']);
      return false;
    }
    if (this.auth.isAuthenticated() && state.url == '/login') {
      this.router.navigate(['/']);
    }
    return true;
  }
}
