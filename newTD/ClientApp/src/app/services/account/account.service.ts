import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';
import { AuthService } from '../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private _baseUrl: string = '';    
    private _userSubject: BehaviorSubject<User | null>;
    public _user: Observable<User| null>;
    

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService
    ) {
        this._userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this._user = this._userSubject.asObservable();
        this._baseUrl = baseUrl;
    }

    public get userValue() {
        return this._userSubject.value;
    }



    getAll() {
        return this.http.get<User[]>(`${this._baseUrl}/users`);
    }

    getUserById(id: string) {
        return this.http.get<User>(`${this._baseUrl}/users/${id}`);
    }

    updateUser(id: string, params: any) {
        return this.http.put(`${this._baseUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this._userSubject.next(user);
                }
                return x;
            }));
    }

    deleteUser(id: string) {
        return this.http.delete(`${this._baseUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    // this.logout();
                }
                return x;
            }));
    }
}