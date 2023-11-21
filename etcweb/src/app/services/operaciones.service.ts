import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Operaciones } from './../models/operaciones';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
  private url = `${base_url}/operaciones`;
  private listaCambio = new Subject<Operaciones[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Operaciones[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Operaciones[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(operacion: Operaciones): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, operacion, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Operaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Operaciones> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Operaciones>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(operacion: Operaciones): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, operacion, {
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
