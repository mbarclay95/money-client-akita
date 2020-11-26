import { Component, OnInit } from '@angular/core';
import {AuthQuery} from '../../../auth/state/auth.query';
import {SubCategoriesQuery} from '../../../sub-categories/state/sub-categories.query';
import {AuthService} from '../../../auth/state/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    public authQuery: AuthQuery,
    public authService: AuthService,
    public subCategoriesQuery: SubCategoriesQuery
  ) { }

  ngOnInit(): void {
  }

}
