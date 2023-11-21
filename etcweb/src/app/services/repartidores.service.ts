import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Repartidores } from './../models/repartidores';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RepartidoresService {
  private url = `${base_url}/repartidores`;
  private listaCambio = new Subject<Repartidores[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Repartidores[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Repartidores[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(repartidores: Repartidores): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, repartidores, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Repartidores[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Repartidores> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Repartidores>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(repartidores: Repartidores): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, repartidores, {
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
