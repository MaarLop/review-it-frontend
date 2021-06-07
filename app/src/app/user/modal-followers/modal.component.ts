import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class FollowersModalCOmponent {
  data;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public list: any,private router: Router, private userService: UserService){
    this.data = list.dataKey;
    this.title = list.title;
  }

  goToUserProfile(user){
    this.userService.getImage(user.userName).subscribe(
        (data) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          user.image = reader.result;
        }, false);

        if (data.size > 0) {
          reader.readAsDataURL(data);
        }
    });
    this.router.navigate([`/user/${user.userName}`]);
    
  }
}