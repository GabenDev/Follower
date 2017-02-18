/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 10:34 AM
 */
import {Injectable, EventEmitter} from "@angular/core";
import {WindowService} from "./window.service";
import {Http, Headers, RequestOptions} from "@angular/http";
import { AuthenticationService } from './AuthenticationService'

@Injectable()
export class GoogleAuthenticationService extends AuthenticationService {

    constructor(public windows: WindowService, public http: Http) {
        super(http);
        //noinspection TypeScriptUnresolvedFunction
        http.get('config.google.json')
            .map(res => res.json())
            .subscribe((config: any) => {
                this.oAuthCallbackUrl = config.callbackUrl;
                this.oAuthTokenUrl = config.implicitGrantUrl;
                this.oAuthTokenUrl = this.oAuthTokenUrl
                    .replace('__callbackUrl__', config.callbackUrl)
                    .replace('__clientId__', config.clientId)
                    .replace('__scopes__', config.scopes);
                this.oAuthUserUrl = config.userInfoUrl;
                this.oAuthUserNameField = config.userInfoNameField;
            })
    }

    public name() : string {
        return "GOOGLE";
    }

    public doLogin() {
        var loopCount = this.loopCount;
        this.windowHandle = this.windows.createWindow(this.oAuthTokenUrl, 'OAuth2 Login');

        this.intervalId = setInterval(() => {
            if (loopCount-- < 0) {
                clearInterval(this.intervalId);
                this.emitAuthStatus(false);
                this.windowHandle.close();
            } else {
                var href: string;
                try {
                    href = this.windowHandle.location.href;
                } catch (e) {
                    //console.log('Error:', e);
                }
                if (href != null) {
                    var re = /access_token=(.*)/;
                    var found = href.match(re);
                    if (found) {
                        console.log("Callback URL:", href);
                        clearInterval(this.intervalId);
                        var parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                        var expiresSeconds = Number(parsed.expires_in) || 1800;

                        this.token = parsed.access_token;
                        if (this.token) {
                            this.authenticated = true;
                            this.startExpiresTimer(expiresSeconds);
                            this.expires = new Date();
                            this.expires = this.expires.setSeconds(this.expires.getSeconds() + expiresSeconds);

                            this.windowHandle.close();
                            this.emitAuthStatus(true);

                            this.fetchUserInfoRequest().subscribe(info => {
                                this.userInfo = info;
                                this.saveUser().subscribe(
                                    () => console.log('Authentication Complete')
                                );
                            }, err => {
                                console.error("Failed to fetch user info:", err);
                            });


                        } else {
                            this.authenticated = false; // we got the login callback just fine, but there was no token
                            this.emitAuthStatus(false); // so we are still going to fail the login
                        }

                    } else {
                        // http://localhost:3000/auth/callback#error=access_denied
                        if (href.indexOf(this.oAuthCallbackUrl) == 0) {
                            clearInterval(this.intervalId);
                            var parsed = this.parse(href.substr(this.oAuthCallbackUrl.length + 1));
                            this.windowHandle.close();
                            this.emitAuthStatusError(false, parsed);
                        }
                    }
                }
            }
        }, this.intervalLength);
    }

    private saveUser() {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        var bodyDBUser = "name=" + this.userInfo.displayName + "&provider=" + this.name() + "&id=" + this.userInfo.id;
        console.log('bodyDBUser: ' + bodyDBUser);
        return this.http.post('http://localhost:8000/api/user', bodyDBUser, options)
            .map(res => res.json());
    }

    private extractData() {

    }

    private parse(str) { // lifted from https://github.com/sindresorhus/query-string
        if (typeof str !== 'string') {
            return {};
        }

        str = str.trim().replace(/^(\?|#|&)/, '');

        if (!str) {
            return {};
        }

        return str.split('&').reduce(function (ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            // Firefox (pre 40) decodes `%3D` to `=`
            // https://github.com/sindresorhus/query-string/pull/37
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join('=') : undefined;

            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
                ret[key] = val;
            } else if (Array.isArray(ret[key])) {
                ret[key].push(val);
            } else {
                ret[key] = [ret[key], val];
            }

            return ret;
        }, {});
    };

}

