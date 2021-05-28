import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/shared/errors/notification.service';
import { UserService } from 'src/app/services/user.service';

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
    console.log(this.user)
    this.formUser = this.fb.group(
      {
        id: [{value: this.user.id, disabled: true}],
        name: [{value: this.user.name, disabled: false}],
        avatar: [{value: this.user.avatar, disabled: false}],
        userName: [{value: this.user.userName, disabled: false}],
      }
    )
  }

  update(){
    if(this.formUser.valid){
      const uploadData = new FormData();
      uploadData.append('name', this.user.name);
      uploadData.append('userName', this.user.userName);
      uploadData.append('avatar', this.user.avatar);
      uploadData.append('password', this.user.password);
      uploadData.append('avatarFileForView', this.selectedFile);
      this.userService.save(uploadData).subscribe((user: User) => {
        this.modal.close();
        this.notificationService.showSuccess('Perfil actualizado!');
      });
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
      }
  }

}
