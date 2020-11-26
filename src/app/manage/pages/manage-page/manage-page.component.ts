import { Component, OnInit } from '@angular/core';
import {CategoriesQuery} from '../../../categories/state/categories.query';
import {CategoriesService} from '../../../categories/state/categories.service';
import {take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.scss']
})
export class ManagePageComponent implements OnInit {

  constructor(
    public categoriesQuery: CategoriesQuery,
    public categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.categoriesQuery.categories$.pipe(
      take(1),
      tap(c => this.categoriesService.setActive(c[0].id))
    ).subscribe();
  }

}
