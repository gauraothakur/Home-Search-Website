import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFinderComponent } from './agent-finder.component';

describe('AgentFinderComponent', () => {
  let component: AgentFinderComponent;
  let fixture: ComponentFixture<AgentFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
