//These first 3 lines will be deprecated by the final release
import {Component} from "@angular/core";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'navbar',
    directives: [],
    providers: [],
    pipes: [],
    template: `<nav id="mainNav" class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top"><strong>Home</strong></a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" href="#features"><strong>About</strong></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#download"><strong>Download</strong></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#pricing"><strong>Pricing</strong></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact"><strong>Contact</strong></a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
    `
})
export class Navbar {
    constructor(private authService: AuthService) {
    }

    get authenticated() {
        return this.authService.isAuthenticated();
    }

    //doLogin(provider : string) {
    //    this.authService.doLogin(provider);
    //}
    //
    //doLogout() {
    //    this.authService.doLogout();
    //}

    get userName() {
        return this.authService.getUserName();
    }
}

