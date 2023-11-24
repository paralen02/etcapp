import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Categorias } from './../models/categorias';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private url = `${base_url}/categorias`;
  private listaCambio = new Subject<Categorias[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(this.url)
  }

  insert(categoria: Categorias): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, categoria, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Categorias[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Categorias> {
    return this.http.get<Categorias>(`${this.url}/${id}`)
  }

  update(categoria: Categorias): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, categoria, {
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
