import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: any = [];
  public eventosFiltrados: any = [];
  widthImg = 150;
  marginImg = 2;
  isImgCollapsed = false;

  private _filtroLista: string = '';
  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(v: string) {
    this._filtroLista = v;
    this.eventosFiltrados = this.filtroLista
      ? this.filtrarEventos(this.filtroLista)
      : this.eventos;
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEventos();
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.dataEvento.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.lote.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.qtdPessoas.toString().indexOf(filtrarPor) !== -1
    );
  }

  public isCollapsed() {
    this.isImgCollapsed = !this.isImgCollapsed;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      (Response) => {
        (this.eventos = Response), (this.eventosFiltrados = this.eventos);
      },
      (Error) => console.log(Error)
    );
  }
}
