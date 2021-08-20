import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { global } from 'src/app/services/global';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [UsuarioService, CarritoService]
})
export class PagoComponent implements OnInit {
  public token;
  public carrito;
  public existe = false;
  public url;
  public total_a_pagar;
  public valor_unidades;
  constructor(private _carritoService: CarritoService, private _userService: UsuarioService) {
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getCarrito()
  }


  getCarrito() {
    this._carritoService.carritoByUser(this.token).subscribe(
      resp => {
        if (resp && resp.carrito.length != 0) {

          this.carrito = resp.carrito;
          console.log(this.carrito);
          // sacar total a pagar
          let total_a_pagar=[]
          this.carrito.forEach(product => {
          
          let result = product.cantidad * product.products.price;

          total_a_pagar.push(+result);
          this.existe = true

            
          });
          this.sumar_array(total_a_pagar);     
        } else {
          this.carrito = []
        }   

     
      }
    )
  }

  delete(id){
    this._carritoService.delete(this.token,id).subscribe(
      resp => {
        this.getCarrito()
        Swal.fire({
          icon: 'success',
          title: 'Item Eliminado',
          showConfirmButton: false,
          timer: 900
        });

      }

    )
  }

  sumar_array(array){

    var suma = 0;
        
    array.forEach (function(numero){
        suma += numero;
    });

    this.total_a_pagar = suma;
    

  }

   subirComprobante() {
    Swal.fire({
      title: 'Datos para el deposito',
      // text: `Envie el comprobante de pago al numero de whatsapp 0989167751`,
      html: `
      <p>Envie el comprobante de pago al numero de whatsapp 0989167751</p>
          <h4>Cuenta de ahorros pinchincha</h4> 
            <p><strong>Numero de cuenta:</strong> 224526515</p>
            <p><strong>Nombre:</strong> Rodrigo Zambrano</p>
            <p><strong>Cédula:</strong> 1351601144</p>
            <p><strong>Correo:</strong> dasda@dasd.com</p>
            `,

      confirmButtonText: 'Aceptar',

    
    })

  
  }

}
