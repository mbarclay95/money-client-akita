import {Category, createCategory} from '../../categories/state/category.model';

export interface SubCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: boolean;
  category: Category;
  sort: number;
  showInBudget: boolean;
}

export function createSubCategory(params: Partial<SubCategory>): SubCategory {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    name: params.name ?? '',
    isActive: params.isActive ?? true,
    category: createCategory(params.category ?? {}),
    sort: params.sort ?? null,
    showInBudget: params.showInBudget ?? false
  } as SubCategory;
}
