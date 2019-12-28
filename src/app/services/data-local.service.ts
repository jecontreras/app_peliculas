import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) { 
    this.cargarFavoritos();
  }
  async presentToast(text:string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
  async guardarPelicula(pelicula: PeliculaDetalle) {

    let filtro = this.peliculas.find(peli => peli.id === pelicula.id);
    console.log("***", filtro)
    if (filtro) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      this.presentToast('Eliminado de Favorito');
    } else {
      this.peliculas.push(pelicula);
      this.presentToast('Agregado de Favorito');
    }
    this.storage.set('peliculas', this.peliculas);
  }

  async cargarFavoritos(){
    const peliculas = (await this.storage.get('peliculas')) || [];
    return this.peliculas = peliculas;
  }
  async existePelicula( id:Number ){
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );
    return (existe) ? true : false;
  }

}
