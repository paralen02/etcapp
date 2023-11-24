import { Caracteristicas } from './../models/caracteristicas';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CaracteristicasService {
  private url = `${base_url}/caracteristicas`;
  private listaCambio = new Subject<Caracteristicas[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Caracteristicas[]> {
    return this.http.get<Caracteristicas[]>(this.url)
  }

  insert(caracteristicas: Caracteristicas): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, caracteristicas, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Caracteristicas[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Caracteristicas> {
    return this.http.get<Caracteristicas>(`${this.url}/${id}`)
  }

  update(caracteristicas: Caracteristicas): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, caracteristicas, {
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
