//Ng imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
//Local imports
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import { ServerError } from '../_models/server-error.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public userSubject$: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject$ = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user$ = this.userSubject$.asObservable();
  }

  /**
   * Easy getter for user.
   */
  public get userValue(): User | null {
    return this.userSubject$.value;
  }

  /**
   * Authorizes user login.
   */
  authUser(email: string, password: string) {
    try {
      return this.http
        .post<User | ServerError>(
          `${environment.api}/accounts/authentication`,
          {
            email,
            password,
          }
        )
        .pipe(
          map((response) => {
            //Narrow type check
            if ('error' in response) {
              return response;
            }
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response));
            this.userSubject$.next(response);
            return response;
          })
        );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  /**
   * Logs user out of account.
   */
  async logout() {
    localStorage.removeItem('user');
    this.userSubject$.next(null);
    this.router.navigate(['/account/login']);
  }
}
