import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
    const expectedRole = route.data['role'];

    if (!isAuthenticated) {
      // Navigate to the login page with redirection
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // If route is restricted by role
    if (expectedRole) {
      if ((expectedRole === 'ADMIN' && isAdmin) || (expectedRole !== 'ADMIN')) {
        return true;
      } else {
        // Redirect to an unauthorized or default page
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true; // User is authenticated and not restricted by role, or role matches
  }
}
