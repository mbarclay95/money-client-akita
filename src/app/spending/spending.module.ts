import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SpendingPageComponent} from './pages/spending-page/spending-page.component';
import {SharedModule} from '../shared/shared.module';
import { TotalsComponent } from './components/totals/totals.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SelectedDetailsComponent } from './components/selected-details/selected-details.component';
import { SelectedStatsComponent } from './components/selected-stats/selected-stats.component';
import { LastYearGraphComponent } from './components/last-year-graph/last-year-graph.component';
import {LineChartModule} from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    SpendingPageComponent,
    TotalsComponent,
    CategoryListComponent,
    SelectedDetailsComponent,
    SelectedStatsComponent,
    LastYearGraphComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LineChartModule
  ]
})
export class SpendingModule { }
