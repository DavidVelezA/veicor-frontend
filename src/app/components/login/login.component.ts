import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]

})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public identity;
  public token;
  public status: string;


  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {

    this.usuario = new Usuario(null, null, null, null, null);
  }

  ngOnInit(): void {
  }


  onSubmit(form){
    if(this.usuario.email && this.usuario.password){


    this._usuarioService.login(this.usuario).subscribe(

      resp => {
        if (resp && resp.status && resp.status == 'success') {


          this._usuarioService.login(this.usuario, true).subscribe(
            response => {

               this.identity = resp.user;
               this.token = response.token;
               localStorage.setItem('token', this.token);
               localStorage.setItem('identity', JSON.stringify(this.identity));
               this._router.navigate(['inicio']);

            },
            error => {
              console.log('token', error);

            })
          }else{
            console.log(resp);
            this.error(resp.message)

        }

      },
      err => {
        this.error(err.error.message)
      }




    );
  } else {

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

   error(mensaje){
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: mensaje,
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
