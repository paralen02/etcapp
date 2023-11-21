import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Envios } from './../models/envios';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EnviosService {
  private url = `${base_url}/envios`;
  private listaCambio = new Subject<Envios[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Envios[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Envios[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(envio: Envios): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, envio, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Envios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Envios> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Envios>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(envio: Envios): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, envio, {
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
