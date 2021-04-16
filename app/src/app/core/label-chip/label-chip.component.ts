import { Component, Input, OnInit } from '@angular/core';
import { getProperty } from 'src/app/utils/keys';

@Component({
  selector: 'app-label-chip',
  templateUrl: './label-chip.component.html',
  styleUrls: ['./label-chip.component.scss'],
})
// FixMe: Si necesitaramos mostrar los colores de los estados en otro lugar que no sean los `LabelChip`s, deberíamos
// abstraer la información de esta estructura. Posiblemente este componente debería ser StatusLabelChipComponent,
// y deberíamos tener un LabelChipComponent para mostrar cosas que no sean de status, y poder manejar los estilos de otra forma.
export class LabelChipComponent implements OnInit { 
  @Input() data: string;
  @Input() modulo: string;
  @Input() field: string;
  @Input() instance: any;
  icon: string;
  class: string;
  constructor() { }
  ngOnInit(): void {
    if (this.instance) {
      this.data = getProperty(this.instance, this.field)
        .toLowerCase()
        .replace('_', ' ');
    }

    this.class = this.data.replace(' ', '-').toLowerCase();
  }
}
