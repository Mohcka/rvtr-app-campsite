import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { DisplayBookingsComponent } from './display-bookings.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { Booking } from 'src/app/data/booking.model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('DisplayBookingsComponent', () => {
  let component: DisplayBookingsComponent;
  let fixture: ComponentFixture<DisplayBookingsComponent>;

  let accountServiceMock;
  let lodgingServiceMock;

  let bookingMock: Booking[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getBookings', 'getUserId']);
    lodgingServiceMock = jasmine.createSpyObj(['get']);

    TestBed.configureTestingModule({
      declarations: [DisplayBookingsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: LodgingService, useValue: lodgingServiceMock }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    bookingMock = [{
      id: '1',
      accountId: '1',
      lodgingId: '1',
      guests: null,
      bookingRentals: null,
      stay: {
        id: '1',
        checkIn: new Date('1/10/2020'),
        checkOut: new Date('1/15/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    },
    {
      id: '2',
      accountId: '1',
      lodgingId: '2',
      guests: null,
      bookingRentals: null,
      stay: {
        id: '2',
        checkIn: new Date('1/10/2020'),
        checkOut: new Date('1/15/2020'),
        dateCreated: null,
        dateModified: null
      },
      status: null
    }];

    fixture = TestBed.createComponent(DisplayBookingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    accountServiceMock.getBookings.and.returnValue(of(bookingMock));
    accountServiceMock.getUserId.and.returnValue(of(1));

    lodgingServiceMock.get.and.returnValue(of([]));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
