import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/shared/errors/notification.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ComplaintReason } from '../../core/models/complaintReason.model';
import { ComplaintUser } from '../../core/models/complaintUser.model';

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
    if(this.formComplaintUser.valid){
      Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Sí, denunciar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.formComplaintUser.get('reason').setValue(this.formComplaintUser.get('reason').value.split('.')[1]);
          this.userService.denounce(this.formComplaintUser.getRawValue() as ComplaintUser).subscribe((complaint: ComplaintUser) => {
            //this.newReview.emit(complaint);
            //this.startForm();
            this.close();
            this.notificationService.showSuccessAfter('Denuncia realizada correctamente.');
          },
            err => {
              console.log(err);
              const reason = err.error.reason ? err.error.reason : err.error;
              // Cambiarlo por un modal que notifique el error sin hacer el this.close()
              this.close();
              this.notificationService.showError(reason);
            }
          );
        }
      })
    }
  }

  get hasSelectedOption():boolean{
    return !!this.formComplaintUser.get('reason').value;
  }
}
