import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { global } from './global';
import { delay } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class UsuarioService {
    public user$: Observable<any>;

    public url: string;
    public identidad;
    public token;

    constructor(
        private _http: HttpClient) {
        this.url = global.url;



    }


    registro(usuario): Observable<any> {

        // convertir el objeto del usuario a un json string
        let params = JSON.stringify(usuario);

        // definir las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        // hacer peticion ajax
        return this._http.post(this.url + 'register', params, { headers: headers });

    }

    login(usuario, gettoken = null): Observable<any> {
        // comprobar si llega el gettoken
        if (gettoken != null) {
            usuario.gettoken = gettoken;
        }
        let params = JSON.stringify(usuario);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, { headers: headers });

    }
    // actualizar(usuario): Observable<any> {

    //     let params = JSON.stringify(usuario);
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //         .set('Authorization', this.getToken());
    //     return this._http.put(this.url + 'usuario/actualizar', params, { headers: headers });

    // }


    // usuarioById(id): Observable<any> {
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     return this._http.get(this.url + 'usuario/' + id, { headers: headers });

    // }
    // usuarios(page = 1): Observable<any> {

    //     let headers = new HttpHeaders().set('Authorization', this.getToken());
    //     return this._http.get(this.url + 'usuarios-root/' + page, { headers: headers }).pipe(delay(300));

    // }

    // editarRole(usuario, id): Observable<any> {

    //     let params = JSON.stringify(usuario);
    //     let headers = new HttpHeaders().set('Content-Type', 'application/json')
    //         .set('Authorization', this.getToken());
    //     return this._http.put(this.url + 'usuario-role/actualizar/' + id, params, { headers: headers });

    // }

    // eliminar(id): Observable<any> {

    //     let headers = new HttpHeaders().set('Authorization', this.getToken());
    //     return this._http.delete(this.url + 'usuario-root/' + id, { headers: headers });

    // }





    getIdentity() {
        let identidad = JSON.parse(localStorage.getItem('identity'));

        if (identidad && identidad != null && identidad != undefined && identidad != "undefined") {
            this.identidad = identidad;

        } else {
            this.identidad = null;
        }
        return this.identidad;

    }
    getToken() {
        let token = localStorage.getItem('token');

        if (token && token != null && token != undefined && token != "undefined") {
            this.token = token;

        } else {
            this.token = null;
        }
        return this.token;


    }


    }
