import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

//import { LocalStorageService, LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() moduleName: string;
  @Input() elementData: [{}];
  @Input() displayedColumns: string[];
  @Output() action = new EventEmitter<any>();
  @ViewChild('table', { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: any;
  isloading = true;
  menuButtons = ['delete'];

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elementData) {
      this.buildTableData();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
    this.menuButtons = this.moduleName === 'campaign' ? [...this.menuButtons, 'import'] : this.menuButtons;
  }

  buildTableData() {
    this.elementData.forEach((object: any) => {
      for (const key in object) {
        if (!this.displayedColumns.includes(key)) {
          delete object[key];
        }
      }

      // added fixed status for test
      if (this.getModuleName() === 'users') {
        object.status = 'active';
      }
    });

    this.dataSource = new MatTableDataSource(this.elementData);
    this.table ? this.table.renderRows() : console.log('TABLE NOT INITIALIZED');
  }

  applyFilter(filterValue = '') {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatText(cell: any) {
    if (typeof cell === "boolean") {
      cell = cell ? 'Activo' : 'Inactivo'
    } else if (typeof cell === "object" && cell.name) {
      cell = cell.name;
    }

    return cell;
  }

  getStatusClass(column: string, status: string) {
    if (column === 'status') {
      return status ? status.toLowerCase() : '';
    }
  }

  getModuleName(): string {
    return this.router.url.substring(1, this.router.url.length);
  }

  emitAction(action: string, id?: number) {
    this.action.next({ action, id });
  }
}