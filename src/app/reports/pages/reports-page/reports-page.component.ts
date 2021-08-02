import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.testing();
  }

  testing(): void {

    const t1: TestString = new TestString({key: 'key1', withString: 'hi'});
    const t2: TestNumber = new TestNumber({key: 'key2', withNumber: 1});

    const test = t1.get<TestNumber>('key3');

    console.log(test);
  }

}

export class TestParent {
  key: string;

  constructor(obj?: any | TestParent) {
    if (obj !== null) {
      Object.assign<TestParent, typeof obj>(this, obj);
    }
  }

  get<T extends TestParent>(key: string): T;

  get(key: string): TestParent {
    if (key === this.key) {
      return this;
    }

    return null;
  }
}

export class TestString extends TestParent {
  withString: string;

  constructor(obj?: any | TestString) {
    super(obj);
    if (obj !== null) {
      Object.assign<TestString, typeof obj>(this, obj);
    }
  }
}

export class TestNumber extends TestParent {
  withNumber: number;

  constructor(obj?: any | TestNumber) {
    super(obj);
    if (obj !== null) {
      Object.assign<TestNumber, typeof obj>(this, obj);
    }
  }
}


