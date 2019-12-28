import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };
  estrella = 'star-outline';
  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private detaLocal: DataLocalService
  ) { }

  async ngOnInit() {
    const existe = await this.detaLocal.existePelicula( this.id );
    if(existe) this.estrella = 'star';
    this.moviesService.getPeliculaDetalle( this.id )
    .subscribe((res)=>this.pelicula = res);

    this.moviesService.getActoresPelicula( this.id )
    .subscribe((res)=>this.actores = res.cast);
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.detaLocal.guardarPelicula( this.pelicula );
  }

}
