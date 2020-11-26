import {Bank, createBank} from '../../banks/state/bank.model';
import {AuthState} from '../../auth/state/auth.store';

export interface UploadTemplate {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  bank: Bank;
  user: AuthState;

  name: string;
  skipFirstRow: boolean;
  negateAmount: boolean;
  notInRows: boolean;
  skipFirstDataPoint: boolean;
  columnsPerRow: number;

  description: number;
  amount: number;
  dateSpent: number;
}

export function createUploadTemplate(params: Partial<UploadTemplate>): UploadTemplate {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    amount: isNaN(params.amount) ? null : Number(params.amount),
    description: isNaN(params.description) ? null : Number(params.description),
    dateSpent: isNaN(params.dateSpent) ? null : Number(params.dateSpent),
    name: params.name ?? null,
    skipFirstRow: params.skipFirstRow ?? false,
    negateAmount: params.negateAmount ?? false,
    notInRows: params.notInRows ?? false,
    skipFirstDataPoint: params.skipFirstDataPoint ?? false,
    columnsPerRow: isNaN(params.columnsPerRow) ? 1 : Number(params.columnsPerRow),
    bank: !!params.bank ? createBank(params.bank) : null,
    user: !!params.user ? params.user : null,
  } as UploadTemplate;
}
