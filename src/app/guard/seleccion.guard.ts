import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('usuario') === null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (localStorage.getItem('empresa') === null) {
        this.router.navigate(['/seleccion']);
        return false;
      } else {
        return true;
      }
    }
  }
}
