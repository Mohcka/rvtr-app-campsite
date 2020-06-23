import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../../data/account.model';
import { AccountService } from 'src/app/services/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'uic-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {

  // properties
  data: Account = {
    id: null,
    address: null,
    name: null,
    payments: null,
    profiles: null
  };

  // functions
  // function to check if an input field is nul/undefined/or white spaces
  isNullOrWhitespace(input: string) {
    if (typeof input === 'undefined' || input === null) {
      return true;
    }
    return input.replace(/\s/g, '').length < 1;
  }

  // http get from account service to obtain all the information of an account based on account id
  get() {
    const x = +this.activatedRoute.snapshot.paramMap.get('id');
    this.accountService.get(x.toString()).subscribe(data =>
      this.data = data[0]
    );
  }

  // http put from account service to update account information, validation is very ugly
  onSubmit() {
    if (this.isNullOrWhitespace(this.data.name) || this.isNullOrWhitespace(this.data.address.street) ||
      this.isNullOrWhitespace(this.data.address.city) || this.isNullOrWhitespace(this.data.address.stateProvince) ||
      this.isNullOrWhitespace(this.data.address.postalCode) || this.isNullOrWhitespace(this.data.address.country) ||
      this.data.payments.length <= 0 || this.data.profiles.length <= 0) {
      confirm('Please fill all the information and have at least one payment and profile before you update');
    } else {
      this.accountService.put(this.data).subscribe(
        success => {
          console.log('success: ', this.data);
          alert('updated!');
        },
        error => console.log('error'));
    }
  }

  onBack(){
    this.router.navigateByUrl(`account/${this.data.id.toString()}`);
  }

  constructor(private readonly accountService: AccountService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.get();
  }
}
