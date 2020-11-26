import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  initialAmount: number;
  salary: number;
  initialDate: Date;
  initialSubCategoryId: number;
  name: string;
  email: string;
}

export function createAuth(params: Partial<AuthState>): AuthState {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    initialAmount: isNaN(params.initialAmount) ? null : Number(params.initialAmount),
    salary: isNaN(params.salary) ? null : Number(params.salary),
    initialSubCategoryId: isNaN(params.initialSubCategoryId) ? null : Number(params.initialSubCategoryId),
    initialDate: params.initialDate ? new Date(params.initialDate) : null,
    name: params.name ?? null,
    email: params.email ?? null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createAuth({}));
  }

}

