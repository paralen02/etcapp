import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Favoritos } from '../models/favoritos';
import { environment } from '../../environments/environment';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private url = `${base_url}/favoritos`;
  private listaCambio = new Subject<Favoritos[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Favoritos[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Favoritos[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  insert(favoritos: Favoritos): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, favoritos, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Favoritos[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Favoritos> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Favoritos>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  update(favoritos: Favoritos): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, favoritos, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(compradorId: number, publicacionId: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/comprador/${compradorId}/publicacion/${publicacionId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
  esFavorito(compradorId: number, publicacionId: number): Observable<boolean> {
    let token = sessionStorage.getItem('token');
    return this.http.get<boolean>(`${this.url}/esFavorito/${compradorId}/${publicacionId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
