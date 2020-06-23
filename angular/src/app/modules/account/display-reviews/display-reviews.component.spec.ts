import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/services/account/account.service';
import { DisplayReviewsComponent } from './display-reviews.component';

describe('DisplayReviewsComponent', () => {
  let component: DisplayReviewsComponent;
  let fixture: ComponentFixture<DisplayReviewsComponent>;
  let accountServiceMock;

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
    fixture = TestBed.createComponent(DisplayReviewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
