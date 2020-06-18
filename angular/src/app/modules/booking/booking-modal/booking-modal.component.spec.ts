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
import { Profile } from 'src/app/data/profile.model';
import { profile } from 'console';
import { Rental } from 'src/app/data/rental.model';
import { Stay } from 'src/app/data/stay.model';
import { ControlMessagesComponent } from 'src/app/layout/control-messages/control-messages.component';
import { checkServerIdentity } from 'tls';

describe('BookingModalComponent', () => {
  let component: BookingModalComponent;
  let fixture: ComponentFixture<BookingModalComponent>;

  let bookingModalDe: DebugElement;
  let bookingModalEl: HTMLElement;
  let expectedBooking: Booking;
  let expectedLodging: Lodging;
  let expectedBookingSearchData: BookingSearchData;
  const profileMock: Partial<Profile[]> = [];
  const rentalsMock: Rental[] = [];
  const stayMock: Partial<Stay> = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingModalComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
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

  it('should add a guest item', () => {
    // * Arrange
    // Guest form groups should equal to the number of
    // guests chosen from BookingSearchData Input
    const initialNumGuests = expectedBookingSearchData.guests.value;
    const numToAdd = 3;

    // * Act
    // Add new guest form groups

    // Looping method taken from:
    // https://stackoverflow.com/a/39232049
    Array.from(Array(numToAdd)).forEach(() => {
      component.addNextGuestItem();
    });

    // * Assert
    // Number of guest form groups should be incremented
    const resultNumGuestFormGroups = (component.bookingForm.controls['guests'] as FormArray).length;
    expect(resultNumGuestFormGroups).toEqual(initialNumGuests + numToAdd);
  });

  it('should remove guest form group', () => {
    // * Arrange
    // Guest form groups should equal to the number of
    // guests chosen from BookingSearchData Input
    const initialNumGuests = expectedBookingSearchData.guests.value;
    const numToAdd = initialNumGuests + 3;
    // * Act
    // First add a few form groups

    // Looping method taken from:
    // https://stackoverflow.com/a/39232049
    Array.from(Array(numToAdd)).forEach(() => {
      component.addNextGuestItem();
    });

    // Remove one
    component.removeGuestItem(0);
    // * Assert
    const resultNumGuestFormGroups = (component.bookingForm.controls['guests'] as FormArray).length;
    expect(resultNumGuestFormGroups).toBe(numToAdd);
  });

  it('should submit booking form', () => {
    component.bookingForm.setValue({
      checkIn: '2020-01-01',
      checkOut: '2020-02-01',
      guests: [{
        given: 'firstName',
        family: 'familyName',
        email: 'me@email.com',
        phone: '123456788',
      }],
      rentals: [{
        id: 11,
        name: 'Room',
        rentalUnit: {
                      id: 10,
                      bathrooms: [{
                                    id: 2,
                                    fixtue: 2
                                  }],
                      bedrooms: [{
                                    id: 2,
                                    count: 1,
                                    type: 'master'
                                  }],
                      name: '226',
                      occupancy: 4,
                      type: 'Hotel Room'
                    }
        }],
    });
    fixture.detectChanges();
    expect(component.bookingForm.invalid).toBe(false);
    component.onBookingFormSubmit();
    expect(component.f.checkIn.value).toBe('2020-01-01');
  });

  it('should open and close modal', () => {
    component.openModal(null, mockLodgings[0]);
    expect(component.bookingModal.nativeElement.classList).toContain('is-active');
    component.closeModal(null);
    expect(component.bookingModal.nativeElement.classList).not.toContain('is-active');
  });

});