import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from '../../services/user.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Review } from '../models/review-model';
import { User } from '../models/user.model';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  formUser: FormGroup;
  
  reviews$ = new BehaviorSubject<Review[]>([]);

  size: number = 2;
  page: number = 0;
  finished = false;
  showSpinner = false;
  disabled = true;
  user: User;
  faCoffee = faCoffee;

  userId?: number;

  messageOfButton: String = 'Seguir';
  displayButton: Boolean = false;

  @Output() newUser = new EventEmitter<User>();

  constructor(private reviewService: ReviewService,
     public snackBar: MatSnackBar,
      private fb: FormBuilder, 
      public auth: AuthService, 
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private router: Router){
        
  }

  ngOnInit(): void {
    this.userId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.displayButton = 
              this.activatedRoute.snapshot.routeConfig.path.includes('user') &&
              sessionStorage.getItem('userId') !== this.userId.toString()
    this.startForm(this.disabled);
    this.getReviews();
  }

  getReviews(){
    if(this.finished) return;

    this.reviewService.getReviews(this.size, this.page).subscribe((response)=>{
        const reviewList = this.reviews$.value;
        this.reviews$.next([...reviewList, ...response.content]);
        this.finished = response.last;
        this.showSpinner = !this.finished;
        this.page+=1;
    });
  }

  onScroll(){
    setTimeout(() => {
        this.getReviews();
        this.showSpinner = false;
    }, 2000);
  }

  startForm(disabled: Boolean){
    const idUsuario = this.userId !== 0?  this.userId : sessionStorage.getItem('userId')
    this.userService.get(idUsuario).pipe(
      catchError(async (error) => this.errorHandle(error))
    ).subscribe(data => {
      this.user = data;
      this.formUser = this.fb.group(
        {
          id: [{value: this.user.id, disabled: true}],
          name: [{value: this.user.name, disabled: disabled}],
          lastName: [{value: this.user.lastName, disabled: disabled}],
          userName: [{value: this.user.userName, disabled: disabled}],
          password: [{value: this.user.password, disabled: disabled}],
          email: [{value: this.user.email, disabled: disabled } ],
          avatar: [{value: this.user.avatar, disabled: disabled}]
        }
      )
    })
    /*this.auth.user$.subscribe(
      user => {
        this.formUser = this.fb.group(
          {
            id: [{value: this.user.id, disabled: disabled}],
            name: [{value: user.given_name, disabled: disabled}],
            userName: [{value: this.user.userName, disabled: disabled}],
            password: [{value: user.sub, disabled: disabled}],
            email: [{value: this.user.email, disabled: disabled }, Validators.required ]
          }
        )
      }
    )*/  
  }

  errorHandle(error){
    this.router.navigate(['/401'])
  }

  edit(){
    this.disabled = false;
    this.startForm(this.disabled);
  }

  update(){
    if(this.formUser.valid){
      this.userService.save(this.formUser.getRawValue() as User).subscribe((user: User) => {
        this.newUser.emit(user);
        this.disabled = true;
        this.startForm(this.disabled);
      });
    }
  }

  follow(){
    const body ={
      idTo: parseInt(sessionStorage.getItem('userId')),
      idFrom: this.userId
    }
    this.userService.followUser(body).subscribe((response)=>{
      console.log(response)
      this.messageOfButton = "Seguido";
    });
  }
}
