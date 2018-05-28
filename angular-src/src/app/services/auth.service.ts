import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
    token: any;
    user: any;

    constructor(private http: HttpClient) {}

    registerUser(user) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
        return this.http.post('http://localhost:3000/users/register', user, httpOptions);
    }

    authenticateUser(user) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
          };
        return this.http.post('http://localhost:3000/users/authenticate', user, httpOptions);
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.token = token;
        this.user = user;
    }

    getProfile() {
        this.loadToken();
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': this.token
            })
          };
        return this.http.get('http://localhost:3000/users/profile', httpOptions);
    }

    loadToken() {
        this.token = localStorage.getItem('id_token');
    }

    loggedIn() {
        this.loadToken();

        if (!this.token) return false;
        
        if (this.parseJwt(this.token).exp < Date.now() / 1000) return false;
        else return true;
    }

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    logout() {
        this.token = null;
        this.user = null;
        localStorage.clear();
    }

}