import {createSummedEntry, SummedEntry} from './summed-entries';
import {createEntry, Entry} from '../entries/state/entry.model';

export interface SavingsDetails {
  sums: SummedEntry[];
  entries: Entry[];
}

export function createSavingsDetails(params: Partial<SavingsDetails>): SavingsDetails {
  return {
    sums: params.sums ? params.sums.map(s => createSummedEntry(s)) : [],
    entries: params.entries ? params.entries.map(e => createEntry(e)) : [],
  } as SavingsDetails;
}
