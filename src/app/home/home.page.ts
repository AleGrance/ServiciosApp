import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  ngOnInit(): void {
    //this.printCurrentPosition();
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    console.log('Current position:', coordinates);

    let latitude = coordinates.coords.latitude;
    let longitude = coordinates.coords.longitude;

    this.open(latitude, longitude);
    console.log(latitude, longitude);
  };

  open(latitude: any, longitude: any) {
    let url =
      'https://www.google.com.py/maps/place/' + latitude + ',' + longitude;
    window.open(url, '_blank');
  }
}
