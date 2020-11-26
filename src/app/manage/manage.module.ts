import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePageComponent } from './pages/manage-page/manage-page.component';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {NzSelectModule} from 'ng-zorro-antd/select';
import { EntrySettingsComponent } from './components/entry-settings/entry-settings.component';
import {SharedModule} from '../shared/shared.module';
import { CategorySettingsComponent } from './components/category-settings/category-settings.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import { MappingsSettingsComponent } from './components/mappings-settings/mappings-settings.component';
import { FilterMappingsTablePipe } from './pipes/filter-mappings-table.pipe';
import {MappingsModule} from '../mappings/mappings.module';
import { BanksSettingsComponent } from './components/banks-settings/banks-settings.component';



@NgModule({
  declarations: [
    ManagePageComponent,
    UserSettingsComponent,
    EntrySettingsComponent,
    CategorySettingsComponent,
    MappingsSettingsComponent,
    FilterMappingsTablePipe,
    BanksSettingsComponent
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzInputModule,
    FormsModule,
    NzDatePickerModule,
    CurrencyMaskModule,
    NzSelectModule,
    SharedModule,
    NzTableModule,
    NzButtonModule,
    DragDropModule,
    NzCheckboxModule,
    NzIconModule,
    NzPopconfirmModule,
    MappingsModule
  ]
})
export class ManageModule { }
