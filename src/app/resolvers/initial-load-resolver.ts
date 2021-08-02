import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CategoriesService} from '../categories/state/categories.service';
import {SubCategoriesService} from '../sub-categories/state/sub-categories.service';
import {Injectable} from '@angular/core';
import {EntriesService} from '../entries/state/entries.service';
import {BudgetsService} from '../budgets/state/budgets.service';
import {GoalsService} from '../goals/state/goals.service';
import {EntryBudgetWrapperService} from '../entry-budget-wrapper/state/entry-budget-wrapper.service';
import {AuthService} from '../auth/state/auth.service';
import {UploadTemplatesService} from '../upload-templates/state/upload-templates.service';
import {MappingsService} from '../mappings/state/mappings.service';
import {BanksService} from '../banks/state/banks.service';
import {SpendingService} from '../services/spending/spending.service';

@Injectable({ providedIn: 'root' })
export class InitialLoadResolver implements Resolve<void>{

  constructor(
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    private goalsService: GoalsService,
    private entryBudgetWrapperService: EntryBudgetWrapperService,
    private uploadTemplatesService: UploadTemplatesService,
    private authService: AuthService,
    private mappingsService: MappingsService,
    private banksService: BanksService,
    private entriesService: EntriesService,
    private spendingService: SpendingService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.authService.getUser(1);
    await this.categoriesService.get();
    await this.subCategoriesService.get();
    await this.goalsService.get();
    await this.uploadTemplatesService.get();
    await this.mappingsService.get();
    await this.banksService.get();
    this.entriesService.listenToUi();
    this.spendingService.listenToUi();
  }
}
