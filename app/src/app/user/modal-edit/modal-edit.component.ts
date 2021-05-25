import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
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
  @Output() newUser = new EventEmitter<User>();

  constructor(private fb: FormBuilder, private userService: UserService) { }

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
        userName: [{value: this.user.userName, disabled: false}],
        password: [{value: this.user.password, disabled: false}]
      }
    )
  }

  update(){
    if(this.formUser.valid){
      this.userService.save(this.formUser.getRawValue() as User).subscribe((user: User) => {
        this.newUser.emit(user);
        this.modal.close();
      });
    }
  }

}
