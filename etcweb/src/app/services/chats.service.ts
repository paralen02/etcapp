import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Chats } from './../models/chats';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private url = `${base_url}/chats`;
  private listaCambio = new Subject<Chats[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Chats[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Chats[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(chat: Chats): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, chat, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Chats[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Chats> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Chats>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(chat: Chats): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, chat, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  findByCompradorAndVendedor(idComprador: number, idVendedor: number): Observable<Chats> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Chats>(`${this.url}/buscar`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
      params: {
        idComprador: idComprador.toString(),
        idVendedor: idVendedor.toString(),
      },
    });
  }
  findByComprador(idComprador: number): Observable<Chats[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Chats[]>(`${this.url}/comprador/${idComprador}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
