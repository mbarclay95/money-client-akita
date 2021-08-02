import {Component, Input, OnInit} from '@angular/core';
import {SummedEntry} from '../../../interfaces/summed-entries';

@Component({
  selector: 'app-stats-for-year',
  templateUrl: './stats-for-year.component.html',
  styleUrls: ['./stats-for-year.component.scss']
})
export class StatsForYearComponent implements OnInit {
  @Input() summedEntries: SummedEntry[];
  @Input() verbiage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
