import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';

export interface Extrato {
  Id:  string;
  Descricao:  string;
  Data:  Date;
  Valor:  number;
  Avulso:  boolean;
  Status:  string;
}

@Component({
  selector: 'app-extrato-table',
  templateUrl: './extrato-table.component.html',
  styleUrls: ['./extrato-table.component.css']
})

export class ExtratoTableComponent implements OnInit {
  extratos: Extrato[] = [];

  displayedColumns: string[] = ['Descricao', 'Data', 'Valor'];
  constructor (private httpService: HttpServiceService) {}

  ngOnInit(): void {
    var inicio = new Date();
    var inicioString = inicio.toLocaleString().substr(0, 10);
    this.httpService
      .getExtratos(inicioString, '')
      .subscribe(data => {
        this.extratos = data;
        console.log(this.extratos);
      });
  }


}
