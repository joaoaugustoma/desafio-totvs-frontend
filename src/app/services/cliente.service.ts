import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cliente} from "../models/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) { }

  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  salvar(formData:Object): Observable<Cliente>{
    return this.http.post(this.url, formData);
  }
}
