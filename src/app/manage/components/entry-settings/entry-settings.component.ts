import { Component, OnInit } from '@angular/core';
import {EntriesQuery} from '../../../entries/state/entries.query';
import {EntriesService} from '../../../entries/state/entries.service';

@Component({
  selector: 'app-entry-settings',
  templateUrl: './entry-settings.component.html',
  styleUrls: ['./entry-settings.component.scss']
})
export class EntrySettingsComponent implements OnInit {

  constructor(
    public entriesQuery: EntriesQuery,
    public entriesService: EntriesService,
  ) { }

  ngOnInit(): void {
  }

}
