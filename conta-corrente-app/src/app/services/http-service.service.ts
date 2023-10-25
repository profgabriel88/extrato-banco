import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) {}

  public url = 'http://localhost:5123/api/Extrato';


  public getExtratos(inicio: any, fim?: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('inicio', inicio);


    params = params.append('fim', fim);


    return this.http.get<any>(
      `${this.url}`,
      { params : params }
    );
  }

  public createExtrato(extrato: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, extrato);
  }

  public editExtrato(extrato: any): Observable<any> {
    return this.http.put<any>(`${this.url}`, extrato);
  }

  public cancelExtrato(extratoId: any): Observable<any> {
    return this.http.put<any>(
      `${this.url}/cancel?extratoId=${extratoId}`, null
    );
  }
}
