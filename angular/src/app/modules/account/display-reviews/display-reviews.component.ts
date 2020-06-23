import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { map } from 'rxjs/operators';
import { Review } from 'src/app/data/review.model';
import { ReviewService } from 'src/app/services/lodging/review.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'uic-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.scss']
})
export class DisplayReviewsComponent implements OnInit {

  // properties
  reviews: Review[];

  // functions
  // http get to call the most recent 2 reviews by the account from the review service. using account id.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard
  getReviews() {
    const id: string = this.accountService.getUserId();
    this.reviewService.get(undefined, new HttpParams().set('AccoundId', id))
    .pipe(map(reviews => reviews.slice(0, 2)))
    .subscribe(val => this.reviews = val);
  }

  constructor(private readonly accountService: AccountService,
              private readonly reviewService: ReviewService
    ) { }

  ngOnInit(): void {
    this.getReviews();
  }
}
