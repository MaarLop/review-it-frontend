import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class FollowersModalCOmponent {
  data;
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) public list: any){
    this.data = list.dataKey;
    this.title = list.title;
  }
}