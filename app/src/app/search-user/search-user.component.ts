import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pageable } from '../core/models/pageable.model';
import { SimpleOption } from '../core/models/simple-option';
import { User } from '../core/models/user.model';
import { UserService } from '../services/user.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
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
    follow = faUserPlus;
    unfollow = faUserCheck;
      
    constructor(private fb: FormBuilder, 
        private router: Router,
        private userService: UserService){ }
    
    ngOnInit(): void {
        this.formGroup = this.fb.group(
        {
            userName: [{ value: '', disabled: false }],
        });
        this.userService.getUsers().subscribe((user:Pageable)=>{
            this.users$.next(user.content.filter((us)=> {
                console.log(us.id != +sessionStorage.getItem('userId'))
                return us.id != +sessionStorage.getItem('userId')
            }));
        });
    }
        
    
    goSearch(){
        const userName = this.formGroup.get('userName').value.replace(/\s/g, '%20');

        let filter;
        const userNameFilter = !!userName ? userName : '';
        filter = userNameFilter;

        this.userService.getUsers(filter).subscribe((user:Pageable)=>{
            this.users$.next(user.content.filter((us)=> {
                console.log(us.id != +sessionStorage.getItem('userId'))
                return us.id != +sessionStorage.getItem('userId')
            }));
        });
    } 

    cleanFilter(){
        this.formGroup.get('userName').setValue('');
        this.goSearch();
    }

    followUser(user: User){
        const body ={
            idTo: user.id,
            idFrom: parseInt(sessionStorage.getItem('userId'))
          }
          this.userService.followUser(body).subscribe((_)=>{
              const followings =  JSON.parse(localStorage.getItem('listOfFollowings'));
              followings.push(user.id);

              localStorage.setItem('listOfFollowings', JSON.stringify(followings));
          });    
    }

    followingUser(user:User){
        return JSON.parse(localStorage.getItem('listOfFollowings')).includes(user.id);
    }

    goToUserProfile(user){
        this.router.navigate([`/user/${user.id}`]);
    }
}
