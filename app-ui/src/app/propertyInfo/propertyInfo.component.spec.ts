import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { propertyInfoComponent } from './propertyInfo.component';

describe('propertyInfoComponent', () => {
  let component: propertyInfoComponent;
  let fixture: ComponentFixture<propertyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ propertyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(propertyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
