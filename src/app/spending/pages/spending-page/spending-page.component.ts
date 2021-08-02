import { Component, OnInit } from '@angular/core';
import {SpendingUiService} from '../../../services/spending/spending-ui.service';

@Component({
  selector: 'app-spending-page',
  templateUrl: './spending-page.component.html',
  styleUrls: ['./spending-page.component.scss']
})
export class SpendingPageComponent implements OnInit {

  constructor(
    public spendingUiService: SpendingUiService
  ) { }

  ngOnInit(): void {
  }

}
