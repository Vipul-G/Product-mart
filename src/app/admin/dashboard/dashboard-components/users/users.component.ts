import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AdminService } from 'src/app/admin/admin.service';
import { SharedService } from 'src/app/service/shared.service';
import User from 'src/app/types/user';

@Component({
  selector: 'pm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private adminService: AdminService, private sharedService: SharedService) { }

  users$: Observable<User[]>

  displayedColumns: string[] = ['User Id', 'Name', 'Contact', 'Email', 'Address', 'Role', ' '];

  ngOnInit(): void {
    this.users$ = this.adminService.getUsers()
    this.users$.pipe(share())
  }

  handleDelete(user_id) {
    this.adminService.deleteUser(user_id)
    .subscribe(() => this.sharedService.showSnackBar('User deleted successfully'), (err) => {
      this.sharedService.showSnackBar('User deletion failed')
    })
  }
}
