import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../Models/categoria';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/Models/producto';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAeI5lO8E55zTj3K07fXIHGxWNT0ktIeWo',
  authDomain: 'veicor-frontend.firebaseapp.com',
  projectId: 'veicor-frontend',
  storageBucket: 'veicor-frontend.appspot.com',
  messagingSenderId: '710410397762',
  appId: '1:710410397762:web:4443d2ae09265bf75f65db',
};
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductoService, CategoriaService],
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
  public imagenes: any[] = [];

  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  // public afuConfig = {
  //   multiple: false,
  //   formatsAllowed: ".jpg, .png, .gif, .jpeg",
  //   maxSize: "50",
  //   uploadAPI: {
  //     url: this.url + 'upload-img',
  //     // headers: {
  //     // "Authorization": this._userService.getToken()
  //     // }
  //   },
  //   theme: "attachPin",
  //   hideProgressBar: false,
  //   hideResetBtn: true,
  //   hideSelectBtn: false,

  //   replaceTexts: {
  //     selectFileBtn: 'Selecciona tu imagen',
  //     resetBtn: 'Reset',
  //     uploadBtn: 'Upload',
  //     dragNDropBox: 'Drag N Drop',
  //     attachPinBtn: 'Selecciona imagen del producto',
  //     afterUploadMsg_success: 'Carga exitosa',
  //     afterUploadMsg_error: 'Carga fallida'

  //   }
  // };

  constructor(
    private _productoService: ProductoService,
    private _activateRoute: ActivatedRoute,
    private _categoriaService: CategoriaService,
    private _usuarioService: UsuarioService // private storageService: StorageService
  ) {
    this.producto = new Producto(null, null, null, null, null, null);
    this.categoria = new Categoria(null);
    this.identity = this._usuarioService.getIdentity();
  }

  ngOnInit(): void {
    this._activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.action = false;
        this.id = id;
      }
    });

    this.getProducto();
    this.getCategorias();
  }

  onSubmit(form) {
    if (this.action) {
      this._productoService.registro(this.producto).subscribe(
        (resp) => {
          if (this.producto.image) {
            console.log(resp);
            this.success();
            form.reset();
          } else {
            this.validacionImagen();
          }
        },
        (err) => {
          this.error();
          console.log(err);
        }
      );
    } else {
      this._productoService.update(this.producto, this.id).subscribe(
        (resp) => {
          this.success();
        },
        (err) => {
          this.error();
          console.log(err);
        }
      );
    }
  }

  async subirImagen(event) {
    firebase.initializeApp(firebaseConfig);

    const file = event.target.files[0];

    const nombreArchivo =
      Date.now().toString() + Math.floor(Math.random() * 1000000).toString();
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child('img/' + nombreArchivo);

    const task = fileRef.put(file);

    task
      .then((snapshot) => {
        // Aquí puedes obtener la URL del archivo subido con snapshot.ref.getDownloadURL()
        snapshot.ref.getDownloadURL().then((url) => {
          this.producto.image = url;
        });
      })
      .catch((error) => {
        console.error('Error al subir el archivo', error);
      });
  }

  getProducto() {
    this._activateRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this._productoService.getProduct(id).subscribe(
          (response) => {
            this.producto = response.product;
          },
          (error) => {
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
      (resp) => {
        this.success(); // console.log(this.categoria);
        form.reset();
        this.getCategorias();
      },
      (err) => {
        this.error();
      }
    );
  }

  getCategorias() {
    this._categoriaService.categorias().subscribe(
      (resp) => {
        if (resp && resp.status && resp.status == 'success') {
          this.categorias = resp.categoria;
        }
      },
      (err) => {}
    );
  }

  success() {
    Swal.fire({
      icon: 'success',
      title: 'Registro completo',
      showConfirmButton: false,
      timer: 900,
    });
  }

  error() {
    Swal.fire({
      icon: 'error',
      title: 'A ocurrido algo inesperado',
      text: 'Por favor intente de nuevo',
      showConfirmButton: true,
    });
  }

  validacionImagen() {
    Swal.fire({
      icon: 'error',
      title: 'Validacion',
      text: 'Agrege foto del producto',
      showConfirmButton: true,
    });
  }

  imageUpload(datos) {
    // let imagedata = JSON.parse(datos.response);
    this.producto.image = datos.body.file;
  }
}
