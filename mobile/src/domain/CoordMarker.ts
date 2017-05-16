import {Coordinate} from "./coordinate";

export class CoordMarker {

  constructor(coordinate:Coordinate, marker:any) {
    this.coordinate = coordinate;
    this.marker = marker;
  }

  coordinate:Coordinate;
  marker:any;
}
