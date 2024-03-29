import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Publicaciones } from './../models/publicaciones';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private url = `${base_url}/publicaciones`;
  private listaCambio = new Subject<Publicaciones[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Publicaciones[]> {
    return this.http.get<Publicaciones[]>(this.url)
  }

  insert(publicaciones: Publicaciones): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, publicaciones, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Publicaciones[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number): Observable<Publicaciones> {
    return this.http.get<Publicaciones>(`${this.url}/${id}`)
  }

  getMultiple(ids: number[]): Observable<Publicaciones[]> {
    // Hacer una solicitud para cada ID
    const requests = ids.map(id => this.http.get<Publicaciones>(`${this.url}/${id}`));
    // Combinar las respuestas en un solo Observable
    return forkJoin(requests);
  }

  update(publicaciones: Publicaciones): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.put(this.url, publicaciones, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }

  delete(id: number): Observable<any> {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
  
  getPublicacionesForVendedor(idVendedor: number): Observable<Publicaciones[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<Publicaciones[]>(`${this.url}/vendedor/${idVendedor}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json'),
    });
  }
}
