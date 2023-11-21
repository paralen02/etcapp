import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Asesorias } from './../models/asesorias';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AsesoriasService {
  private url = `${base_url}/asesorias`;
  private listaCambio = new Subject<Asesorias[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Asesorias[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Asesorias[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(asesoria: Asesorias): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, asesoria, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Asesorias[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Asesorias> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Asesorias>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(asesoria: Asesorias): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, asesoria, {
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
