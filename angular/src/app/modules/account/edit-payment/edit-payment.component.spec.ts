import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { EditPaymentComponent } from './edit-payment.component';
import { Payment } from 'src/app/data/payment.model';
import { of } from 'rxjs';

describe('EditPaymentComponent', () => {
  let component: EditPaymentComponent;
  let fixture: ComponentFixture<EditPaymentComponent>;

  let accountServiceMock;

  let paymentsMock: Payment[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getPayment', 'getUserId', 'postPayment', 'isValidCreditCard', 'deletePayment', 'isNullOrWhitespace']);

    TestBed.configureTestingModule({
      declarations: [ EditPaymentComponent ],
      providers: [
        { provide: AccountService, useValue: accountServiceMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    paymentsMock = [{
      id: 1,
      accountId: 1,
      cardExpirationDate: new Date('7/9/21'),
      cardName: 'Visa',
      cardNumber: '123456789123456'
    },
    {
      id: 2,
      accountId: 1,
      cardExpirationDate: new Date('1/22/21'),
      cardName: 'Master',
      cardNumber: '987654321987654'
    }];

    fixture = TestBed.createComponent(EditPaymentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    accountServiceMock.getPayment.and.returnValue(of(paymentsMock));
    accountServiceMock.getUserId.and.returnValue(of(1));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('toggleCard', () => {
    it('should change hideCard value to opposite', () => {
      const initalValue = component.hideCard;

      component.toggleCard();

      expect(component.hideCard).not.toBe(initalValue);
    });
  });

  describe('addCard', () => {
    it('should add valid card', () => {
      accountServiceMock.getPayment.and.returnValue(of(paymentsMock));
      accountServiceMock.postPayment.and.returnValue(of(true));
      accountServiceMock.isValidCreditCard.and.returnValue(true);
      accountServiceMock.isNullOrWhitespace.and.returnValue(false);

      const newCard: Payment = {
        id: 0,
        cardName: 'TestCard',
        cardNumber: '5859752099176973',
        cardExpirationDate: new Date('12/1/2022'),
        accountId: 1
      };
      component.newCard = newCard;
      paymentsMock.push(newCard);

      fixture.detectChanges();

      component.addCard();

      expect(component.cards.length).toBe(3);
    });
    it('should not add card with empty name', () => {
      accountServiceMock.getPayment.and.returnValue(of(paymentsMock));
      accountServiceMock.isValidCreditCard.and.returnValue(true);
      accountServiceMock.isNullOrWhitespace.and.returnValue(true);

      const newCard: Payment = {
        id: 0,
        cardName: '',
        cardNumber: '5859752099176973',
        cardExpirationDate: new Date('12/1/2022'),
        accountId: 1
      };
      component.newCard = newCard;
      fixture.detectChanges();

      component.addCard();

      expect(accountServiceMock.postPayment).not.toHaveBeenCalled();
    });
    it('should not add card with invalid number', () => {
      accountServiceMock.getPayment.and.returnValue(of(paymentsMock));
      accountServiceMock.isValidCreditCard.and.returnValue(false);
      accountServiceMock.isNullOrWhitespace.and.returnValue(true);

      const newCard: Payment = {
        id: 0,
        cardName: 'Test Card',
        cardNumber: '58597520991',
        cardExpirationDate: new Date('12/1/2022'),
        accountId: 1
      };
      component.newCard = newCard;
      fixture.detectChanges();

      component.addCard();

      expect(accountServiceMock.postPayment).not.toHaveBeenCalled();
    });
    it('should not add expired card', () => {
      accountServiceMock.getPayment.and.returnValue(of(paymentsMock));
      accountServiceMock.isValidCreditCard.and.returnValue(false);
      accountServiceMock.isNullOrWhitespace.and.returnValue(true);

      const newCard: Payment = {
        id: 0,
        cardName: 'Test Card',
        cardNumber: '5859752099176973',
        cardExpirationDate: new Date('12/1/1922'),
        accountId: 1
      };
      component.newCard = newCard;
      fixture.detectChanges();

      component.addCard();

      expect(accountServiceMock.postPayment).not.toHaveBeenCalled();
    });
  });

  describe('removeCard', () => {
    it('should call accountService.deletePayment', () => {
      accountServiceMock.getPayment.and.returnValue(of(paymentsMock));
      accountServiceMock.deletePayment.and.returnValue(of(true));
      fixture.detectChanges();

      component.removeCard(paymentsMock[0].id);

      expect(accountServiceMock.deletePayment).toHaveBeenCalled();
    });
  });
});
