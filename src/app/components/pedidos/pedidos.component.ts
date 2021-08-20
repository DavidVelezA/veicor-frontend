import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { CarritoService } from 'src/app/services/carrito.service';
import { global } from 'src/app/services/global';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers:[CarritoService]
})
export class PedidosComponent implements OnInit {
  public data;
  public detalle: Boolean;
  public url = global.url;
  
displayedColumns: string[] = ['usuario', 'correo', 'telefono', 'estado', 'producto', 'cantidad', 'precio', 'acciones'];
dataSource = new MatTableDataSource();

@ViewChild(MatPaginator) paginator: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
                     
}



  constructor(private _carritoService: CarritoService) { }

  ngOnInit(): void {
    this.obtenerData()
  }

  verDetalle(){
    this.detalle = !this.detalle;
  }
  obtenerData(){
    this._carritoService.carritos().subscribe(
      resp => {

        this.dataSource.data =resp.carrito;
        
        // console.log(this.data);
      }
    )

  }

  pagoHecho(user){
    this._carritoService.cambiarEstado(user).subscribe(
      resp => {
       console.log(resp);
        // console.log(this.data);
        window.location.reload();

      }
    )
  }

  getDataAdmin(user){
    this._carritoService.getCarritoAdmin(user).subscribe(
      resp => {
       console.log(resp);
        // console.log(this.data);
      }
    )
  }

}
