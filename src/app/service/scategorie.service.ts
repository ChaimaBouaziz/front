import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scategorie} from '../model/scategorie'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ScategorieService {
  private baseUrl = 'http://localhost:8080/iset/api/scategories';
  private baseUrl1 = 'http://localhost:8080/iset/api/scategories/5';
  choixmenu : string  = 'A';
  listData : Scategorie[];
  
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }


  
  listScateg(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/${id}`);
  }
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
}
