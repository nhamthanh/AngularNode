import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  userData: Observable<firebase.User>;
  private loggedIn = false;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.userData = angularFireAuth.authState;
    this.loggedIn = !!sessionStorage.getItem('user');
  }

  // Set current user in your session after a successful login
  setCurrentUser(email: string): void {
    sessionStorage.setItem('user', email);
    this.loggedIn = true;
  }

  // Get currently logged in user from session
  getCurrentUser(): string | any {
    return sessionStorage.getItem('user') || undefined;
  }

  // The method to check whether user is logged in or not
  isLoggedIn() {
    return this.loggedIn;
  }
  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    console.log('before signin');
    console.log(this.angularFireAuth.auth);
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        console.log(this.angularFireAuth.auth);
        this.setCurrentUser(this.angularFireAuth.auth.currentUser.email);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
        console.log(this.angularFireAuth.auth);
      });
    this.router.navigate(['/product']);
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
    sessionStorage.removeItem('user');
    this.loggedIn = false;
    this.router.navigate(['']);
  }
}
