import { Component, OnInit } from '@angular/core';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  date: any;

  constructor(
    public dateFilterStoreService: DateFilterStoreService
  ) { }

  ngOnInit(): void {
  }

}
