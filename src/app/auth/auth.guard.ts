import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{
  constructor(private authService: AuthService, private router: Router){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.authStatusAsync.pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    // const isAuth = this.authService.authStatus;
    // if (!isAuth){
    //   this.router.navigate(['/auth/login']);
    // }
    // debugger
    // return isAuth;
    return this.authService.authStatusAsync.pipe(
      map(() => true),
      catchError((err) => {
        this.router.navigate(['/auth/login']);
        return of(false)
      })
    )
  }

}
