import { Productos } from './../models/productos';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MesesUsoProductosDTO } from '../models/mesesusoproductosDTO';
import { TopDistritosDTO } from '../models/topdistritosDTO';
import { ProductosPriceDTO } from '../models/productospriceDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private url = `${base_url}/productos`;
  private listaCambio = new Subject<Productos[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.url);
  }

  insert(productos: Productos) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, productos, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Productos[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Productos>(`${this.url}/${id}`);
  }

  update(productos: Productos) {
    let token = sessionStorage.getItem('token');
    return this.http.put(`${this.url}/${productos.idProductos}`, productos, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getMesesUso(): Observable<MesesUsoProductosDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<MesesUsoProductosDTO[]>(`${this.url}/meses_uso`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getTopDistritos(): Observable<TopDistritosDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<TopDistritosDTO[]>(`${this.url}/top-distritos`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getPricesByCategoryAndMaterial(category: string, material: string): Observable<ProductosPriceDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ProductosPriceDTO[]>(`${this.url}/prices`, {
      params: {
        category: category,
        material: material,
      },
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
