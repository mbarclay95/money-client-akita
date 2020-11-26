export interface Category {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  isActive: boolean;
  income: boolean;
  savings: boolean;
  sort: number;
  showInBudget: boolean;
}

export function createCategory(params: Partial<Category>): Category {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    name: params.name ?? '',
    isActive: params.isActive ?? true,
    income: params.income ?? false,
    savings: params.savings ?? false,
    sort: params.sort ?? null,
    showInBudget: params.showInBudget ?? false
  } as Category;
}
