import {Component, Input, OnInit} from '@angular/core';
import {InDepthStoreService} from '../../../../services/budgets/in-depth-store.service';

@Component({
  selector: 'app-stats-for-year',
  templateUrl: './stats-for-year.component.html',
  styleUrls: ['./stats-for-year.component.scss']
})
export class StatsForYearComponent implements OnInit {
  @Input() verbiage: string;

  constructor(
    public inDepthStoreService: InDepthStoreService
  ) { }

  ngOnInit(): void {
  }

}
