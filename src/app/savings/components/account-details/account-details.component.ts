import { Component, OnInit } from '@angular/core';
import {SavingsStoreService} from '../../../services/savings/savings-store.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor(
    public savingsStoreService: SavingsStoreService
  ) { }

  ngOnInit(): void {
  }

}
