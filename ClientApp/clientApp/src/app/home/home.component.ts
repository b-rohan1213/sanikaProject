import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  index: number = 0;
  carousel: { image: string, caption: string }[] = [
    { image: "assets\\corosel-1.jpg", caption: "../../assets/corousel-1.jpg" },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  openRegister() {
    this.router.navigate(['register']);
  }
}
