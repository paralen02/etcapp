import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Resenias } from './../models/resenias';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReseniasService {
  private url = `${base_url}/resenias`;
  private listaCambio = new Subject<Resenias[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Resenias[]> {
    return this.http.get<Resenias[]>(this.url)
  }

  insert(resenia: Resenias): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, resenia, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Resenias[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Resenias> {
    return this.http.get<Resenias>(`${this.url}/${id}`)
  }

  update(resenia: Resenias): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, resenia, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
  getReseniaByCompra(idCompra: number): Observable<Resenias> {
    return this.http.get<Resenias>(`${this.url}/compra/${idCompra}`)
  }
  listByVendedor(idVendedor: number): Observable<Resenias[]> {
    return this.http.get<Resenias[]>(`${this.url}/vendedor/${idVendedor}`)
  }
}
