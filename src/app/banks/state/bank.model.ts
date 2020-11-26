export interface Bank {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export function createBank(params: Partial<Bank>): Bank {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : null,
    updatedAt: params.createdAt ? new Date(params.updatedAt) : null,
    name: params.name ?? ''
  } as Bank;
}
