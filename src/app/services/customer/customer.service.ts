import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomer } from 'src/app/models/customer'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  endpoint = environment.API_URL + '/customer';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.endpoint);
  }

  delete(id: any) {
    return this.http.delete(this.endpoint + '/' + id);
  }

  getById(id: any) {
    return this.http.get(this.endpoint + '/' + id);
  }

  create(customer: ICustomer) {
    return this.http.post(this.endpoint, customer);
  }

  update(customer: ICustomer) {
    return this.http.put(`${this.endpoint}/${customer._id}`, customer);
  }
}
