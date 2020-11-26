import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {SubCategory} from '../../../sub-categories/state/sub-category.model';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {
  @Input() subCategory: SubCategory;
  @Output() selectedSubCategory: EventEmitter<SubCategory> = new EventEmitter<SubCategory>();
  @Input() includeAll = false;
  @Input() showIncomeSubCategories = true;

  constructor(
    public categoriesQuery: CategoriesQuery,
    public subCategoriesQuery: SubCategoriesQuery
  ) { }

  ngOnInit(): void {
  }

  compareSubCategories(s1: SubCategory, s2: SubCategory): boolean {
    if (!s1 || !s2) {
      return false;
    }

    return s1.id === s2.id && s1.category.id === s2.category.id;
  }

}
