import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Compras } from './../models/compras';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private url = `${base_url}/compras`;
  private listaCambio = new Subject<Compras[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Compras[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Compras[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(compras: Compras): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, compras, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Compras[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Compras> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Compras>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(compras: Compras): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, compras, {
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
