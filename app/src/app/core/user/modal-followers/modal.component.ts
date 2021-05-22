import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal.component.html',
})

export class DialogElementsExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){
    console.log(data)
  }
}