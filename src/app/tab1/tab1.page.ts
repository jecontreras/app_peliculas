import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  peliculasReciente: Pelicula[] = [];
  populares: Pelicula[] = [];



  constructor(
    private movieService: MoviesService
  ) {}

  ngOnInit(){
    this.getPopulares();
  }
  cargarMas(){
    this.getPopulares();
  }
  getPopulares(){
    this.movieService.getFeature()
    .subscribe(res=>this.peliculasReciente = res.results);

    this.movieService.getPopulares()
    .subscribe(res=>{
      let filtro = res.results.filter((row)=>row !== null);
      const arrTemp = [ ...this.populares, ...filtro ];
      this.populares = arrTemp
    });
  }

}
