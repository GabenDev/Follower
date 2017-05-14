import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

import { ItemsPage } from '../items/items';
import { Geolocation } from 'ionic-native';
//import {Observable} from 'rxjs/Rx';

//import {MongoTodoService} from '../../providers/mongoTodoService';
import {LocatorService} from '../../providers/LocatorService';

import { Http, Headers } from '@angular/http';
import {Coordinate} from '../../domain/coordinate';

declare var google;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers : [LocatorService]
})
export class MainPage {
  userName : string;
  longitude = 10;
  latitude = 20;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  todosUrl = "http://213.222.183.206:8000/api/coords";

  constructor(private locatorService : LocatorService, private nav : NavController) {
    Facebook.login(['email']).then((response:FacebookLoginResponse) => {
      Facebook.getAccessToken().then((v) => {
        Facebook.api("/me?fields=id%2Cname&access_token="+v, ['public_profile'])
        .then((profile) => {
            this.userName = profile.name;
          })
        .catch((error) => {
            console.log("Unable to login with facebbok");
        }) ;
      });
    });
    this.getCoords();
    Geolocation.getCurrentPosition().then((resp) => {
      locatorService.save('G-Device', resp.coords.longitude, resp.coords.latitude);
    });

    this.loadMap();

    //window.setInterval(this.updateCoords, 5000);

    //Observable.interval(2000 * 60).subscribe(x => {
    //  this.updateCoords();
    //});
  }

  public updateCoords() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.locatorService.save('G-Device', resp.coords.longitude, resp.coords.latitude);
    //  //alert('Save position invoked');
    //  //this.locatorService.save('G-Device', resp.coords.longitude, resp.coords.latitude);
    //
    //  let newCoordinate = new Coordinate('G-Device', resp.coords.longitude, resp.coords.latitude);
    //  let body = JSON.stringify(newCoordinate);
    //  alert('Save position invoked: ' + body);
    //  let headers = new Headers({'Content-Type': 'application/json'});
    //
    //  this.http.post(this.todosUrl, body, {headers: headers});
    //
    }).catch((error) => {
      alert('Error occured' + error);
      console.log('Error getting location', error);
    });

  }

  public addItem() {
    alert('Yuppee an item to be added 3 !');
  }

  public items() {
    this.nav.push(ItemsPage);
  }


  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap(){
    Geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public getCoords() {
    Geolocation.getCurrentPosition().then((resp) => {
      console.log("Latitude: " + resp.coords.latitude);
      console.log("Longitude: " + resp.coords.longitude);
      this.longitude = resp.coords.latitude;
      this.latitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


};
