import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { Account } from '../../../data/account.model';

@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  // properties
  data: Account;

  // functions


  // http get to call the most recent 2 reviews by the account from the review service. using account id.
  // The 2 listings serve as a quick snapshot accessible from the account dashboard

  // http get to retrieve account information from account service using account id
  getAccount() {
    const userId = this.accountService.getUserId();
    this.accountService.get(userId).subscribe(data => {
      this.data = data[0];
    });
  }

  constructor(private readonly accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.getAccount();
  }
}
