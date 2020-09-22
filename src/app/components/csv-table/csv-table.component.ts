import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.css']
})
export class CsvTableComponent implements OnChanges {
  @Input() data: any[];
  @Output() action = new EventEmitter<any>();

  selection: any[] = [];
  dbColumns = ['ignore', 'names', 'lastnames', 'addresses', 'phones'];

  constructor() { }

  ngOnChanges() {
    if (this.data) {
      this.data.forEach(() => this.selection.push('ignore'));
    }
  }

  onChangeSelect(event: any, indexColumn: number) {
    this.selection[indexColumn] = event.target.value;
    this.action.emit(this.selection);
  }
}
