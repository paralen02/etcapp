import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Compradores } from './../models/compradores';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CompradoresService {
  private url = `${base_url}/compradores`;
  private listaCambio = new Subject<Compradores[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Compradores[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Compradores[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(compradores: Compradores): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, compradores, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Compradores[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Compradores> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Compradores>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(compradores: Compradores): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, compradores, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  findByUsername(username: string): Observable<Compradores> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Compradores>(`${this.url}/buscar/${username}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
