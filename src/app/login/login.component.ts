import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserModel } from '../model/UserModel';
import { AuthenticateService } from '../service/authenticate.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private router: Router,
    public authenticateService: AuthenticateService
  ) {}
  email: string;
  password: string;
  success: string;
  error: string;


  login(): void {
    this.authenticateService.SignIn(this.email, this.password);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  signUp() {
    this.authenticateService.SignUp(this.email, this.password);
  }

  signOut() {
    this.authenticateService.SignOut();
    this.dialogRef.close();
  }
}
