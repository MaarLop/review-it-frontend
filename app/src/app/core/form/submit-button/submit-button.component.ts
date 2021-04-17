import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent implements OnInit {
  @Input() label: string;
  @Input() group: FormGroup;

  constructor() {}
  ngOnInit() {}

  get buttonClasses() {
    const classes = {};
    classes[`formFieldSubmit-button--disabled`] = this.isSubmitDisabled;
    return classes;
  }

  get isSubmitDisabled(): boolean {
    return this.group.pristine || this.group.invalid || this.group.pending;
  }
}
