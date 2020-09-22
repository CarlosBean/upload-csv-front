import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { SharedModule } from 'src/app/components/shared.module';
import { CustomersRoutingModule } from './customers.routes';

@NgModule({
    declarations: [
        CustomerListComponent,
    ],
    imports: [
        CustomersRoutingModule,
        SharedModule
    ]
})
export class CustomersModule { }