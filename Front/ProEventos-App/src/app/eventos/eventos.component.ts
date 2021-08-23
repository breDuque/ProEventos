import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos : any = []; 
  widthImg = 150;
  marginImg = 2;
  isImgCollapsed = false;



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public isCollapsed() {
    this.isImgCollapsed = !this.isImgCollapsed;
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      Response => this.eventos = Response,
      Error => console.log(Error)
    );
  }

}
