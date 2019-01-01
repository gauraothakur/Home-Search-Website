import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../model/propertyDetails';
import { PropertyService } from '../services/property.service';
import { FileUploaderService } from '../services/file-uploader.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.scss']
})
export class UpdatePropertyComponent implements OnInit {
  public imageDetails: any[] = [];
  public propertyDetails: Property;
  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private fileUploader: FileUploaderService,
    private navigationsvc: NavigationService) { }
  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: any) => {
        this.propertyService.getPropertyById(params.get('_id')).subscribe(
          (res: Property) => {
            console.log(res);
            this.propertyDetails = res;
            this.imageDetails = res.images;
          }
        );
      }
    );

    this.fileUploader.getUploader().onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(response.split("uploads\\")[1]);
      if (status == 200) {
        let filename: string = response.split("uploads\\")[1];
        this.imageDetails.push({ src: this.getImageUrl(filename) });
      }
    };
  }
  /**
   * Construct Image URL
   * @param item 
   */
  public getImageUrl(item: string): string {
    return "http://localhost:3000/api/file/" + item;
  }

  /**
   * Upload selected files
   */
  public uploadFiles(): void {
    this.fileUploader.getUploader().uploadAll();
  }

  /**
   * Navigate to previous page
   */
  public goToPreviousPage(): void {
    window.history.go(-1);
  }

  /**
   * Update Property
   */
  public updateProperty(): void {
    this.propertyDetails.images = this.imageDetails;
    this.propertyService.updateProperty(this.propertyDetails).subscribe(
      (property: Property) => {
        this.propertyDetails = property;
        this.imageDetails = property.images;
        alert("Property added successfully")
      }
    );
  }

}
