import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import { environment } from 'src/environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyAeI5lO8E55zTj3K07fXIHGxWNT0ktIeWo',
  authDomain: 'veicor-frontend.firebaseapp.com',
  projectId: 'veicor-frontend',
  storageBucket: 'veicor-frontend.appspot.com',
  messagingSenderId: '710410397762',
  appId: '1:710410397762:web:4443d2ae09265bf75f65db',
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageRef = ref(getStorage(firebaseApp));

  constructor() {}

  async subirImagen(nombre: string, imgBase64: any) {
    try {
      let respuesta = await uploadString(
        this.storageRef.child('imgs/' + nombre),
        imgBase64,
        'data_url'
      );
      console.log(respuesta);
      return await getDownloadURL(respuesta.ref);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
