import {Category, createCategory} from '../../categories/state/category.model';
import {createSubCategory, SubCategory} from '../../sub-categories/state/sub-category.model';

export interface Mapping {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  category: Category;
  subCategory: SubCategory;
}

export function createMapping(params: Partial<Mapping>): Mapping {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    description: params.description ?? '',
    category: createCategory(params.category ?? {}),
    subCategory: createSubCategory(params.subCategory ?? {}),
  } as Mapping;
}
