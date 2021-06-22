import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  

  async subirComprobante  () {
    const { value: file } = await Swal.fire({
      title: 'Sube el comprobante de pago',
      // text: `Numero de cuenta: 224526515 - Nombre: Rodrigo Zambrano - Cedula: 1351601144 - Correo: dasda@dasd.com`,
      html: `<h4>Cuenta de ahorros pinchincha</h4> 
            <p><strong>Numero de cuenta:</strong> 224526515</p>
            <p><strong>Nombre:</strong> Rodrigo Zambrano</p>
            <p><strong>Cédula:</strong> 1351601144</p>
            <p><strong>Correo:</strong> dasda@dasd.com</p>
            `,
      
      confirmButtonText: 'Subir',
            
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    
    if (file) {
      // const reader = new FileReader()
    //  reader.onload =  (e) => {
        console.log(file);
      //   Swal.fire({
      //     title: 'Your uploaded picture',
      //     // imageUrl: e.target.result,
      //     imageAlt: 'The uploaded picture'
      //   })
      // }
      // reader.readAsDataURL(file)

  }
}

}
