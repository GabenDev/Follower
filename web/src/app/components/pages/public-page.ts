/*
 * Created with IntelliJ IDEA.
 * User: mfo
 * Date: 12/18/15
 * Time: 9:55 AM
 */
import {Component} from "@angular/core";
import {CookieService} from "../../services/cookies.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'public-page',
    directives: [],
    pipes: [],
    providers: [],
    templateUrl: './app/components/pages/public-page.html'
})
export class PublicPage {
    constructor(private  cookies: CookieService, private authService: AuthService) {
    }

    doLogin(provider : string) {
        this.authService.doLogin(provider);
    }

    doLogout() {
        this.authService.doLogout();
    }

    get userName() {
        return this.authService.getUserName();
    }

    get idCookie() {
        return this.cookies.getCookie('id');
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }
}
