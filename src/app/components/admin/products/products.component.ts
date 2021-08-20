import { UsuarioService } from 'src/app/services/usuario.service';
import Swal  from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../Models/categoria';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductoService, CategoriaService]
})
export class ProductsComponent implements OnInit {

  public producto: Producto;
  public productos: Producto;

  public categoria: Categoria;
  public categorias: Categoria;

  public action = true;
  public id;
  public url = global.url;

  public identity;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: this.url + 'upload-img',
      // headers: {
      // "Authorization": this._userService.getToken()
      // }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,

    replaceTexts: {
      selectFileBtn: 'Selecciona tu imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Selecciona imagen del producto',
      afterUploadMsg_success: 'Carga exitosa',
      afterUploadMsg_error: 'Carga fallida'

    }
  };

  constructor(
    private _productoService: ProductoService,
    private _activateRoute: ActivatedRoute,
    private _categoriaService: CategoriaService,
    private _usuarioService: UsuarioService

  ) {

    this.producto = new Producto(null, null, null, null, null, null);
    this.categoria = new Categoria(null);
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {

    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.action = false;
        this.id = id
      }
    });

    this.getProducto()
    this.getCategorias()
  }

  onSubmit(form) {

    if (this.action) {

    this._productoService.registro(this.producto).subscribe(
      resp => {
        if(this.producto.image) {
        this.success();
        form.reset();
        } else {
          this.validacionImagen()

        }

      },
      err => {
        this.error();
        console.log(err);

      })
    } else {

    this._productoService.update(this.producto, this.id).subscribe(
      resp => {
        this.success()


      },
      err => {
        this.error();
        console.log(err);

      })

    }

  }

  getProducto() {
    this._activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {


        this._productoService.getProduct(id).subscribe(
          response => {
            this.producto = response.product;

          },
          error => {
            console.log(error);
            // this.status = 'error';

          }
        );
      } else {
        console.log('');
      }
    });

  }


  onSubmit2(form) {
    this._categoriaService.registro(this.categoria).subscribe(
      resp => {
        this.success();        // console.log(this.categoria);
        form.reset();
this.getCategorias();

      },
      err => {
        this.error();

      }
    )

  }

  getCategorias(){
    this._categoriaService.categorias().subscribe(
      resp => {
        if (resp && resp.status && resp.status == 'success') {
          this.categorias = resp.categoria
        }
      },
      err => {

      }
    )
  }


  success() {
    Swal.fire({
      icon: 'success',
      title: 'Registro completo',
      showConfirmButton: false,
      timer: 900
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: 'Por favor intente de nuevo',
      showConfirmButton: true
    });
  }

  validacionImagen() {
    Swal.fire({
      icon: 'error',
      title: 'Validacion',
      text: 'Agrege foto del producto',
      showConfirmButton: true
    });
  }



  imageUpload(datos) {
    // let imagedata = JSON.parse(datos.response);
    this.producto.image = datos.body.file;

  }


}
