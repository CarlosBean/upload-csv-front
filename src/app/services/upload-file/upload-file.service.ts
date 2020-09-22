import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  API_URL = environment.API_URL;
  constructor(public http: HttpClient) { }

  uploadCSV(file: File, config: { columns: string[], delimiter: string }, campaignId: string): Observable<any> {
    const url = `${this.API_URL}/upload/csv/customers/${campaignId}`;
    const formData = new FormData();

    console.log(file.name);
    formData.append('config', JSON.stringify(config));
    formData.append('file', file, file.name);

    return this.http.put(url, formData, { reportProgress: true })
      .pipe(map((res: any) => res));
  }
}
