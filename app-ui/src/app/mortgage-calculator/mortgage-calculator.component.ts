import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss']
})
export class MortgageCalculatorComponent implements OnInit{

  showMore: boolean = false
  title = 'Mortgage Calculator';
  constructor() { }

  ngOnInit() {
  }

}


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.sass']
// })
// export class AppComponent {
//   showMore: boolean = false
//   title = 'Mortgage Calculator';
// }
