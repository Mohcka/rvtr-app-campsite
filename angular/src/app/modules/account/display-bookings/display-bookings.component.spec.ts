import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { DisplayBookingsComponent } from './display-bookings.component';
import { LodgingService } from 'src/app/services/lodging/lodging.service';


describe('DisplayBookingsComponent', () => {
  let component: DisplayBookingsComponent;
  let fixture: ComponentFixture<DisplayBookingsComponent>;

  let accountServiceMock;
  let lodgingServiceMock;

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getBookings', 'getUserId']);
    lodgingServiceMock = jasmine.createSpyObj(['get']);

    TestBed.configureTestingModule({
      declarations: [ DisplayBookingsComponent ],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: LodgingService, useValue: lodgingServiceMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBookingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
