import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FieldConfig } from '..';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent implements OnInit {
  @Input() title: string;

  static getFieldConfig = (params: { title: string }): FieldConfig => ({
    component: SeparatorComponent,
    inputProperties: {
      title: params.title,
    },
  });

  constructor() {}
  ngOnInit() {}
}
