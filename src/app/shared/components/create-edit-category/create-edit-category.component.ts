import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Category, createCategory} from '../../../categories/state/category.model';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.scss']
})
export class CreateEditCategoryComponent implements OnInit, OnDestroy {
  @Input() openModal: Observable<Category>;

  category: Category;
  isVisible = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(category => {
      this.category = createCategory({...category});
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveCategory(): Promise<void> {
    if (this.category.id === 0) {
      await this.categoriesService.add(this.category);
    } else {
      await this.categoriesService.update(this.category);
    }

    this.isVisible = false;
  }
}
