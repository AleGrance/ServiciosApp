import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

}
