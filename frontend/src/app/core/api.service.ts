import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RecordItem,
  Role,
  User
} from './models';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base = 'http://localhost:3000/api';


  constructor(
    private http: HttpClient
  ) {}


  private params(delay = 0) {
    return new HttpParams()
      .set('delay', delay);
  }


  login(
    userId: string,
    password: string,
    role: Role,
    delay = 800
  ): Observable<{
    user: User;
    token: string;
  }> {
    return this.http.post<{
      user: User;
      token: string;
    }>(
      `${this.base}/login`,
      {
        userId,
        password,
        role
      },
      {
        params: this.params(delay)
      }
    );
  }


  records(
    userId: string,
    delay = 1200
  ) {
    return this.http.get<RecordItem[]>(
      `${this.base}/users/${userId}/records`,
      {
        params: this.params(delay)
      }
    );
  }


  users(
    delay = 900
  ) {
    return this.http.get<User[]>(
      `${this.base}/users`,
      {
        params: this.params(delay)
      }
    );
  }


  addUser(
    body: any,
    delay = 900
  ) {
    return this.http.post<User>(
      `${this.base}/users`,
      body,
      {
        params: this.params(delay)
      }
    );
  }


  deleteUser(
    id: number,
    delay = 700
  ) {
    return this.http.delete(
      `${this.base}/users/${id}`,
      {
        params: this.params(delay)
      }
    );
  }

}