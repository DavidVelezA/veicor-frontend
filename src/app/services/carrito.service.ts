import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable()
export class CarritoService {
  public url: string;


  constructor(
    private _http: HttpClient) {
    this.url = global.url;
  }

  aggCarrito(token,product): Observable<any> {

    // convertir el objeto del usuario a un json string
    let params = JSON.stringify(product);
    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    // hacer peticion ajax
    return this._http.post(this.url + 'carrito/', params, { headers: headers });

  }

  carritoByUser(token): Observable<any> {

    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.get(this.url + 'carrito/', { headers: headers });

  }

  delete(token, id): Observable<any> {

    let headers = new HttpHeaders().set('Authorization', token);
    return this._http.delete(this.url + 'carrito/' + id, { headers: headers });


  }

  getCarritoAdmin(user): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'carrito-admin/' + user, { headers: headers });


  }

  
  cambiarEstado(user): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'cambiar-admin/' + user, { headers: headers });


  }

  
  carritos(): Observable<any> {

    let headers = new HttpHeaders();
    return this._http.get(this.url + 'carritos/', { headers: headers });

  }
 
}
