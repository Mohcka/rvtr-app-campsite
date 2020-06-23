import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { EditPaymentComponent } from './edit-payment.component';

describe('EditPaymentComponent', () => {
  let component: EditPaymentComponent;
  let fixture: ComponentFixture<EditPaymentComponent>;

  let accountServiceMock;

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getPayment', 'getUserId']);

    TestBed.configureTestingModule({
      declarations: [ EditPaymentComponent ],
      providers: [
        { provide: AccountService, useValue: accountServiceMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
