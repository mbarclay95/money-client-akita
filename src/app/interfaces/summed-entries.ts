export interface SummedEntry {
  month: number;
  year: number;
  sum: number;
}

export function createSummedEntry(params: Partial<SummedEntry>): SummedEntry {
  return {
    month: isNaN(params.month) ? null : Number(params.month),
    year: isNaN(params.year) ? null : Number(params.year),
    sum: isNaN(params.sum) ? null : Number(params.sum),
  } as SummedEntry;
}
