import { Component, OnInit } from '@angular/core';
import {AuthQuery} from '../../../auth/state/auth.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authQuery: AuthQuery
  ) { }

  ngOnInit(): void {
  }

}
