import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

/// <reference types="@types/googlemaps" />


@Component({
  selector: 'app-place-auto-complete',
  templateUrl: './place-auto-complete.component.html',
  styleUrls: ['./place-auto-complete.component.scss']
})
export class PlaceAutoCompleteComponent implements OnInit, AfterViewInit {

  autoCompleteAddress: any;
  @ViewChild('location') location: any;
  @Output() setLocation: EventEmitter<any> = new EventEmitter();
  @Input()
  public defaultText: string;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getAddressAutoComplete();
  }

  public getAddressAutoComplete(): void {
    const placeAutocomplete = new google.maps.places.Autocomplete(this.location.nativeElement,
      {
        componentRestrictions: { country: 'US' },
      });
    google.maps.event.addListener(placeAutocomplete, 'place_changed', () => {
      const place = placeAutocomplete.getPlace();
      this.invokeSetLocation(place);
    });
  }

  invokeSetLocation(place: Object) {
    this.setLocation.emit(place);
  }
}
