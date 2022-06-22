import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      this.authService.setRoles()
      if (
      this.authService.currentRoles != null &&
      this.authService.currentRoles != undefined &&
      this.authService.currentRoles.includes('admin')
    ) {
      return true;
    } else {
      this.toastr.error('Authorization denied!,Only admin can access.');
      this.router.navigate(['']);
      return false;
    }
  }
}
