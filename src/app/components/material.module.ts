import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    exports: [
        // CDK
        CdkTableModule,
        // Material
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule
    ]
})
export class MaterialModule { }