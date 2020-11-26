import {createSubCategory, SubCategory} from '../sub-categories/state/sub-category.model';

export interface SavingsTotal {
  subCategory: SubCategory;
  total: number;
}

export function createSavingsTotal(params: Partial<SavingsTotal>): SavingsTotal {
  return {
    subCategory: params.subCategory ? createSubCategory(params.subCategory) : null,
    total: isNaN(params.total) ? null : Number(params.total),
  } as SavingsTotal;
}
