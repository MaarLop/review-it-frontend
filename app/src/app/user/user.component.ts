import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { faBan, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Pageable } from '../core/models/pageable.model';
import { User } from '../core/models/user.model';
import { UserService } from '../services/user.service';
import { FollowersModalCOmponent } from './modal-followers/modal.component';
import { ModalEditComponent } from './modal-edit/modal-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../core/shared/errors/notification.service';
import { Review } from '../core/models/review-model';
import Swal from 'sweetalert2';
import { DenounceRadioUserComponent } from './denounce-radio-user/denounce-radio-user.component';
import { exactLength } from '../core/form/custom-validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  formUser: FormGroup;
  size: number = 2;
  page: number = 0;
  finished = false;
  showSpinner = false;
  disabled = true;
  user: User;

  faEdit = faUserEdit;
  faBan = faBan;
  userId?: number;
  userName?: string;

  displayButton: boolean = false;

  isOwnProfile: boolean = false;

  reviews:number = 0;
  followers:number = 0;
  likes:number;
  followings:number;

  followers$ = new BehaviorSubject<User[]>([]);
  followings$ = new BehaviorSubject<User[]>([]);

  @Output() newUser = new EventEmitter<User>();

  filter$: BehaviorSubject<string> = new BehaviorSubject('');
  isPrivate: boolean = true;
  isFollowing: boolean = false;

  constructor(private reviewService: ReviewService,
     public snackBar: MatSnackBar,
      private fb: FormBuilder, 
      public auth: AuthService, 
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      public dialog: MatDialog,
      private modalService: NgbModal,
      private router: Router,
      private notificationService: NotificationService){
        
  }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.routeConfig.path.includes('user') ?
      this.activatedRoute.snapshot.paramMap.get('username') : sessionStorage.getItem('userName');
    const filter = `userName=${this.userName}`;
    this.filter$.next(filter);
    this.likesToUser(this.userName);
    this.startForm(this.userName);
    this.getInformationOfUser(this.userName);
    this.displayButton = this.activatedRoute.snapshot.routeConfig.path.includes('user') &&
              sessionStorage.getItem('userName') !== this.userName
    this.isOwnProfile = !this.displayButton;
  }

  likesToUser(userName: string){
    this.userService.getLikesTo(userName).subscribe((likes)=>{
      this.likes = likes.length
    });
  }

  startForm(userName: string){
    this.userService.getByUsername(userName).pipe(
      catchError(async (error) => this.errorHandle(error))
    ).subscribe((data) => {
      this.user = data;
      this.isPrivate = data.isPrivate;
    })
  }

  getInformationOfUser(userName: string){
      this.userService.getImage(userName).subscribe(
      (data) => {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          this.user.image = reader.result;
        }, false);

        if (data.size > 0) {
          reader.readAsDataURL(data);
        }
      });
      this.userService.getFollowers(userName).subscribe((response: Pageable) => {
      const followers = response.content.map((follow) => follow.from);
      this.followers$.next(followers);
      this.followers = response.totalElements;
    });
    this.userService.getFollowings(userName).subscribe((response: Pageable) => {
      const followings = response.content.map((follow) => follow.to);
      this.followings$.next(followings);
      this.followings = response.totalElements;
    });
    this.userService.getReviews(userName).subscribe((response)=>{
      this.reviews = response.length;
    });
  }

  errorHandle(error){
    this.router.navigate(['/401'])
  }

  edit(){
    if(this.user.id === parseInt(sessionStorage.getItem('userId'))){
      const modalRef = this.modalService.open(ModalEditComponent);
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.user = this.user;
    }
  }

  showFollowers(){
    this.dialog.open(FollowersModalCOmponent, {
      width: '100%',
      height: '60%',
      data: {
        title: 'Seguidores',
        dataKey: this.followers$.value
      }
    });
  }

  showFollowings(){
    this.dialog.open(FollowersModalCOmponent, {
      width: '100%',
      height: '60%',
      data: {
        title: 'Seguidos',
        dataKey: this.followings$.value
      }
    });
  }

  newReview(review: Review){
    if(review){
        this.notificationService.showSuccessBeforeAfter('Publicandose rese??a...', 
          'Rese??a publicada exitosamente.');
    }
  }

  denounce(){
    const modalRef = this.modalService.open(DenounceRadioUserComponent);
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.user = this.user;
  }

}


