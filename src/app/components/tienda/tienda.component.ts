import  Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Component, OnInit } from '@angular/core';
import { global } from 'src/app/services/global';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  providers: [ProductoService, CarritoService]

})
export class TiendaComponent implements OnInit {

  public productos: Producto;
  public url = global.url;
  public cantidad = "1";
public identity;
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  public token;
  constructor(
    private _userService:UsuarioService,
    private _carritoService: CarritoService,
    private _productoService: ProductoService,
    private _activateRoute: ActivatedRoute,
    private _router: Router


  ) { 

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.ObtenerPaginacion();

  }

  
  ObtenerPaginacion(){

    this._activateRoute.params.subscribe(params => {
      let page = +params['page'];
      if (!page || page == null) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;

      }
      this.getProductos(page);

    });
  }

  getProductos(page = 1){
    this._productoService.productos(page).subscribe(
      response => {
        if (response && response.status && response.status =='success') {
            this.productos = response.products;
        

          // navegacion de paginacion
          this.totalPages = response.totalPages;

          let number_pages = [];
          for (let i = 1; i <= this.totalPages; i++) {
                  number_pages.push(i);
          }
          this.number_pages = number_pages;

          if (page >= 2) {
            this.prev_page = page - 1;
          }else{
            this.prev_page =  1;

          }
          if (page < this.totalPages) {
            this.next_page = page + 1;
          } else {
            this.next_page = this.totalPages;
          }
        } else {
          this._router.navigate(['/inicio']);
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerCantidad(e){
    this.cantidad = e.target.value;

  }

  aggCarrito(id){

     const params = {'product': id, 'cantidad': this.cantidad};  
    this._carritoService.aggCarrito(this.token, params).subscribe(
      resp => {
        // console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          showConfirmButton: false,
          timer: 900
        });
      }, 
      err => {
        console.log(err);
      }
    )
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
