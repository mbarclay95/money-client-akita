import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {EntriesQuery} from '../../state/entries.query';
import {EntriesService} from '../../state/entries.service';

@Component({
  selector: 'app-past-entries-modal',
  templateUrl: './past-entries-modal.component.html',
  styleUrls: ['./past-entries-modal.component.scss']
})
export class PastEntriesModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<void>;

  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public entriesQuery: EntriesQuery,
    public entriesService: EntriesService,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(() => this.isVisible = true);
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

}
