import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartLine} from '../../../interfaces/chart-line';
import {Subject} from 'rxjs';
import {DateFilterStoreService} from '../../../services/budgets/date-filter-store.service';
import {filter, map, takeUntil} from 'rxjs/operators';
import {SummedEntry} from '../../../interfaces/summed-entries';
import * as dayjs from 'dayjs';
import {SpendingService} from '../../../services/spending/spending.service';

@Component({
  selector: 'app-last-year-graph',
  templateUrl: './last-year-graph.component.html',
  styleUrls: ['./last-year-graph.component.scss']
})
export class LastYearGraphComponent implements OnInit, OnDestroy {
  chartData: ChartLine[];

  colorScheme = {
    domain: ['#5AA454', '#888888']
  };

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private spendingService: SpendingService,
    private dateFilterStoreService: DateFilterStoreService,
  ) { }

  ngOnInit(): void {
    this.subscribeToChanges();
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  subscribeToChanges(): void {
    this.spendingService.summedEntries$.pipe(
      takeUntil(this.subscriptionDestroyer),
      filter(e => !!e),
      map(details => [...details.sums]),
    ).subscribe(e => this.initChartData(e));
  }

  initChartData(summedEntries: SummedEntry[]): void {
    const data: ChartLine = {name: 'Last 12 Months', series: []};

    summedEntries = summedEntries.sort((a, b) => {
      return (a.year - b.year) * 100 + (a.month - b.month);
    });

    for (const summedEntry of summedEntries) {
      data.series.push({name: dayjs().month(summedEntry.month - 1).year(summedEntry.year).format('M/YY'), value: summedEntry.sum});
    }

    this.chartData = [data];
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
