import { Injectable } from '@angular/core';
import { Detailsoperation } from '../model/detailsoperation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DetailsoperationService {

  private baseUrl = 'http://localhost:8080/iset/api/detailsOperations';
  detailsoperation : Detailsoperation = new Detailsoperation();
  detailsoperationList : Detailsoperation[];
  constructor(private http: HttpClient) { }
  addDetailsOperation(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
 getAll(id: number): Observable<Object> {
   return this.http.get(`${this.baseUrl}/${id}`);
 }
}
