import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit {
  rawFile: any;

  @Input() delimiters: any[];
  @Output() file: EventEmitter<any> = new EventEmitter();

  @ViewChild('uploader') private uploader: ElementRef;
  constructor() { }

  ngOnInit(): void { }

  uploadFile(event: any) {
    let data = event.target.files[0];
    this.rawFile = data;

    let fileReader = new FileReader();

    fileReader.readAsText(data);

    fileReader.onload = (e) => {
      this.uploader.nativeElement.value = '';
      this.file.emit({ processed: e.target.result, raw: data });
    }
  }

}
