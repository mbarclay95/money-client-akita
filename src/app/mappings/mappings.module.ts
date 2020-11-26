import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MappingModalComponent } from './components/mapping-modal/mapping-modal.component';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {FormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations: [MappingModalComponent],
    exports: [
        MappingModalComponent
    ],
  imports: [
    CommonModule,
    NzModalModule,
    NzSelectModule,
    FormsModule,
    NzInputModule,
    SharedModule
  ]
})
export class MappingsModule { }
