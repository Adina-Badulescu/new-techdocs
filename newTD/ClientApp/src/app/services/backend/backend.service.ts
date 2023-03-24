import { Inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ICard } from 'app/models/ICard.interface';
import { User } from 'app/models/User';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private _baseUrl: string = '';
  private userSubject!: BehaviorSubject<User | null>;
  public user: Observable<User | null> = new Observable();

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this._baseUrl = baseUrl;
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  public get userValue() {
    return this.userSubject.value;
  }

  retryOnError = pipe(
    retry({ count: 2, delay: 2000, resetOnSuccess: true }),
    catchError(error => of(error))
  )


  searchDomain(domainQueried: string): Observable<boolean> {
    return this.http.get<boolean>(`${this._baseUrl}getdomain/Query?id=${domainQueried}`)
      .pipe(this.retryOnError)
  }


  listTemplates(numberOfResults: number, searchString?: string | null | undefined): Observable<ICard[]> {
    if (searchString != null || searchString != undefined) {
      return this.http.get<string>(`${this._baseUrl}templates/ListTemplates?numberOfResults=${numberOfResults}&searchString=${searchString}`).
        pipe(this.retryOnError)
    }
    return this.http.get<string>(`${this._baseUrl}templates/ListTemplates?numberOfResults=${numberOfResults}`).
      pipe(this.retryOnError)
  }


  login(username?: string | undefined | null, password?: string | undefined | null): Observable<User> {
    return this.http.post<User>(`${this._baseUrl}/auth/Login`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/admin/login']);
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this._baseUrl}/auth/Register`, user);
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._baseUrl}/auth/GetAllUsers`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/auth/User/${id}`);
  }

  updateUser(id: string, params: any): Observable<User> {
    return this.http.put(`${this._baseUrl}/auth/User/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete(`${this._baseUrl}auth/User/${id}`)
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      }));
  }

} 
