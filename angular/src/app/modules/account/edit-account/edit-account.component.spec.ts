import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountComponent } from './edit-account.component';
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from '../../../data/account.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditAccountComponent', () => {
  let component: EditAccountComponent;
  let fixture: ComponentFixture<EditAccountComponent>;

  let accountServiceMock;

  let accountMock: Account[];

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get() {
          return 1;
        }
      }
    }
  };

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['get', 'put', 'isNullOrWhitespace']);

    TestBed.configureTestingModule({
      declarations: [EditAccountComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AccountService, useValue: accountServiceMock }
      ],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
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

    fixture = TestBed.createComponent(EditAccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load account on creation', () => {
    accountServiceMock.get.and.returnValue(of(accountMock));
    fixture.detectChanges();

    expect(component.data).toBe(accountMock[0]);
  });

  describe('onSubmit', () => {
    it('should call put on AccountService with valid account', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      accountServiceMock.put.and.returnValue(of(accountMock[0]));
      accountServiceMock.isNullOrWhitespace.and.returnValue(false);

      component.data = accountMock[0];
      component.onSubmit();
      fixture.detectChanges();

      expect(accountServiceMock.put).toHaveBeenCalled();
    });

    it('should not call put on AccountService with empty name', () => {
      accountServiceMock.get.and.returnValue(of(accountMock));
      accountServiceMock.put.and.returnValue(of(accountMock));
      accountServiceMock.isNullOrWhitespace.and.returnValue(true);

      component.data.name = '';

      component.onSubmit();
      fixture.detectChanges();

      expect(accountServiceMock.put).toHaveBeenCalledTimes(0);
    });
    // it('should not call put on AccountService with empty payments', () => {
    //   accountServiceMock.get.and.returnValue(of(accountMock));
    //   accountServiceMock.put.and.returnValue(of(accountMock));
    //   fixture.detectChanges();

    //   component.data.payments = [];

    //   component.onSubmit();

    //   expect(accountServiceMock.put).toHaveBeenCalledTimes(0);
    // });
    // it('should not call put on AccountService with invalid address', () => {
    //   accountServiceMock.get.and.returnValue(of(accountMock));
    //   accountServiceMock.put.and.returnValue(of(accountMock));
    //   fixture.detectChanges();

    //   component.data.address.street = '';

    //   component.onSubmit();

    //   expect(accountServiceMock.put).toHaveBeenCalledTimes(0);
    // });
  });
});
