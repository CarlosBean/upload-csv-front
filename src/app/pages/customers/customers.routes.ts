import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';

export const routes: Routes = [
    {
        path: '',
        component: CustomerListComponent,
        data: { title: 'Clientes' }
    },
    {
        path: 'new',
        component: CustomerListComponent,
        data: { title: 'Nuevo Cliente' }
    },
    {
        path: 'update/:id',
        component: CustomerListComponent,
        data: { title: 'Actualizar Cliente' }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }