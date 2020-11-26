import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Category, createCategory} from '../../../categories/state/category.model';
import {createSubCategory, SubCategory} from '../../../sub-categories/state/sub-category.model';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {takeUntil} from 'rxjs/operators';
import {createMapping, Mapping} from '../../state/mapping.model';
import {Entry} from '../../../entries/state/entry.model';
import {MappingsService} from '../../state/mappings.service';
import {MappingsQuery} from '../../state/mappings.query';

@Component({
  selector: 'app-mapping-modal',
  templateUrl: './mapping-modal.component.html',
  styleUrls: ['./mapping-modal.component.scss']
})
export class MappingModalComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Mapping>;

  newMapping: Mapping;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public categoriesQuery: CategoriesQuery,
    public mappingsService: MappingsService,
    public mappingsQuery: MappingsQuery
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(mapping => {
      this.newMapping = createMapping({...mapping});
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveMapping(): Promise<void> {
    if (this.newMapping.id === 0) {
      await this.mappingsService.add(this.newMapping);
    } else {
      await this.mappingsService.update(this.newMapping);
    }
    this.isVisible = false;
  }

  setCategoryAndSubCategory(subCategory: SubCategory): void {
    this.newMapping.subCategory = subCategory;
    this.newMapping.category = subCategory.category;
  }

}
