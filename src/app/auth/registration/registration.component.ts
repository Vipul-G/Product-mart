import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'pm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = []
register: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([Validators.required, this.passMatch])]
    })
  }
  private passMatch(control: FormControl){
    const password = control.root.get('password');
    return password && control.value !== password.value ? {passwordMatch: true} : null;
  }
  get f(){
    return this.register.controls;
  }
  onSubmit(){
    if(this.register.invalid){
      return;
    }
    const user = this.register.getRawValue();
    delete user.confirmPassword
    const sub = this.authService.register(user).subscribe((resisteredUser)=>{
      this.sharedService.showSnackBar('Registered successfully')
      this.authService.login(resisteredUser.contact, user.password).subscribe(() => {
        this.router.navigate(['/'])
      })
    }, (err) => this.sharedService.showSnackBar('Registeration failed'));
    this.subscriptions.push(sub)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}
