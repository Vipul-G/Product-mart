import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../types/user';

@Injectable()
export class AdminService {

  private readonly apiUrl = 'http://localhost:3000/api/v1'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/user')
  }

  deleteUser(user_id) {
    return this.http.delete(`${this.apiUrl}/user/${user_id}`)
  }

}
