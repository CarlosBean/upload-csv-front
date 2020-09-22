import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  SAMPLE_SIZE = 10;

  importSelection: any;
  csvFile: any;
  csvArray: any;
  delimiter = '\t';

  radios = [
    { id: 'comma', selected: false, label: 'Comma', value: ',' },
    { id: 'tab', selected: true, label: 'Tab', value: '\t' },
    { id: 'custom', selected: false, label: 'Otro', value: '' }
  ];

  constructor(public fileService: UploadFileService) { }

  ngOnInit(): void {
  }

  save() {
    if (!this.csvFile || !this.importSelection) {
      console.log('MISSING INFO FOR UPLOAD CSV');
    }

    this.fileService.uploadCSV(this.csvFile, this.importSelection, '5f67a189a499630eb4d96f01').subscribe(res => {
      console.log(res);
    });

    console.log(JSON.stringify(this.importSelection));
  }

  parseDataToRows(data: any, delimiter: string) {
    let resultArray = [];
    let sample = data.split("\n").slice(0, this.SAMPLE_SIZE);

    sample.forEach((row: string) => {
      let rowArray = [];
      row.split(delimiter).forEach((cell: string) => rowArray.push(cell));
      resultArray.push(rowArray);
    });

    return resultArray;
  }

  parseDataToColumns(data: any, delimiter: string) {
    let resultArray = [];
    let sample = data.split("\n").slice(0, this.SAMPLE_SIZE);
    let columnsLength = sample[0].split(delimiter).length;

    for (let column = 0; column < columnsLength; column++) {
      let columnArray = [];

      for (let row = 0; row < sample.length; row++) {
        let cell = sample[row].split(delimiter)[column];
        cell = cell.split('"').join('');
        columnArray.push(cell);
      }

      resultArray.push(columnArray);
    }
    return resultArray;
  }

  uploadFile(event: any) {
    this.csvFile = event.target.files[0];
    let fileReader = new FileReader();

    fileReader.readAsText(this.csvFile);

    fileReader.onload = (e) => {
      let data = e.target.result;
      this.csvArray = this.parseDataToColumns(data, this.delimiter);
    }

    /* fileReader.onload = (e) => {

      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();

      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);

      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, { type: "binary" });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];

      let arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(arraylist);
    } */
  }
}
