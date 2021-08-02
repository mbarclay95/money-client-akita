import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EntriesState} from '../../../entries/state/entries.store';
import {EntriesQuery} from '../../../entries/state/entries.query';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {Entry} from '../../../entries/state/entry.model';
import {EntriesService} from '../../../entries/state/entries.service';
import {BanksQuery} from '../../../banks/state/banks.query';
import {Subject} from 'rxjs';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';

@Component({
  selector: 'app-view-entries-table',
  templateUrl: './view-entries-table.component.html',
  styleUrls: ['./view-entries-table.component.scss']
})
export class ViewEntriesTableComponent implements OnInit {
  @ViewChild('entryTableTag', {static: true}) entryTable: NzTableComponent<Entry>;
  @Input() entriesState: EntriesState;
  @Input() showPagination: boolean;
  @Input() showActions = true;

  editEntry: Subject<Entry> = new Subject<Entry>();

  constructor(
    public entriesQuery: EntriesQuery,
    public entriesService: EntriesService,
    public banksQuery: BanksQuery,
    public subCategoriesQuery: SubCategoriesQuery
  ) { }

  ngOnInit(): void {
    this.entriesService.resetUi();
  }

}
