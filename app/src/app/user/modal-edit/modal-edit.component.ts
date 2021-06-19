import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/shared/errors/notification.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { emailPattern } from '../../utils/regex-pattern';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  formUser: FormGroup;
  modal : NgbModalRef;
  @Input() user : User;

  constructor(private fb: FormBuilder, private userService: UserService, private notificationService: NotificationService) { }

  selectedFile: File;
  image: any;

  ngOnInit(): void {
    this.startForm()
  }

  close(){
    this.modal.close();
  }

  startForm(){
    this.formUser = this.fb.group(
      {
        id: [{value: this.user.id, disabled: true}],
        name: [{value: this.user.name, disabled: false}],
        lastName: [{value: this.user.lastName, disabled: false}],
        isPrivate: [{value: this.user.isPrivate, disabled: false}]
      }
    )
  }

  update(){
    if(this.formUser.valid){
      const uploadData = new FormData();
      uploadData.append('userName', this.user.userName);
      uploadData.append('password', this.user.password);
      uploadData.append('avatar', this.user.avatar);
      uploadData.append('name', this.formUser.get('name').value);
      uploadData.append('lastName', this.formUser.get('lastName').value);
      uploadData.append('isPrivate', this.formUser.get('isPrivate').value);
      uploadData.append('email', this.user.email);
      if(this.selectedFile){
        uploadData.append('avatarFileForView', this.selectedFile);
      }
      this.userService.save(uploadData).subscribe((user: User) => {
        this.modal.close();
        this.notificationService.showSuccess('Perfil actualizado!');
      },
        err => {
          let first = err.error.name ? err.error.name+'\n' : '';
          const second = err.error.lastName ? err.error.lastName : '';
          first = !err.error.name && !err.error.lastName ? err.error : first;
          //this.notificationService.showError(name+lastName);
          Swal.fire({
            icon: 'error',
            html:first+'</br>'+second,
          })
        }
      );
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    let reader = new FileReader();
      reader.addEventListener("load", () => {
          this.image = reader.result;
      }, false);

      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
        //this.formUser.get('avatarFileForView').setValue(this.selectedFile);
      }
  }

}
