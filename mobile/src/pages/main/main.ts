import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device, Facebook, FacebookLoginResponse} from 'ionic-native';

import { ItemsPage } from '../items/items';
import { Geolocation } from 'ionic-native';
//import {Observable} from 'rxjs/Rx';

//import {MongoTodoService} from '../../providers/mongoTodoService';
import {LocatorService} from '../../providers/LocatorService';

import { Http } from '@angular/http';
import {Coordinate} from "../../domain/coordinate";
import {CoordMarker} from "../../domain/CoordMarker";
import {Observable} from "rxjs/Observable";
// import {Coordinate} from '../../domain/coordinate';

declare var google;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers : [LocatorService]
})
export class MainPage {
  userName : string;
  userId : string;
  longitude = 0;
  latitude = 0;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  todosUrl = "http://gaben.gleeze.com:8000/api/coords";
  public coords:Coordinate[];
  markers = [];

  constructor(private locatorService : LocatorService, public http: Http, private nav : NavController) {
    Facebook.login(['email']).then((response:FacebookLoginResponse) => {
      Facebook.getAccessToken().then((v) => {
        Facebook.api("/me?fields=id%2Cname&access_token="+v, ['public_profile'])
        .then((profile) => {
            this.userName = profile.name;
            this.userId = profile.id;
          })
        .catch((error) => {
            console.log("Unable to login with facebbok");
        }) ;
      });
    });
    this.loadMap();
    this.updateCoords();
    setInterval(() => { this.updateCoords(); }, 5000);
  }

  handleError(error) {
    console.error(error);
    alert("Error: " + error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public updateCoords() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.locatorService.save(Device.uuid, this.longitude, this.latitude)
        .subscribe(data => {
          this.coords = data;
          this.addMarker();
        });
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
      // this.addMarker();
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
    // this.removeMarkers();
    // "graph.facebook.com/" + this.userId + "/picture"
    for (var i = 0; i < this.coords.length; i++) {

      let currentCoordMarker = this.markers.find(x => x.coordinate.deviceId === this.coords[i].deviceId);

      if(currentCoordMarker) {
        currentCoordMarker.coordinate = this.coords[i];
        currentCoordMarker.marker.setPosition(new google.maps.LatLng(currentCoordMarker.coordinate.latitude,currentCoordMarker.coordinate.longitude));
        currentCoordMarker.marker.setMap(this.map);
        currentCoordMarker.marker.setVisible(true);
      } else {
        // " + this.userId + "
        // var image = "graph.facebook.com/1447312798/picture";
        // var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        // var image = '/src/img/pet.jpg';
        var image = 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png';
        var marker = new google.maps.Marker({
          map: this.map,
          position: new google.maps.LatLng(this.coords[i].latitude,this.coords[i].longitude)
          ,icon: image
        });
        let content = "<h4>Device: "+ this.coords[i].deviceId + "</h4><br/>";
        content += "Latitude: " + this.coords[i].latitude + ", ";
        content += "Longitude: " + this.coords[i].longitude;
        this.addInfoWindow(marker, content);
        this.markers.push(new CoordMarker(this.coords[i], marker));
      }
    }
  }

  removeMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }

  refreshMarkers() {
    this.removeMarkers();
    this.addMarker();
  }

  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
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
