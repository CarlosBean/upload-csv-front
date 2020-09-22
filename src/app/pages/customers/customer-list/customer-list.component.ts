import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-user-list',
  styles: [`
      :host { position: relative }
  `],
  template: `
    <h2 class="module-title">Lista de Clientes</h2>

    <app-table
      [moduleName]="'customer'"
      [elementData]="elementData"
      [displayedColumns]="columns"
      (action)="getTableAction($event)">
    </app-table>

    <swal
      #deleteSwal
      title="Desea eliminar este cliente?"
      text="Esto es un soft delete, el cliente puede ser recuperado"
      icon="question"
      [showCancelButton]="true"
      [focusCancel]="true">
    </swal>
  `,
})
export class CustomerListComponent implements OnInit {
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  elementData = [];
  columns = ['_id', 'names', 'lastnames', 'phones', 'addresses', 'active', 'campaign', 'action'];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAll().subscribe(({ data }) => this.elementData = data);
  }

  getTableAction(event: any) {
    switch (event.action) {
      case 'delete':
        this.deleteSwal.fire().then(res => {
          if (res.isConfirmed) this.delete(event.id);
        });
        break;
    }
  }

  delete(id: any) {
    this.customerService.delete(id).subscribe(res => {
      this.customerService.getAll().subscribe(({ data }) => this.elementData = data);
    });
  }
}