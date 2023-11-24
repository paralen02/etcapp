import { Vendedores } from './../models/vendedores';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class VendedoresService {
  private url = `${base_url}/vendedores`;
  private listaCambio = new Subject<Vendedores[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Vendedores[]> {
    return this.http.get<Vendedores[]>(this.url)
  }

  insert(vendedores: Vendedores): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, vendedores, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Vendedores[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Vendedores> {
    return this.http.get<Vendedores>(`${this.url}/${id}`)
  }

  update(vendedores: Vendedores): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, vendedores, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
