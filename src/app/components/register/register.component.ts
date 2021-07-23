import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public usuario: Usuario;

  constructor() {

    this.usuario = new Usuario(null,null,null,null,null);
   }

  ngOnInit(): void {
  }

  onSubmit(form){

    console.log(this.usuario);

  }

}
