import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterModule} from '@angular/router';
import { SubCategoriesByCategoryPipe } from './pipes/sub-categories-by-category.pipe';
import { AbsolutePipe } from './pipes/absolute.pipe';
import { ViewEntriesTableComponent } from './components/view-entries-table/view-entries-table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import { EditEntryModalComponent } from './components/edit-entry-modal/edit-entry-modal.component';
import { CategorySelectComponent } from './components/category-select/category-select.component';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import { SubCategoryValueByCategoryPipe } from './pipes/sub-category-value-by-category.pipe';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import { CreateEditCategoryComponent } from './components/create-edit-category/create-edit-category.component';
import { CreateEditSubCategoryComponent } from './components/create-edit-sub-category/create-edit-sub-category.component';
import { RemoveCurrentSubCategoryPipe } from './pipes/remove-current-sub-category.pipe';
import { CreateEditBankComponent } from './components/create-edit-bank/create-edit-bank.component';



@NgModule({
    declarations: [
      HeaderComponent,
      SubCategoriesByCategoryPipe,
      AbsolutePipe,
      ViewEntriesTableComponent,
      EditEntryModalComponent,
      CategorySelectComponent,
      SubCategoryValueByCategoryPipe,
      CreateEditCategoryComponent,
      CreateEditSubCategoryComponent,
      RemoveCurrentSubCategoryPipe,
      CreateEditBankComponent,
    ],
  exports: [
    HeaderComponent,
    SubCategoriesByCategoryPipe,
    AbsolutePipe,
    ViewEntriesTableComponent,
    CategorySelectComponent,
    SubCategoryValueByCategoryPipe,
    CreateEditCategoryComponent,
    CreateEditSubCategoryComponent,
    RemoveCurrentSubCategoryPipe,
    CreateEditBankComponent,
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzTableModule,
    NzIconModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzSelectModule,
    FormsModule,
    NzModalModule,
    NzInputModule,
    NzDatePickerModule,
    CurrencyMaskModule
  ]
})
export class SharedModule { }
