import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterEntriesPageComponent } from './pages/enter-entries-page/enter-entries-page.component';
import { EnterEntriesTableComponent } from './components/enter-entries-table/enter-entries-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import { GetEntryClassPipe } from './pipes/get-entry-class.pipe';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { IsEntryCompletePipe } from './pipes/is-entry-complete.pipe';
import {SharedModule} from '../shared/shared.module';
import { UploadModalComponent } from './components/upload-modal/upload-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {MappingsModule} from '../mappings/mappings.module';
import { CreateNewTemplateComponent } from './components/create-new-template/create-new-template.component';
import { PastEntriesModalComponent } from './components/past-entries-modal/past-entries-modal.component';



@NgModule({
  declarations: [
    EnterEntriesPageComponent,
    EnterEntriesTableComponent,
    GetEntryClassPipe,
    IsEntryCompletePipe,
    UploadModalComponent,
    CreateNewTemplateComponent,
    PastEntriesModalComponent,
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzDatePickerModule,
    NzSelectModule,
    NzCheckboxModule,
    CurrencyMaskModule,
    NzButtonModule,
    NzSpinModule,
    SharedModule,
    NzModalModule,
    NzUploadModule,
    MappingsModule
  ]
})
export class EntriesModule { }
