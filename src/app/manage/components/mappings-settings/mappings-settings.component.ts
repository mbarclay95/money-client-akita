import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {MappingsQuery} from '../../../mappings/state/mappings.query';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {createMapping, Mapping} from '../../../mappings/state/mapping.model';
import {createSubCategory, SubCategory} from '../../../sub-categories/state/sub-category.model';
import {Subject} from 'rxjs';
import {Category} from '../../../categories/state/category.model';
import {MappingsService} from '../../../mappings/state/mappings.service';

@Component({
  selector: 'app-mappings-settings',
  templateUrl: './mappings-settings.component.html',
  styleUrls: ['./mappings-settings.component.scss']
})
export class MappingsSettingsComponent implements OnInit {
  @ViewChild('mappingTableTag', {static: true}) mappingTable: NzTableComponent<Mapping>;

  selectedSubCategory: SubCategory = createSubCategory({id: 0, category: this.categoriesQuery.getActive()});
  openMappingsModal: Subject<Mapping> = new Subject<Mapping>();

  constructor(
    public categoriesQuery: CategoriesQuery,
    public mappingsQuery: MappingsQuery,
    public mappingsService: MappingsService,
  ) { }

  ngOnInit(): void {
  }

  createNewMapping(): void {
    const newMapping = createMapping({id: 0});
    this.openMappingsModal.next(newMapping);
  }

}
