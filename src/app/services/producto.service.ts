import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class ProductoService {
  public user$: Observable<any>;
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  registro(producto): Observable<any> {
    // convertir el objeto del usuario a un json string
    let params = JSON.stringify(producto);
    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // hacer peticion ajax
    return this._http.post(this.url + 'products', params, { headers: headers });
  }

  productos(page = 1): Observable<any> {
    let headers = new HttpHeaders();
    return this._http.get(this.url + 'products/' + page, { headers: headers });
  }

  getProduct(id): Observable<any> {
    return this._http.get(this.url + 'product/' + id);
  }

  delete(id): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this._http.delete(this.url + 'product/' + id, { headers: headers });
  }

  update(producto, id): Observable<any> {
    let params = JSON.stringify(producto);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'product/' + id, params, {
      headers: headers,
    });
  }
}
