import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {createEntry, Entry} from '../../../entries/state/entry.model';
import {takeUntil} from 'rxjs/operators';
import {createSubCategory, SubCategory} from '../../../sub-categories/state/sub-category.model';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {SubCategoriesService} from '../../../sub-categories/state/sub-categories.service';

@Component({
  selector: 'app-create-edit-sub-category',
  templateUrl: './create-edit-sub-category.component.html',
  styleUrls: ['./create-edit-sub-category.component.scss']
})
export class CreateEditSubCategoryComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<SubCategory>;

  subCategory: SubCategory;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public subCategoriesQuery: SubCategoriesQuery,
    public subCategoriesService: SubCategoriesService,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(subCategory => {
      this.subCategory = createSubCategory({...subCategory});
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveSubCategory(): Promise<void> {
    if (this.subCategory.id === 0) {
      await this.subCategoriesService.add(this.subCategory);
    } else {
      await this.subCategoriesService.update(this.subCategory);
    }

    this.isVisible = false;
  }
}
