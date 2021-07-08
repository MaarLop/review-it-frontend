import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SimpleOption } from '../core/models/simple-option';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.scss']
})
export class UserSearchComponent implements OnInit{

    options$: Observable<SimpleOption[]> = of([
        { descripcion: "Usuario", id: "userName"},
      ]);

    filterToApply: string = '';

    users$ = new BehaviorSubject<any>([]);

    formGroup:FormGroup;
    
    size: number = 5;
    page: number = 0;
    finished = false;
    showSpinner = false;
      
    constructor(private fb: FormBuilder, 
        private router: Router,
        private userService: UserService){ }
    
    ngOnInit(): void {
        this.getUsers();
        this.formGroup = this.fb.group(
        {
            userName: [{ value: '', disabled: false }],
        });
    }

    getUsers(){
        if(this.finished) return;
        this.userService.getUsers(this.size, this.page, this.filterToApply).subscribe((response)=>{
            const userList = this.page === 0 ? [] : this.users$.value;
            this.users$.next([...userList, ...response.content.filter((us)=> {
                this.userService.getImage(us.userName).subscribe(
                    (data) => {
                    let reader = new FileReader();
                    reader.addEventListener("load", () => {
                      us.image = reader.result;
                    }, false);

                    if (data.size > 0) {
                      reader.readAsDataURL(data);
                    }
                });
                return us.id != +sessionStorage.getItem('userId')
            })]);
            this.finished = response.last;
            this.showSpinner = !this.finished;
            this.page+=1;
        });
    }
        
    
    goSearch(){
        this.filterToApply = this.formGroup.get('userName').value.replace(/\s/g, '%20');
        this.page = 0;
        this.finished = false;
        this.getUsers();
    } 

    onScroll(){
        setTimeout(() => {
            this.getUsers();
            this.showSpinner = false;
        }, 1000);
    }

    cleanFilter(){
        this.formGroup.get('userName').setValue('');
        this.goSearch();
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
