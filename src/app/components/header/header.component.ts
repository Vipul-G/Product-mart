import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/types/user';


@Component({
  selector: 'pm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent  {
  @Input() userState: User;
  @Input() cartLenght: number = 0;

  @Output() logoutEvent = new EventEmitter<any>();

  constructor(private router: Router){}

  redirect() {
    this.router.navigate(['/payment/orders'], {queryParams: {user_id: this.userState.id}})
  }

}
