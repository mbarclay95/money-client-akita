import { Pipe, PipeTransform } from '@angular/core';
import {GoalsQuery} from '../../goals/state/goals.query';
import {Category} from '../../categories/state/category.model';
import {SubCategory} from '../../sub-categories/state/sub-category.model';
import {Goal} from '../../goals/state/goal.model';

@Pipe({
  name: 'subCategoryHasGoals'
})
export class SubCategoryHasGoalsPipe implements PipeTransform {

  constructor(
    private goalsQuery: GoalsQuery
  ) {
  }

  transform(activeCategory: Category | SubCategory, ...args: unknown[]): Goal[] {
    if ('savings' in activeCategory) {
      return null;
    }

    const goals = this.goalsQuery.getValueBySubCategory(activeCategory.id);
    if (goals.length === 0) {
      return null;
    }

    return goals;
  }

}
