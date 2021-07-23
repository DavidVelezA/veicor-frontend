import  Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [ProductoService]

})
export class TiendaComponent implements OnInit {

  public productos: Producto;

  constructor(
    private _productoService: ProductoService,
    private _activateRoute: ActivatedRoute,
    private _router: Router


  ) { }

  ngOnInit(): void {
    this.getProductos();

  }



  getProductos() {
    this._activateRoute.params.subscribe(params => {
      let page = params['page'];
      this._productoService.productos(page).subscribe(
        response => {

          if (response && response.status && response.status =='success') {
            this.productos = response.products;
          }
          // console.log(response);
          // this.productos = response.candidates;


        },
        error => {
          console.log(error);
          // this.status = 'error';

        }
      );
    });
  }


  deleteProducto(id) {
      this._productoService.delete(id).subscribe(
        response => {

        },
        error => {
          console.log(error);
          // this.status = 'error';
          this.error();

        }
      );
  }


  eliminar(id){

    Swal.fire({
      title: 'Seguro desea elimiar',
      text: "Este producto se eliminará",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteProducto(id);
        window.location.reload();


      }
    })
  }


  success(){
    Swal.fire({
      icon: 'success',
      title: 'Producto eliminado',
      showConfirmButton: false,
      timer: 900
    });
   }

   error(){
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: 'Por favor intente de nuevo',
      showConfirmButton: true
    });
   }




}
