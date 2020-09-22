import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICampaign } from 'src/app/models/campaign'

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  endpoint = environment.API_URL + '/campaign';

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

  create(campaign: ICampaign) {
    return this.http.post(this.endpoint, campaign);
  }

  update(campaign: ICampaign) {
    return this.http.put(`${this.endpoint}/${campaign._id}`, campaign);
  }
}
