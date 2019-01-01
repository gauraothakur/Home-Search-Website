import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Property } from 'src/app/model/propertyDetails';

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.component.html',
  styleUrls: ['./property-map.component.scss']
})
export class PropertyMapComponent implements OnInit {
  @Output()
  public mouseOverEmitter = new EventEmitter<string>();
  @Output()
  public mouseOutEmitter = new EventEmitter<string>();

  constructor() { }
  @Input()
  public propertyListings: any[];
  ngOnInit() {
  }
  /**
   * Handle onMouseOver event on the agm-marker
   * @param property 
   */
  public onMouseOverMarker(property: Property): void {
    this.mouseOverEmitter.emit(property._id);
  }
  /**
   * Handle onMouseOut event on the agm-marker
   * @param property 
   */
  public onMouseOutMarker(property: Property): void {
    this.mouseOutEmitter.emit(property._id);
  }
}
