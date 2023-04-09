import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  //login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( () => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  //Register method
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( () => {
      alert("Registration is successfull");
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // logout
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      alert("succesfully Logged out")
      this.router.navigate(['/login'])
    }, err => {
      alert(err.message);
    })
  }

  //forgot password
  forgotPassword(email : string){
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.router.navigate(['verify-emails']);
    }, err => {
      alert(err.message);
    })
  }

  //sign in with Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

}
