import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChartLine} from '../../../interfaces/chart-line';
import {Subject} from 'rxjs';
import {InDepthStoreService} from '../../../services/budgets/in-depth-store.service';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';
import {filter, takeUntil} from 'rxjs/operators';
import {SummedEntry} from '../../../interfaces/summed-entries';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-sums-graph',
  templateUrl: './sums-graph.component.html',
  styleUrls: ['./sums-graph.component.scss']
})
export class SumsGraphComponent implements OnInit {
  @Input() set data(data: SummedEntry[]) {
    this.initChartData(data);
  }

  chartData: ChartLine[];

  colorScheme = {
    domain: ['#5AA454', '#888888']
  };

  constructor(
    private inDepthStoreService: InDepthStoreService,
    private dateFilterStoreService: DateFilterStoreService,
  ) { }

  ngOnInit(): void {
  }

  initChartData(summedEntries: SummedEntry[]): void {
    const monthData: ChartLine = {name: 'Monthly Contribution', series: []};
    const summedData: ChartLine = {name: 'Balance', series: []};
    let total = 0;

    summedEntries = summedEntries.sort((a, b) => {
      return (a.year - b.year) * 100 + (a.month - b.month);
    });

    for (const summedEntry of summedEntries) {
      total += summedEntry.sum;
      monthData.series.push({name: dayjs().month(summedEntry.month - 1).year(summedEntry.year).format('M/YY'), value: summedEntry.sum});
      summedData.series.push({name: dayjs().month(summedEntry.month - 1).year(summedEntry.year).format('M/YY'), value: total});
    }

    this.chartData = [summedData, monthData];
  }

  toCurrency(amount): string {
    return `$${amount}`;
  }

  onSelect(data): void {
    const [month, year] = data.name.split('/');

    const theMonth = parseInt(month, 10) - 1;
    const theYear = parseInt(`20${year}`, 10);
    this.dateFilterStoreService.changeBoth(theMonth, theYear);
  }

}
