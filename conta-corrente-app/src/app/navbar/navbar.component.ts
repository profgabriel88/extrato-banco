import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() valor = 0;
  @Input() novo = false;
  @Output() criaNovoRegistro = new EventEmitter<boolean>();

  onCriaNovoRegistro() {
    this.criaNovoRegistro.emit(true);
  }
}
