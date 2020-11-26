import {Component, Input, OnInit} from '@angular/core';
import {UploadTemplate} from '../../../upload-templates/state/upload-template.model';
import {BanksQuery} from '../../../banks/state/banks.query';

@Component({
  selector: 'app-create-new-template',
  templateUrl: './create-new-template.component.html',
  styleUrls: ['./create-new-template.component.scss']
})
export class CreateNewTemplateComponent implements OnInit {
  @Input() newTemplate: UploadTemplate;
  @Input() set uploadedData(uploadedData: any[]) {
    if (uploadedData) {
      this.setNewOriginalData(uploadedData);
    }
  }

  singleRow = false;
  originalData: any[] = [];
  manipulatedData: any[] = [];
  options: { label: string, key: string }[] = [
    {
      label: 'Description',
      key: 'description'
    },
    {
      label: 'Amount',
      key: 'amount'
    },
    {
      label: 'Date Spent',
      key: 'dateSpent'
    }];
  optionModels: string[] = [];

  constructor(
    public banksQuery: BanksQuery
  ) { }

  ngOnInit(): void {
  }

  setNewOriginalData(uploadedData: any[]): void {
    this.originalData = uploadedData;

    if (this.originalData.length > 1) {
      this.originalData[0].map(() => this.optionModels.push(null));
    } else {
      this.singleRow = true;
      this.optionModels.push(null);
    }

    this.setManipulatedData();
  }

  setManipulatedData(changedNumberOfColumns: boolean = false): void {
    let tempData = JSON.parse(JSON.stringify(this.originalData.slice(0, 5)));

    if (this.newTemplate.notInRows && this.newTemplate.columnsPerRow > 0) {

      // reset the columns if the number changes
      if (changedNumberOfColumns) {
        for (let i = 0; i < this.newTemplate.columnsPerRow; i++) {
          this.optionModels = [];
          this.optionModels.push(null);
        }
        this.newTemplate.amount = null;
        this.newTemplate.description = null;
        this.newTemplate.dateSpent = null;
      }


      const rows = [];
      let row = [];
      let counter = 0;

      if (this.newTemplate.skipFirstDataPoint) {
        tempData[0] = tempData[0].slice(1, -1);
      }

      for (const data of tempData[0]) {
        row.push(data);
        counter++;

        if (counter === this.newTemplate.columnsPerRow) {
          rows.push(row);
          row = [];
          counter = 0;
        }

      }

      tempData = rows;
    }

    if (this.newTemplate.skipFirstRow) {
      tempData = [...tempData.filter((v, i) => i !== 0)];
    }

    if (this.newTemplate.negateAmount) {
      tempData = [...tempData.map(d => {
        if (isNaN(parseFloat(d[this.newTemplate.amount]))) {
          d[this.newTemplate.amount] = '';
        } else {
          d[this.newTemplate.amount] = (parseFloat(d[this.newTemplate.amount]) * -1).toFixed(2);
        }

        return d;
      })];
    }

    this.manipulatedData = tempData;
  }

  selectedColumn($event: string, i: number): void {
    this.options.map(o => {
      if (this.newTemplate[o.key] === i) {
        this.newTemplate[o.key] = null;
      }
    });

    this.newTemplate[$event] = i;
  }

  optionSelected(key: string): boolean {
    return this.newTemplate[key];
  }

}
