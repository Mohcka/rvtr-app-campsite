import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingsListComponent } from './lodgings-list.component';
import { lodgingsMock } from '../booking-data-mock';
import { Lodging } from 'src/app/data/lodging.model';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LodgingsListComponent', () => {
  let component: LodgingsListComponent;
  let fixture: ComponentFixture<LodgingsListComponent>;

  let lodgingsListDe: DebugElement;
  let lodgingsListEl: HTMLElement;
  let lodgingItemEl: ElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LodgingsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingsListComponent);
    component = fixture.componentInstance;

    lodgingsListDe = fixture.debugElement;
    lodgingsListEl = fixture.nativeElement;

    component.lodgings = lodgingsMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 2D array of lodgings', () => {
    const resultLodgingRow = component.lodgingsRow(lodgingsMock, 1);
    const expectedLodginRow: Lodging[][] = [[lodgingsMock[0]], [lodgingsMock[1]]];

    expect(resultLodgingRow).toEqual(expectedLodginRow);
  });

  it('should emit when a lodging is clicked', () => {
    // Implemented using the following resource
    // https://www.vincecampanale.com/blog/2018/03/22/testing-custom-events-angular/
    lodgingItemEl = lodgingsListDe.query(By.css('.lodging-item'));
    spyOn(component.lodgingClickHandler, 'emit'); // Spy to listen for when event is emitted
    lodgingItemEl.nativeElement.click(); // Click the lodging item
    expect(component.lodgingClickHandler.emit).toHaveBeenCalled();
  });
});
