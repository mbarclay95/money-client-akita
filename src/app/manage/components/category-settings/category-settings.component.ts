import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {Category, createCategory} from '../../../categories/state/category.model';
import {createSubCategory, SubCategory} from '../../../sub-categories/state/sub-category.model';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';
import {Subject} from 'rxjs';
import {SubCategoriesService} from '../../../sub-categories/state/sub-categories.service';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-category-settings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.scss']
})
export class CategorySettingsComponent implements OnInit {
  @Input() activeCategory: Category | null;

  @ViewChild('categoriesTableTag', {static: true}) categoriesTable: NzTableComponent<Category>;
  @ViewChild('subCategoriesTableTag', {static: true}) subCategoriesTable: NzTableComponent<SubCategory>;

  openCategoryModal: Subject<Category> = new Subject<Category>();
  openSubCategoryModal: Subject<SubCategory> = new Subject<SubCategory>();

  constructor(
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
    public subCategoriesService: SubCategoriesService,
    public subCategoriesQuery: SubCategoriesQuery,
  ) {
  }

  ngOnInit(): void {
  }

  categoryDropped(event): void {
    // add 1 because sort starts at 1 instead of 0
    const oldPosition = event.previousIndex + 1;
    const newPosition = event.currentIndex + 1;

    const movedCategories: {id: number, sort: number}[] = [];
    const movedDown: boolean = oldPosition - newPosition > 0;

    this.categoriesQuery.getAll()
      .filter(s => {
        if (movedDown) {
          return s.sort <= oldPosition && s.sort >= newPosition;
        } else {
          return s.sort >= oldPosition && s.sort <= newPosition;
        }
      })
      .forEach(s => {
        if (s.sort === oldPosition) {
          movedCategories.push({id: s.id, sort: newPosition});
          this.categoriesService.updateCache(s.id, {sort: newPosition});
        } else {
          movedCategories.push({id: s.id, sort: s.sort + (movedDown ? 1 : -1)});
          this.categoriesService.updateCache(s.id, {sort: s.sort + (movedDown ? 1 : -1)});
        }
      });

    this.categoriesService.updateSort(movedCategories);
  }

  subCategoryDropped(event): void {
    // add 1 because sort starts at 1 instead of 0
    const oldPosition = event.previousIndex + 1;
    const newPosition = event.currentIndex + 1;

    const movedSubCategories: {id: number, sort: number}[] = [];
    const movedDown: boolean = oldPosition - newPosition > 0;

    this.subCategoriesQuery.subCategoriesByCategory(this.activeCategory.id, false)
      .filter(s => {
        if (movedDown) {
          return s.sort <= oldPosition && s.sort >= newPosition;
        } else {
          return s.sort >= oldPosition && s.sort <= newPosition;
        }
      })
      .forEach(s => {
        if (s.sort === oldPosition) {
          movedSubCategories.push({id: s.id, sort: newPosition});
          this.subCategoriesService.updateCache(s.id, {sort: newPosition});
        } else {
          movedSubCategories.push({id: s.id, sort: s.sort + (movedDown ? 1 : -1)});
          this.subCategoriesService.updateCache(s.id, {sort: s.sort + (movedDown ? 1 : -1)});
        }
      });

    this.subCategoriesService.updateSort(movedSubCategories);
  }

  createCategory(): void {
    const newCategory = createCategory({id: 0, isActive: true});
    this.openCategoryModal.next(newCategory);
  }

  deleteCategory(category: Category): void {
    this.categoriesService.delete(category);
    this.categoriesQuery.selectFirst().pipe(
      take(1),
      tap(c => this.categoriesService.setActive(c.id))
    ).subscribe();
  }

  createSubCategory(): void {
    const newSubCategory = createSubCategory({id: 0, isActive: true, category: this.activeCategory});
    this.openSubCategoryModal.next(newSubCategory);
  }
}
