import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

export interface Extrato {
  id:  string;
  descricao:  string;
  data:  Date;
  valor:  number;
  avulso:  boolean;
  avulsoTexto?: string;
  status:  string;
}

export interface NovoExtrato {
  id?:  string;
  descricao:  string;
  data:  Date;
  valor:  number;
  avulso:  boolean;
  status:  string;
}


@Component({
  selector: 'app-extrato-table',
  templateUrl: './extrato-table.component.html',
  styleUrls: ['./extrato-table.component.css']
})

export class ExtratoTableComponent implements OnInit {
  extratos: Extrato[] = [];
  novo = false;
  inicioPicker: Date = new Date();
  fimPicker: Date = new Date();
  total: number = 0;
  editando: boolean = false;
  dataSource = new MatTableDataSource<Extrato>();
  selectedRow!: Extrato;
  displayedColumns: string[] = ['Descricao', 'Data', 'Valor', 'Avulsa', 'Status', 'Acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor (private httpService: HttpServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.fimPicker.setDate(this.fimPicker.getDate() + 2);
    this.carregaTabela();
  }

  carregaTabela() {
    this.total = 0;
    var inicioString = this.inicioPicker.toLocaleString().substr(0, 10);
    console.log(this.fimPicker);
    var fimString = this.fimPicker == undefined ? '' : this.fimPicker.toLocaleString().substr(0, 10);
    this.httpService
      .getExtratos(inicioString, fimString)
      .subscribe(data => {
        this.extratos = data;
        this.extratos.forEach(e => {
          e.avulso ? e.avulsoTexto = 'Avulsa' : e.avulsoTexto = 'Não avulsa';
          this.total += e.valor;
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = this.extratos;
      });
  }

  public validaForm() {
    this.form = this.fb.group({
      descricao: [''],
      status: [''],
      valor:['']
    })
  }

  onCriaNovoContato(novo: boolean) {
    this.novo = novo;
    this.validaForm();
  }


  editExtrato(row: any) {
    console.log('edita');
    this.selectedRow = row;
    this.editando = true;
    this.validaForm();
    this.f.descricao.value = row.descricao;
    this.f.status.value = row.status;
    this.f.valor.value = row.valor;
  }

  salvaExtrato() {
    var novoExtrato: NovoExtrato = {
      id: this.selectedRow.id,
      descricao: this.f.descricao.value,
      data: this.selectedRow.data,
      valor: this.selectedRow.valor,
      avulso: this.selectedRow.avulsoTexto == 'Avulsa' ? true : false,
      status: this.selectedRow.status,
    }

    this.httpService.editExtrato(novoExtrato).subscribe(response => {
      this.carregaTabela();
      this.editando = false;
    });
  }

  criaExtrato() {
    var novoExtrato: NovoExtrato = {
      descricao: this.f.descricao.value,
      data: new Date(),
      valor: this.f.valor.value,
      avulso: true,
      status: this.f.status.value,
    }

    this.httpService.createExtrato(novoExtrato).subscribe(response => {
      this.carregaTabela();
      this.novo = false;
    });
  }

  cancelaExtrato(event: any, element: any) {
    event.stopPropagation();
    this.httpService.cancelExtrato(element.id).subscribe(response => {
      this.carregaTabela();
      this.editando = false;
    });
  }

}
