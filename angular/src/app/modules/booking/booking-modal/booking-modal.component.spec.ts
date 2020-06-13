import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingModalComponent } from './booking-modal.component';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Booking } from 'src/app/data/booking.model';
import { Lodging } from 'src/app/data/lodging.model';
import { BookingSearchData } from '../@types/booking-search-data';
import { mockBookings, mockLodgings, mockBookingSearchDataSet } from '../mock-booking-data';

describe('BookingModalComponent', () => {
  let component: BookingModalComponent;
  let fixture: ComponentFixture<BookingModalComponent>;

  let bookingModalDe: DebugElement;
  let bookingModalEl: HTMLElement;
  let expectedBooking: Booking;
  let expectedLodging: Lodging;
  let expectedBookingSearchData: BookingSearchData;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingModalComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingModalComponent);
    component = fixture.componentInstance;

    // testing components with mock host input
    // https://angular.io/guide/testing#component-with-inputs-and-outputs

    bookingModalDe = fixture.debugElement.query(By.css('#booking-modal-form'));
    bookingModalEl = fixture.nativeElement;

    // mock input provided by parent component
    expectedBooking = mockBookings[0];
    expectedLodging = mockLodgings[0];
    expectedBookingSearchData = mockBookingSearchDataSet[0];

    // Simulate input for child component
    component.booking = expectedBooking;
    component.lodging = expectedLodging;
    component.searchData = expectedBookingSearchData;

    // Trigger binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('createGuestItem should return FromGroup', () => {
    const guestItem: FormGroup | FormGroup[] = component.createGuestItem();
    expect(guestItem).toBeInstanceOf(FormGroup);
  });
});
