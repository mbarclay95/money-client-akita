import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartLine} from '../../../../interfaces/chart-line';
import {Subject} from 'rxjs';
import {InDepthStoreService} from '../../../../services/budgets/in-depth-store.service';
import {filter, takeUntil} from 'rxjs/operators';
import {SummedEntry} from '../../../../interfaces/summed-entries';
import {DateFilterStoreService} from '../../../../services/budgets/date-filter-store.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-graph-for-year',
  templateUrl: './graph-for-year.component.html',
  styleUrls: ['./graph-for-year.component.scss']
})
export class GraphForYearComponent implements OnInit, OnDestroy {
  chartData: ChartLine[];

  colorScheme = {
    domain: ['#5AA454', '#888888']
  };

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private inDepthStoreService: InDepthStoreService,
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
    this.inDepthStoreService.summedEntries$.pipe(
      takeUntil(this.subscriptionDestroyer),
      filter(e => !!e)
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
