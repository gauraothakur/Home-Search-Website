import { Component, OnInit, Input } from '@angular/core';
import { Property } from 'src/app/model/propertyDetails';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-property-grid',
  templateUrl: './property-grid.component.html',
  styleUrls: ['./property-grid.component.scss']
})
export class PropertyGridComponent implements OnInit {

  constructor(
    private navigationService: NavigationService
  ) { }
  @Input()
  public propertyListings: any[];

  ngOnInit() {
  }
  /**
   * Scroll to the element based on the passed id and highlight it
   * @param elementId 
   */
  public scrollToElement(elementId: any): void {
    let targetElement: any = document.getElementById(elementId);
    targetElement.scrollIntoView();
    targetElement.classList.add("hightlight-property");
  }

  /**
   * Remove highlighting of the property
   * @param elementId 
   */
  public removeHighlight(elementId: any): void {
    let targetElement: any = document.getElementById(elementId);
    targetElement.scrollIntoView();
    targetElement.classList.remove("hightlight-property");
  }

  /**
   * Navigate to property details page
   * @param property 
   */
  public goToPropertyDetails(property: Property): void {
    console.log(property);
    let query = {
      _id: property._id,
    };
    this.navigationService.goToPropertyDetails(query);
  }

}
