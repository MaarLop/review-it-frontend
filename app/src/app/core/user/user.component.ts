import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  formUser: FormGroup;

  constructor(private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit(): void {
    this.startForm();
  }

  startForm(){
    this.formUser = this.fb.group(
      {
        name: [{value: '', disabled: true}],
        email: [{value: '', disabled: true }]
      }
    )
  }

}
