import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  index : number = 0;
  carousel: { image: string, caption: string }[] = [
    { image: "assets\\corosel-1.jpg", caption: "../../assets/corousel-1.jpg" },
  ];

  constructor(){
  }
}
