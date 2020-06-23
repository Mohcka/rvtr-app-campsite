import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from '../../../data/account.model';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  let accountServiceMock;
  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get() {
          return 1;
        }
      }
    }
  };

  let accountMock: Account[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['get', 'getBookings', 'getReviews', 'getUserId']);

    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  }));
  beforeEach(() => {
    accountMock = [{
      id: '1',
      address: {
        id: '1',
        city: 'Dallas',
        country: 'US',
        postalCode: '12345',
        stateProvince: 'Texas',
        street: '1234 testing st.',
        unit: '24'
      },
      name: 'John Doe',
      payments: [{
        id: 1,
        cardExpirationDate: new Date('7/9/21'),
        cardName: 'Visa',
        cardNumber: '123456789123456'
      },
      {
        id: 2,
        cardExpirationDate: new Date('1/22/21'),
        cardName: 'Master',
        cardNumber: '987654321987654'
      },
      ],
      profiles: [{
        id: 1,
        email: 'JohnDoe@gmail.com',
        name: {
          id: 1,
          family: 'Doe',
          given: 'John'
        },
        phone: '1234567891',
        age: 'Adult',
        image: null
      },
      {
        id: 2,
        email: 'JaneDoe@gmail.com',
        name: {
          id: 2,
          family: 'Doe',
          given: 'Jane'
        },
        phone: '9876543219',
        age: 'Adult',
        image: null
      }]
    }];
  });

  it('should create', () => {
    accountServiceMock.get.and.returnValue(of(accountMock));
    accountServiceMock.getUserId.and.returnValue(1);

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
