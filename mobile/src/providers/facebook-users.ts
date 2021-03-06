import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { Observable } from 'rxjs/Rx';
//import 'rxjs/add/operator/map';
//import { FacebookAuth } from '@ionic/cloud-angular';

//import { User } from '../models/user';
import { FBUser } from '../models/FBUser';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

@Injectable()
export class FacebookUsers {
  accessToken : string;
  loggedInUser : FBUser;
  //facebookApiUrl = 'https://graph.facebook.com/v2.8';

  constructor(
    public http: Http
    //, public facebook : Facebook
  ) {
    this.loggedInUser = <FBUser>{};
    //alert('Constructor of Facebook Login !');
    //Facebook.api();
  }

  tryLogin() : FBUser {
    //this.loggedInUser = <FBUser>{};
    Facebook.login(['email']).then((response : FacebookLoginResponse) => {
      alert('This is good 1 ' + response.authResponse.accessToken);

      //Facebook.getAccessToken().then((v) => {
      //  this.accessToken = v;
      //  alert('Access Token 1 ' + v);
      //  Facebook.api("/me?fields=id%2Cname&access_token="+this.accessToken, ['public_profile'])
      //  .then((profile) => {
      //      this.loggedInUser.id = profile.id;
      //      this.loggedInUser.name = profile.name;
      //      alert(this.loggedInUser.name);
      //    });
      //});
    });
    return this.loggedInUser;
  }

  //Facebook.getAccessToken().then((accessToken) => {
  //  console.log(accessToken);
  //  alert(accessToken);
  //  this.accessToken = accessToken;
  //});
  //}

  /*
   curl -i -X GET \
   "https://graph.facebook.com/v2.8/me?fields=id%2Cname&access_token=EAACEdEose0cBADjvheo6B2I8wepfRyU1bIPhBg7rSfzlJVIWTK2ZCtRxEGhjLG7VNZAOrZAeVYK0r1CFZCsZCUFd3pg3tUGtC12dBUkZCZAVB4h07Qo3EXJRslepxicsIyo1jXbKTNEvPyBWQln5gkcbaYJiLFRfHKkdkWp8bZBmZCtNKUXf6RBVct91uE6ko870ZD"
   */

  // Search for Facebook users

  //searchUsers(searchParam: string) : FBUser {
  //this.accessToken = this.facebook.getLoginStatus().then((accessToken) => {
  //  console.log(accessToken);
  //  return accessToken;
  //});

  //return this.http.get(`${this.facebookApiUrl}/me?fields=id%2Cname&access_token=${accessToken}`)
  //  .map(res => <FBUser>(res.json().items))
  //  return {"id":1, "name":this.accessToken};
  //}
}
