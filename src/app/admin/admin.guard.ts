import { CanLoad, Route, UrlSegment} from '@angular/router';
import {AuthService} from '../service/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../types/user';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AdminGuard implements CanLoad{
  constructor(private authService: AuthService){}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.authStatusAsync
    .pipe(
      map((user: User) => true),
      catchError((err) => of(false))
    )
  }
}
