import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  peliculas: Pelicula[] = [];
  buscando:boolean = false;
  ideas: string[]= ['Spiderman', 'Avenger', "El señor de los anillos", "Robocot"];

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  buscar( event:any ){
    const valor = event.detail.value;
    this.buscando = true;
    if(!valor) {
      this.buscando = false;
      this.peliculas = [];
      return false;
    }
    this.moviesService.buscarPeliculas(valor)
    .subscribe((rta)=>{
      console.log("resp",rta)
      this.peliculas = rta['results'];
      this.buscando = false;
    })
  }

  async detalle( id:string ){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {id},
    });
    modal.present();
  }
}
