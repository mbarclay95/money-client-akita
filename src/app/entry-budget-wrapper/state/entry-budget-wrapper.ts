import {createEntry, Entry} from '../../entries/state/entry.model';
import {Budget, createBudget} from '../../budgets/state/budget.model';
import {createSubCategorySums, SubCategorySums} from '../../interfaces/sub-category-sums';

export interface EntryBudgetWrapper {
  entries: Entry[];
  budgets: Budget[];
  subCategorySums: SubCategorySums[];
  showFromSavings: boolean;
}

export function createEntryBudgetWrapper(params: Partial<EntryBudgetWrapper>): EntryBudgetWrapper {
  return {
    entries: params.entries ? params.entries.map(e => createEntry(e)) : [],
    budgets: params.budgets ? params.budgets.map(b => createBudget(b)) : [],
    subCategorySums: params.subCategorySums ? params.subCategorySums.map(s => createSubCategorySums(s)) : [],
    showFromSavings: params.showFromSavings ?? false
  };
}
