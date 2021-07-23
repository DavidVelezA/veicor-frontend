import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioService]
})
export class RegisterComponent implements OnInit {
  public usuario: Usuario;

  constructor(private _usuarioService: UsuarioService, private _router: Router) {

    this.usuario = new Usuario(null,null,null,null,null);
   }

  ngOnInit(): void {
  }

  onSubmit(form){

    if (this.usuario.name != null &&
        this.usuario.email != null &&
        this.usuario.password != null &&
        this.usuario.cellphone != null) {



    this._usuarioService.registro(this.usuario).subscribe(
     res => {
       if (res && res.status && res.status == 'success') {

         this.success();
         this._router.navigate(['login']);


       }else {
         this.error();
       }

     },
     err => {
        this.error()
     }
    )
    }else {
      this.validacion();


    }


  }

  success(){
    Swal.fire({
      icon: 'success',
      title: 'Registro completo',
      showConfirmButton: false,
      timer: 900
    });
   }

   error(){
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: 'Port favor intente de nuevo',
      showConfirmButton: true
    });
   }

   validacion(){
    Swal.fire({
      icon: 'info',
      title: 'Validación incorrecta',
      text: 'Ingrese todos los datos',
      showConfirmButton: true
    });
   }

}
