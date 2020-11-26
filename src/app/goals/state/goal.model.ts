import {createSubCategory, SubCategory} from '../../sub-categories/state/sub-category.model';

export interface Goal {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  subCategory: SubCategory;
  month: number;
  year: number;
  amount: number;
  description: string;
}

export function createGoal(params: Partial<Goal>): Goal {
  return {
    id: params.id ?? null,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    subCategory: params.subCategory ? createSubCategory(params.subCategory) : null,
    amount: isNaN(params.amount) ? null : Number(params.amount),
    month: params.month ?? null,
    year: params.year ?? null,
    description: params.description
  } as Goal;
}
