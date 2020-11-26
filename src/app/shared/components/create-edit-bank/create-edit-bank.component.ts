import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Bank, createBank} from '../../../banks/state/bank.model';
import {BanksService} from '../../../banks/state/banks.service';
import {BanksQuery} from '../../../banks/state/banks.query';

@Component({
  selector: 'app-create-edit-bank',
  templateUrl: './create-edit-bank.component.html',
  styleUrls: ['./create-edit-bank.component.scss']
})
export class CreateEditBankComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Bank>;

  bank: Bank;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public banksService: BanksService,
    public banksQuery: BanksQuery,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(bank => {
      this.bank = createBank({...bank});
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveBank(): Promise<void>  {
    if (this.bank.id === 0) {
      await this.banksService.add(this.bank);
    } else  {
      await this.banksService.update(this.bank);
    }

    this.isVisible = false;
  }
}
