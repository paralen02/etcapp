import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Servicios } from '../models/servicios';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private url = `${base_url}/servicios`; // Asegúrate de que la ruta sea la correcta
  private listaCambio = new Subject<Servicios[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Servicios[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Servicios[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(servicios: Servicios): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, servicios, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Servicios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Servicios> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Servicios>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(servicios: Servicios): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, servicios, {
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

