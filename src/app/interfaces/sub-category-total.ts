import {createSubCategory, SubCategory} from '../sub-categories/state/sub-category.model';

export interface SubCategoryTotal {
  subCategory: SubCategory;
  total: number;
}

export function createSubCategoryTotal(params: Partial<SubCategoryTotal>): SubCategoryTotal {
  return {
    subCategory: params.subCategory ? createSubCategory(params.subCategory) : null,
    total: isNaN(params.total) ? null : Number(params.total),
  } as SubCategoryTotal;
}
