import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SnackBarComponent } from 'src/app/components/snack-bar/snack-bar.component';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

subscriptions: Subscription[] = []
login: FormGroup;
submit = false;
  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      contact: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f(){
    return this.login.controls;
  }
onSubmit() {
  if (this.login.invalid){
    this.submit = true;
    console.log(this.f);
    return;
  }

  const user = this.login.value;
  const sub = this.authService.login(user.contact, user.password).subscribe((res) => {
    this.sharedService.showSnackBar('Login successfull')
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 2000)
  }, (err) => this.sharedService.showSnackBar('Login fail'));
  this.subscriptions.push(sub)
}
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
