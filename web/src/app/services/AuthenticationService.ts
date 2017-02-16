/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class AuthenticationService {
    protected oAuthCallbackUrl: string;
    protected oAuthTokenUrl: string;
    protected oAuthUserUrl: string;
    protected oAuthUserNameField: string;
    protected authenticated: boolean = false;
    protected token: string;
    protected expires: any = 0;
    protected userInfo: any = {};
    protected windowHandle: any = null;
    protected intervalId: any = null;
    protected expiresTimerId: any = null;
    protected loopCount = 600;
    protected intervalLength = 100;

    protected locationWatcher = new EventEmitter();  // @TODO: switch to RxJS Subject instead of EventEmitter

    constructor(public http: Http) { }

    public doLogin() { }

    protected emitAuthStatus(success: boolean) {
        this.emitAuthStatusError(success, null);
    }

    public doLogout() {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true);
        console.log('Session has been cleared');
    }


    protected fetchUserInfo() {
        if (this.token != null) {
            var headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            //noinspection TypeScriptUnresolvedFunction

            console.log(this.oAuthUserUrl);
            this.http.get(this.oAuthUserUrl, {headers: headers})
                .map(res => res.json())
                .subscribe(info => {
                    this.userInfo = info;
                }, err => {
                    console.error("Failed to fetch user info:", err);
                });
        }
    }

    protected emitAuthStatusError(success: boolean, error: any) {
        this.locationWatcher.emit(
            {
                success: success,
                authenticated: this.authenticated,
                token: this.token,
                expires: this.expires,
                error: error
            }
        );
    }

    public getLocationWatcher() : any {
        return this.locationWatcher;
    }

    public getSession() {
        return {authenticated: this.authenticated, token: this.token, expires: this.expires};
    }

    public getUserInfo() {
        return this.userInfo;
    }

    public getUserName() {
        return this.userInfo ? this.userInfo[this.oAuthUserNameField] : null;
    }

    public name() : string {
        return "Undefined";
    }

    protected startExpiresTimer(seconds: number) {
        if (this.expiresTimerId != null) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.doLogout();
        }, seconds * 1000); // seconds * 1000
        console.log('Token expiration timer set for', seconds, "seconds");
    }

    public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    }

    public isAuthenticated() : boolean {
        return this.authenticated;
    }
}

