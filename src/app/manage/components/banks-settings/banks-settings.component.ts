import {Component, OnInit, ViewChild} from '@angular/core';
import {BanksQuery} from '../../../banks/state/banks.query';
import {UploadTemplatesQuery} from '../../../upload-templates/state/upload-templates.query';
import {BanksService} from '../../../banks/state/banks.service';
import {UploadTemplatesService} from '../../../upload-templates/state/upload-templates.service';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {Bank, createBank} from '../../../banks/state/bank.model';
import {Subject} from 'rxjs';
import {UploadTemplate} from '../../../upload-templates/state/upload-template.model';

@Component({
  selector: 'app-banks-settings',
  templateUrl: './banks-settings.component.html',
  styleUrls: ['./banks-settings.component.scss']
})
export class BanksSettingsComponent implements OnInit {
  @ViewChild('bankTableTag', {static: true}) bankTable: NzTableComponent<Bank>;
  @ViewChild('templateTableTag', {static: true}) templateTable: NzTableComponent<UploadTemplate>;

  openBankModal: Subject<Bank> = new Subject<Bank>();

  constructor(
    public banksQuery: BanksQuery,
    public banksService: BanksService,
    public uploadTemplatesQuery: UploadTemplatesQuery,
    public uploadTemplatesService: UploadTemplatesService
  ) { }

  ngOnInit(): void {
  }

  createBank(): void {
    const newBank = createBank({id: 0});
    this.openBankModal.next(newBank);
  }

}
