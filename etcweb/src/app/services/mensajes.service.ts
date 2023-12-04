import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mensajes } from './../models/mensajes';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  private url = `${base_url}/mensajes`;
  private listaCambio = new Subject<Mensajes[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Mensajes[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Mensajes[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(mensajes: Mensajes): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, mensajes, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Mensajes[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Mensajes> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Mensajes>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(mensajes: Mensajes): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, mensajes, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
  findByChat(idChat: number): Observable<Mensajes[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Mensajes[]>(`${this.url}/chat/${idChat}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
