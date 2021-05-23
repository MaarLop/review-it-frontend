import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from '@auth0/auth0-angular';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [
        HttpClientTestingModule,
        AuthModule.forRoot({
          domain: 'dev-d8bhv2ic.us.auth0.com',
          clientId: 'OPF2R4rQ8M3OHOgZDooC4BJoK5kr12l2'
        }),
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        UserComponent,
        MatSnackBar,
        Overlay,
        FormBuilder,
        MatDialog
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  afterAll(() => {
        TestBed.resetTestingModule();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
