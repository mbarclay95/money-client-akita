import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {EntriesModule} from './entries/entries.module';
import {LoginPageComponent} from './auth/pages/login-page/login-page.component';
import {EnterEntriesPageComponent} from './entries/pages/enter-entries-page/enter-entries-page.component';
import {BudgetsModule} from './budgets/budgets.module';
import {BudgetPageComponent} from './budgets/pages/budget-page/budget-page.component';
import {InitialLoadResolver} from './resolvers/initial-load-resolver';
import {ManageModule} from './manage/manage.module';
import {ManagePageComponent} from './manage/pages/manage-page/manage-page.component';
import {MappingsModule} from './mappings/mappings.module';
import {SavingsModule} from './savings/savings.module';
import {SavingsPageComponent} from './savings/pages/savings-page/savings-page.component';

const routes: Routes = [
  {
    path: '', resolve: {InitialLoadResolver}, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'add-transactions', component: EnterEntriesPageComponent},
      {path: 'budget', component: BudgetPageComponent},
      {path: 'manage', component: ManagePageComponent},
      {path: 'savings', component: SavingsPageComponent},
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    EntriesModule,
    BudgetsModule,
    ManageModule,
    MappingsModule,
    SavingsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
