import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() public imageDetails: any[]=[];
  slidesVisible:number= 1;

  constructor() {
    // this.imageDetails = [{ src: "./assets/jumbo.jpg" }, { src: "jumbo.jpg" }, { src: "jumbo.jpg" }]
   }

  ngOnInit() {
  }
}
