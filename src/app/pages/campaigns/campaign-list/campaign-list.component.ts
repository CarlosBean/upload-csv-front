import { Component, OnInit, ViewChild } from '@angular/core';
import { BeforeOpenEvent, SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { UploadFileService } from 'src/app/services/upload-file/upload-file.service';

@Component({
  selector: 'app-user-list',
  styles: [`
      :host { position: relative }
  `],
  template: `
    <h2 class="module-title">Lista de Campañas</h2>

    <app-table
      [moduleName]="'campaign'"
      [elementData]="elementData"
      [displayedColumns]="columns"
      (action)="getTableAction($event)">
    </app-table>

    <swal
      #deleteSwal
      title="Desea eliminar esta campaña?"
      text="Esto es un soft delete, la campaña puede ser recuperado"
      icon="question"
      [showCancelButton]="true"
      [focusCancel]="true">
    </swal>

    <swal #stepOne>
      <ng-container *swalPortal>
        <h4>Importación de archivos</h4>
        <p class="step-text text-secondary">Escoge el delimitador para el documento CSV</p>
        <app-input-radio [options]="options" (action)="selectedDelimiter = $event.value"></app-input-radio>
      </ng-container>
      
      <ng-container *swalPortal="swalTargets.actions">
        <button class="button primary" (click)="stepOne.dismiss(sweetEventConfirmed)">Siguiente</button>
      </ng-container>
    </swal>

    <swal #stepTwo>
      <app-upload-box *swalPortal [delimiters]="options" (file)="file = $event"></app-upload-box>
      <ng-container *swalPortal="swalTargets.actions">
        <button class="button primary" (click)="stepTwo.dismiss(sweetEventConfirmed)" [disabled]="!file">Siguiente</button>
      </ng-container>
    </swal>

    <swal #stepThree (beforeOpen)="onBeforeOpen($event)">
      <ng-container *swalPortal>
        <h4>Seleccione las columnas que desea importar</h4>
        <app-csv-table [data]="csvData" (action)="selectedColumns = $event"></app-csv-table>
      </ng-container>
      <ng-container *swalPortal="swalTargets.actions">
        <button class="button primary" (click)="stepThree.dismiss(sweetEventConfirmed)" [disabled]="!selectedColumns || verifyColumns()">Iniciar Importación</button>
      </ng-container>
    </swal>

    <swal
      #successSwal
      title="Exito"
      text="La importación se realizo con exito">
    </swal>

    <swal
      #errorSwal
      title="Error"
      text="Ha ocurrido un error en la importación">
    </swal>
  `,
})
export class CampaignListComponent implements OnInit {

  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @ViewChild('stepOne') private stepOne: SwalComponent;
  @ViewChild('stepTwo') private stepTwo: SwalComponent;
  @ViewChild('stepThree') private stepThree: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;
  @ViewChild('errorSwal') private errorSwal: SwalComponent;

  SAMPLE_SIZE = 10;
  elementData = [];
  columns = ['_id', 'name', 'description', 'active', 'action'];

  options = [
    { id: 'comma', selected: true, label: 'Comma', value: ',' },
    { id: 'tab', selected: false, label: 'Tab', value: '\t' },
    { id: 'porcentaje', selected: false, label: '%', value: '%' },
    { id: 'punto', selected: false, label: 'Punto', value: '.' },
    { id: 'custom', selected: false, label: 'Otro', value: '' }
  ];

  file = { processed: null, raw: null };

  csvData: any;
  selectedColumns: string[];
  selectedDelimiter = ',';

  sweetEventConfirmed = { isConfirmed: true, isDismissed: false, isDenied: false };

  constructor(
    private userService: CampaignService,
    public readonly swalTargets: SwalPortalTargets,
    public fileService: UploadFileService
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(({ data }) => this.elementData = data);
  }

  getTableAction(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteSwal.fire().then(res => {
          if (res.isConfirmed) this.delete(event.id);
        });
        break;
      case 'import':
        this.stepOne.fire().then(res => {
          if (!res.isConfirmed) { return; }

          this.stepTwo.fire().then(res => {
            if (!res.isConfirmed) { this.file = null; return; }
            this.csvData = this.parseDataToColumns(this.file.processed, this.selectedDelimiter);

            this.stepThree.fire().then(res => {
              if (!res.isConfirmed) { this.file = null; return; }
              let config = { columns: this.selectedColumns, delimiter: this.selectedDelimiter };

              this.fileService.uploadCSV(this.file.raw, config, event.id).subscribe(res => {
                this.successSwal.fire();
              }, err => this.errorSwal.fire());
            })
          })
        });
    }
  }

  delete(id: any) {
    this.userService.delete(id).subscribe(res => {
      this.userService.getAll().subscribe(({ data }) => this.elementData = data);
    });
  }

  parseDataToColumns(data: any, delimiter: string) {
    let resultArray = [];
    let sample = data.split("\n").slice(0, this.SAMPLE_SIZE);
    let columnsLength = sample[0].split(delimiter).length;

    for (let column = 0; column < columnsLength; column++) {
      let columnArray = [];

      for (let row = 0; row < sample.length; row++) {
        let cell = sample[row].split(delimiter)[column];
        columnArray.push(cell);
      }

      resultArray.push(columnArray);
    }
    return resultArray;
  }

  onBeforeOpen(event: BeforeOpenEvent) {
    event.modalElement.style.width = '90%';
  }

  verifyColumns(): boolean {
    return this.selectedColumns.every(column => column.split('-')[0] === 'ignore');
  }
}