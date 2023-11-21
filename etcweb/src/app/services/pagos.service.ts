import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Pagos } from './../models/pagos';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private url = `${base_url}/pagos`;
  private listaCambio = new Subject<Pagos[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Pagos[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Pagos[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(pago: Pagos): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, pago, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Pagos[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Pagos> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Pagos>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(pago: Pagos): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, pago, {
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
