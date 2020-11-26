import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {UploadTemplatesQuery} from '../../../upload-templates/state/upload-templates.query';
import {createFileUpload, FileUpload} from '../../../interfaces/file-upload';
import {createUploadTemplate, UploadTemplate} from '../../../upload-templates/state/upload-template.model';
import {EntriesService} from '../../state/entries.service';
import {EnterEntriesStoreService} from '../../../services/entries/enter-entries-store.service';
import {UploadTemplatesService} from '../../../upload-templates/state/upload-templates.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<void>;

  isVisible = false;
  fileUpload: FileUpload;
  selectedTemplate: UploadTemplate;
  loading: boolean;
  createNewTemplate = false;
  uploadedData: any[];

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public uploadTemplatesQuery: UploadTemplatesQuery,
    public uploadTemplatesService: UploadTemplatesService,
    public entriesService: EntriesService,
    public enterEntriesStoreService: EnterEntriesStoreService,
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

  async handleOk(): Promise<void> {
    this.loading = true;
    if (this.createNewTemplate) {
      const templateId = await this.uploadTemplatesService.add(this.selectedTemplate);
      await this.entriesService.processFile(templateId, this.fileUpload.id).pipe(
        tap(e => this.enterEntriesStoreService.setEntries(e))
      ).toPromise();
      this.isVisible = false;
    } else if (this.selectedTemplate.id === 0) {
      this.createNewTemplate = true;
      this.uploadedData = await this.entriesService.getDataForNewTemplate(this.fileUpload.id);
    } else {
      await this.entriesService.processFile(this.selectedTemplate.id, this.fileUpload.id).pipe(
        tap(e => this.enterEntriesStoreService.setEntries(e))
      ).toPromise();
      this.isVisible = false;
    }

    this.loading = false;
  }

  getUploadPath(): string {
    return `${environment.apiUrl}/upload-file`;
  }

  handleChange({file}): void {
    const status = file.status;

    if (status === 'removed') {
      this.fileUpload = null;
    }

    if (status === 'done') {
      this.fileUpload = createFileUpload(file.response);
    }
  }

  selectNewTemplate(): void {
    this.selectedTemplate = createUploadTemplate({id: 0});
  }

  isDisabled(): boolean {
    if (this.createNewTemplate) {
      return this.selectedTemplate.amount === null || this.selectedTemplate.description === null ||
        this.selectedTemplate.dateSpent === null || !this.selectedTemplate.bank || this.selectedTemplate.name === null;
    }

    return !this.fileUpload || !this.selectedTemplate;
  }
}
