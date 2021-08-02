import {Component, Input, OnInit} from '@angular/core';
import {SpendingUiService, SpendingUiState} from '../../../services/spending/spending-ui.service';
import {SpendingService} from '../../../services/spending/spending.service';

@Component({
  selector: 'app-selected-details',
  templateUrl: './selected-details.component.html',
  styleUrls: ['./selected-details.component.scss']
})
export class SelectedDetailsComponent implements OnInit {
  @Input() ui: SpendingUiState;

  constructor(
    public spendingUiService: SpendingUiService,
    public spendingService: SpendingService,
  ) { }

  ngOnInit(): void {
  }

}
