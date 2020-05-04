import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() latitud: number;
  @Input() longitud: number;

  constructor(
    private _modalController: ModalController
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsc29ubWI4OSIsImEiOiJjazk3dXQ1ZDUwemNqM3BsMnE5eDN1NWNuIn0.JbsHHrjS7D_dEojRog17pg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud], // [longitud, latitud]
      zoom: 15
    });
    new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(map);
    map.on('load', () => {
      map.resize();
    });
  }

  closeMap() {
    this._modalController.dismiss();
  }
}
