import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { DisplayReviewsComponent } from './display-reviews.component';
import { Review } from 'src/app/data/review.model';
import { of } from 'rxjs';

describe('DisplayReviewsComponent', () => {
  let component: DisplayReviewsComponent;
  let fixture: ComponentFixture<DisplayReviewsComponent>;

  let accountServiceMock;

  let reviewsMock: Review[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getReviews', 'getUserId']);

    TestBed.configureTestingModule({
      declarations: [ DisplayReviewsComponent ],
      providers: [
        { provide: AccountService, useValue: accountServiceMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    reviewsMock = [{
      id: '1',
      accountId: '1',
      lodgingId: '1',
      lodging: {
        id: null,
        location: null,
        name: 'Hilton',
        rentals: null,
        reviews: null
      },
      comment: 'good stuff man',
      dateCreated: new Date('6/10/2020'),
      rating: 4
    },
    {
      id: '2',
      accountId: '1',
      lodgingId: '2',
      lodging: {
        id: null,
        location: null,
        name: 'Marriot',
        rentals: null,
        reviews: null
      },
      comment: 'super bad',
      dateCreated: new Date('6/10/2020'),
      rating: 1
    }];

    fixture = TestBed.createComponent(DisplayReviewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    accountServiceMock.getUserId.and.returnValue(of(1));
    accountServiceMock.getReviews.and.returnValue(of(reviewsMock));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
