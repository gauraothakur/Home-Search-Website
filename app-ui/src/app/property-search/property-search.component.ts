import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Property } from '../model/propertyDetails';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { PropertyGridComponent } from './property-grid/property-grid.component';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent implements OnInit {

  public properties: Property[] = [];
  public query: any = {};
  public searchField: string;

  @ViewChild(PropertyGridComponent)
  private propertyGridComponent: PropertyGridComponent;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private navigationService: NavigationService) { }
  ngOnInit() {
    this.getSearchResults();
  }
  /**
   * Call to property service
   */
  private getProperties(): Observable<any> {
    return this.propertyService.getProperties(this.query);
  }
  /**
   * Extract search criteria from URL and get list of properties
   * 
   */
  private getSearchResults(): void {
    this.route.paramMap.subscribe(
      (params: any) => {
        let query = params.params;
        let amenities = query["amenities"];
        if (amenities) {
          this.query.amenities = [];
          for (let amenity of amenities.split(",")) {
            this.query.amenities.push(amenity);
          }
        }
        for (let param in query) {
          if (param !== "amenities") {
            this.query[param] = query[param];
          }
        }
        this.getProperties().subscribe(
          (res: any) => {
            this.properties = res;
          }
        );
      }
    );
  }

  /**
   * Function to filter the properties
   */
  public filterProperties(): void {
    this.navigationService.goToPropertyListing(this.query);
  }
  /**
   * Method trigerred to scroll to the Property that is hovered on the map
   * @param event 
   */
  public scrollToElement(event: any): void {
    this.propertyGridComponent.scrollToElement(event);
  }

  /**
 * Method trigerred to de-higlight the Property that is un-hovered on the map
 * @param event 
 */
  public removeHighlight(event: any): void {
    this.propertyGridComponent.removeHighlight(event);
  }
  /**
   * Method to clear filters
   */
  public removeFilter(): void {
    this.query = {
      isForRent: this.query.isForRent
    }
    this.filterProperties();
  }
}
