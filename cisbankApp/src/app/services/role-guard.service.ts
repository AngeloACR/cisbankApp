import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.auth.decode();
    const data = next.data
    for (let role of Object.values(data)) {
      if (user.tipo === role) {
        return true;
      }
    }

    // navigate to not found page
    this.router.navigate(['/']);
    return false;
  }

}
