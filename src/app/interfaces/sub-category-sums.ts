import {createSubCategory, SubCategory} from '../sub-categories/state/sub-category.model';

export interface SubCategorySums {
  subCategory: SubCategory;
  summedBudgetAmount: number;
  summedEntryAmount: number;
}

export function createSubCategorySums(params: Partial<SubCategorySums>): SubCategorySums {
  return {
    subCategory: params.subCategory ? createSubCategory(params.subCategory) : null,
    summedBudgetAmount: isNaN(params.summedBudgetAmount) ? null : Number(params.summedBudgetAmount),
    summedEntryAmount: isNaN(params.summedEntryAmount) ? null : Number(params.summedEntryAmount) ,
  } as SubCategorySums;
}
