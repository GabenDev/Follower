/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {WindowService} from "./window.service";
import {Http, Headers} from "@angular/http";

import { AuthenticationService } from './AuthenticationService';
import { FacebookAuthenticationService } from "./FacebookAuthenticationService";
import { GoogleAuthenticationService } from "./GoogleAuthenticationService";

@Injectable()
export class AuthService {
    public authenticated: boolean = false;

    private provider : AuthenticationService;

    constructor(public facebook : FacebookAuthenticationService, public google : GoogleAuthenticationService) {
    }

    public doLogin(provider : string) {
        if(provider === 'facebook') {
            this.provider = this.facebook;
        }

        if(provider === 'google') {
            this.provider = this.google;
        }

        this.provider.doLogin();
    }

    public doLogout() {
        this.provider.doLogout();
    }

    public getSession() {
        return this.provider.getSession();
    }

    public getUserInfo() {
        return this.provider.getUserInfo();
    }

    public getUserName() {
        return this.provider.getUserName() + "(" + this.provider.name() + ")";
    }

    public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
        return this.provider.getLocationWatcher().subscribe(onNext, onThrow, onReturn);
    }

    public isAuthenticated() {
        if(this.provider) {
            return this.provider.isAuthenticated();
        } else {
            return false;
        }
    }
}

