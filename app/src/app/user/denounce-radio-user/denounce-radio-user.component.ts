import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/shared/errors/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ComplaintReason } from '../../core/models/complaintReason.model';

@Component({
  selector: 'app-denounce-radio-user',
  templateUrl: './denounce-radio-user.component.html',
  styleUrls: ['./denounce-radio-user.component.scss']
})
export class DenounceRadioUserComponent implements OnInit {

  formComplaintUser: FormGroup;
  modal : NgbModalRef;
  @Input() user : User;
  reason=ComplaintReason;
 
  constructor(private fb: FormBuilder, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.startForm();
  }

  close(){
    this.modal.close();
  }

  startForm(){
    this.formComplaintUser = this.fb.group(
      {
        userId: sessionStorage.getItem('userId'),
        toId: [{value: this.user.id, disabled: false}],
        reason: [{value: '', disabled: false}],
        comment: [{value: '', disabled: false}]
      }
    )
  }

  denounce(){
    console.log(this.formComplaintUser.get('reason').value.split('.')[1])
  }

  get hasSelectedOption():boolean{
    return !!this.formComplaintUser.get('reason').value;
  }
}
