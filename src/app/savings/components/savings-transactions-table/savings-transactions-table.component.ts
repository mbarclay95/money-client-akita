import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Entry} from '../../../entries/state/entry.model';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {SavingsStoreService} from '../../../services/savings/savings-store.service';

@Component({
  selector: 'app-savings-transactions-table',
  templateUrl: './savings-transactions-table.component.html',
  styleUrls: ['./savings-transactions-table.component.scss']
})
export class SavingsTransactionsTableComponent implements OnInit {
  @Input() entries: Entry[];
  @ViewChild('entryTableTag', {static: true}) entryTable: NzTableComponent<Entry>;

  showTransactions = true;

  constructor(
    public savingsStoreService: SavingsStoreService
  ) { }

  ngOnInit(): void {
  }

}
