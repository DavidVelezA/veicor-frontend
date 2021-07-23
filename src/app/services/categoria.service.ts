import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable()
export class CategoriaService {
  public url: string;


  constructor(
    private _http: HttpClient) {
    this.url = global.url;
  }

  registro(categoria): Observable<any> {

    // convertir el objeto del usuario a un json string
    let params = JSON.stringify(categoria);
    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // hacer peticion ajax
    return this._http.post(this.url + 'categoria', params, { headers: headers });

  }

  categorias(): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'categorias/', { headers: headers });

  }

  getProduct(id): Observable<any> {
    return this._http.get(this.url + 'product/' + id);

  }

  delete(id): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.delete(this.url + 'product/' + id, { headers: headers });


  }

}
