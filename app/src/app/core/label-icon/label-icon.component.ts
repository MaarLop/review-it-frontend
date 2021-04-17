import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-icon',
  templateUrl: './label-icon.component.html',
  styleUrls: ['./label-icon.component.scss'],
})
export class LabelIconComponent {
  @Input() data: string;
  @Input() icon: string;
  constructor() {}
}
