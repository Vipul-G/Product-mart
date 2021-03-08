import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import User from '../types/user';
import { switchMap, catchError, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as userActions from '../ngrx/user/user.actions'
import {AppState} from '../ngrx/types'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  tokenTimeout: any;
  private userState: User | any = {}
  private subscriptions: Subscription[] = []

  apiUrl = 'http://localhost:3000/api/v1/auth/';
  constructor(private http: HttpClient, private store: Store, private router: Router) {
    const sub = this.store.select((state: AppState) => state.userState).subscribe((userState) => {
      this.userState = userState;
    })
    this.subscriptions.push(sub)
  }


  private saveAuthToken(token: string, expirationDate: Date){
  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate.toString());
  }
  private clearAuthToken(){
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  }

  get authStatus() {
    return this.userState.name ? true : false;
  }

  get authStatusAsync(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}findme`)
  }

  get user() {
    return this.userState
  }

  login(contact: string, password: string){

    return this.http.post<{user: User, token: string, expiresIn: number}>(`${this.apiUrl}login`, {contact, password})
      .pipe(switchMap(response => {

        if (response.token){
          const expiresIn = response.expiresIn;
          this.tokenTimeout = setTimeout(this.logout, expiresIn * 1000);
          this.store.dispatch(userActions.setUser({user: response.user}))
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);
          this.saveAuthToken(response.token, expirationDate);
        }
        return of(response);
      }),

      );
  }


 logout(){
   this.store.dispatch(userActions.unsetUser())
   this.clearAuthToken();
 }


 register(user: any){
    return this.http.post<User>(`${this.apiUrl}register`, user).pipe(
      switchMap(response => {
        this.store.dispatch(userActions.setUser({user: response}))
        return of(response);
      }),
      catchError(err => {
        console.log('server error occured', err);
        return throwError('Registration falied');
      })
      );
  }


 autoLogin(){
  const sub = this.http.get<any>(`${this.apiUrl}findme`).pipe(
    catchError(err => {
      return throwError('Your details not varified');
    })
  ).subscribe((user) => this.store.dispatch(userActions.setUser({user})));
  this.subscriptions.push(sub)
 }

 ngOnDestroy() {
   this.subscriptions.forEach(sub => sub.unsubscribe())
 }

}
