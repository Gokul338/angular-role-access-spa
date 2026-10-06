import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User | null>(
    this.load()
  );

  user$ = this.subject.asObservable();


  constructor(
    private router: Router
  ) {}


  private load() {
    const raw = localStorage.getItem('user');

    return raw
      ? JSON.parse(raw)
      : null;
  }


  get user() {
    return this.subject.value;
  }


  login(
    user: User,
    token: string
  ) {
    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    localStorage.setItem(
      'token',
      token
    );

    this.subject.next(user);
  }


  logout() {
    localStorage.clear();

    this.subject.next(null);

    this.router.navigate(['/login']);
  }


  isLoggedIn() {
    return !!this.user;
  }


  isAdmin() {
    return this.user?.role === 'Admin';
  }

}