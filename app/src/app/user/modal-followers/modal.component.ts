import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class FollowersModalCOmponent {
  data;
  constructor(@Inject(MAT_DIALOG_DATA) public list: any){
    console.log(list.dataKey)
    this.data = list.dataKey;
  }
}