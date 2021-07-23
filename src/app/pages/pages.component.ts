import { UsuarioService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [UsuarioService]
})
export class PagesComponent implements OnInit {
  public identity;

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
    ) {

      this.identity = this._usuarioService.getIdentity();
    }

  ngOnInit(): void {
  }


  verCarrito() {


  }

  cerrarSesion(){

    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    this._router.navigate(['login']);


  }

}
