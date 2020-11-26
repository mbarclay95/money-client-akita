import {Category, createCategory} from '../../categories/state/category.model';
import {createSubCategory, SubCategory} from '../../sub-categories/state/sub-category.model';

export interface Budget {
  id: number ;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  month: number;
  year: number;
  category: Category;
  subCategory: SubCategory;
}

export function createBudget(params: Partial<Budget>): Budget {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    amount: isNaN(params.amount) ? null : Number(params.amount),
    month: params.month ?? null,
    year: params.year ?? null,
    category: createCategory(params.category),
    subCategory: createSubCategory(params.subCategory),
  } as Budget;
}
