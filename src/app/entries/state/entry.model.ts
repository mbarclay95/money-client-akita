import {Category, createCategory} from '../../categories/state/category.model';
import {createSubCategory, SubCategory} from '../../sub-categories/state/sub-category.model';
import {Bank, createBank} from '../../banks/state/bank.model';

export interface Entry {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  subCategory: SubCategory;
  fromSavingsSubCategory: SubCategory;
  amount: number;
  dateSpent: Date;
  description: string;
  isIncomplete: boolean;
  bank: Bank;
}

export function createEntry(params: Partial<Entry>): Entry {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    amount: isNaN(params.amount) ? null : Number(params.amount),
    dateSpent: params.dateSpent ? new Date(params.dateSpent) : null,
    description: params.description ?? null,
    category: !!params.category ? createCategory(params.category) : null,
    subCategory: !!params.subCategory ? createSubCategory(params.subCategory) : null,
    fromSavingsSubCategory: params.fromSavingsSubCategory ? createSubCategory(params.fromSavingsSubCategory) : null,
    bank: !!params.bank ? createBank(params.bank) : null,
    isIncomplete : params.isIncomplete
  } as Entry;
}

export function isEntryCompleted(entry: Partial<Entry>): boolean {
  return !!entry.subCategory && !!entry.amount && entry.amount >= 0 && entry.dateSpent instanceof Date && !!entry.bank;
}

export function isSavingsEntryPositive(entry: Entry, activeSubCategory: SubCategory): boolean {
  if (activeSubCategory === null) {
    return entry.category.savings;
  }

  if (entry.fromSavingsSubCategory === null) {
    return true;
  }

  return (entry.category.savings &&
    entry.fromSavingsSubCategory.id !== activeSubCategory.id);
}
