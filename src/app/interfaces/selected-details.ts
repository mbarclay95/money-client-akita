import {createSummedEntry, SummedEntry} from './summed-entries';
import {createEntry, Entry} from '../entries/state/entry.model';

export interface SelectedDetails {
  sums: SummedEntry[];
  entries: Entry[];
}

export function createSelectedDetails(params: Partial<SelectedDetails>): SelectedDetails {
  return {
    sums: params.sums ? params.sums.map(s => createSummedEntry(s)) : [],
    entries: params.entries ? params.entries.map(e => createEntry(e)) : [],
  } as SelectedDetails;
}
