import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CsvTableComponent } from './csv-table/csv-table.component';
import { InputRadioComponent } from './input-radio/input-radio.component';
import { TableComponent } from './table/table.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UploadBoxComponent } from './upload-box/upload-box.component';

@NgModule({
    declarations: [
        CsvTableComponent,
        InputRadioComponent,
        TableComponent,
        UploadBoxComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SweetAlert2Module
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CsvTableComponent,
        InputRadioComponent,
        TableComponent,
        SweetAlert2Module,
        UploadBoxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }