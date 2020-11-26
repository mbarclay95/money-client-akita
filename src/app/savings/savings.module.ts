import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavingsPageComponent } from './pages/savings-page/savings-page.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FormsModule} from '@angular/forms';
import { SumSavingsTotalsPipe } from './pipes/sum-savings-totals.pipe';
import { SavingsTransactionsTableComponent } from './components/savings-transactions-table/savings-transactions-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { SumsGraphComponent } from './components/sums-graph/sums-graph.component';
import {LineChartModule} from '@swimlane/ngx-charts';
import { IsEntryPositivePipe } from './pipes/is-entry-positive.pipe';
import { MoveMoneyModalComponent } from './components/move-money-modal/move-money-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    SavingsPageComponent,
    AccountsListComponent,
    AccountDetailsComponent,
    SumSavingsTotalsPipe,
    SavingsTransactionsTableComponent,
    SumsGraphComponent,
    IsEntryPositivePipe,
    MoveMoneyModalComponent
  ],
  imports: [
    CommonModule,
    NzSwitchModule,
    FormsModule,
    NzTableModule,
    NzIconModule,
    LineChartModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    CurrencyMaskModule,
    SharedModule
  ]
})
export class SavingsModule { }
