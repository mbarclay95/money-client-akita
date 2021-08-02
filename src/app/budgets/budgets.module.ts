import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { IncomeTableComponent } from './components/income-table/income-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { GetEditableBudgetPipe } from './pipes/get-editable-budget.pipe';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {NzInputModule} from 'ng-zorro-antd/input';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { SavingsTableComponent } from './components/savings-table/savings-table.component';
import { GetTextColorPipe } from './pipes/get-text-color.pipe';
import { GetSavingsTextColorPipe } from './pipes/get-savings-text-color.pipe';
import { OverViewComponent } from './components/over-view/over-view.component';
import { GetSubCategoryTotalsPipe } from './pipes/get-sub-category-totals.pipe';
import { GetCategoryTotalsPipe } from './pipes/get-category-totals.pipe';
import {SharedModule} from '../shared/shared.module';
import { InDepthViewComponent } from './components/in-depth/in-depth-view/in-depth-view.component';
import { SavingsMonthComponent } from './components/in-depth/savings-month/savings-month.component';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import { GetPercentageSavedPipe } from './pipes/in-depth/get-percentage-saved.pipe';
import { IncomeMonthComponent } from './components/in-depth/income-month/income-month.component';
import { ExpensesMonthComponent } from './components/in-depth/expenses-month/expenses-month.component';
import { GetVerbiageForActivePipe } from './pipes/in-depth/get-verbiage-for-active.pipe';
import { GraphForYearComponent } from './components/in-depth/graph-for-year/graph-for-year.component';
import {LineChartModule} from '@swimlane/ngx-charts';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import { IsSelectedCategoryPipe } from './pipes/is-selected-category.pipe';
import { IsSelectedSubCategoryPipe } from './pipes/is-selected-sub-category.pipe';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NewGoalModalComponent } from './components/new-goal-modal/new-goal-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import { SubCategoryHasGoalsPipe } from './pipes/sub-category-has-goals.pipe';
import { GoalsComponent } from './components/in-depth/goals/goals.component';
import { GetLastMonthSumsPipe } from './pipes/in-depth/get-last-month-sums.pipe';
import { GetEntriesByActiveCategoryPipe } from './pipes/in-depth/get-entries-by-active-category.pipe';
import { MoneyBudgetMoneyModalComponent } from './components/money-budget-money-modal/money-budget-money-modal.component';



@NgModule({
  declarations: [
    BudgetPageComponent,
    IncomeTableComponent,
    GetEditableBudgetPipe,
    ExpensesTableComponent,
    SavingsTableComponent,
    GetTextColorPipe,
    GetSavingsTextColorPipe,
    OverViewComponent,
    GetSubCategoryTotalsPipe,
    GetCategoryTotalsPipe,
    InDepthViewComponent,
    SavingsMonthComponent,
    GetPercentageSavedPipe,
    IncomeMonthComponent,
    ExpensesMonthComponent,
    GetVerbiageForActivePipe,
    GraphForYearComponent,
    IsSelectedCategoryPipe,
    IsSelectedSubCategoryPipe,
    NewGoalModalComponent,
    SubCategoryHasGoalsPipe,
    GoalsComponent,
    GetLastMonthSumsPipe,
    GetEntriesByActiveCategoryPipe,
    MoneyBudgetMoneyModalComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule,
    NzIconModule,
    NzTableModule,
    NzSpinModule,
    CurrencyMaskModule,
    NzInputModule,
    SharedModule,
    NzProgressModule,
    LineChartModule,
    NzRadioModule,
    NzSwitchModule,
    NzButtonModule,
    NzModalModule,
    NzInputNumberModule
  ]
})
export class BudgetsModule { }
