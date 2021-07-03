import {Component, Input, OnInit } from '@angular/core';
import { Review } from '../models/review-model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from 'src/app/services/review.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { NotificationService } from '../shared/errors/notification.service';
import { faComment, faTrash, faThumbsUp, faEdit, faInfo, faBan } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Like } from '../models/like.model';
import { ModalEditReviewComponent } from './modal-edit-review/modal-edit-review.component';
import { DenounceRadioReviewComponent } from './denounce-radio-review/denounce-radio-review.component';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-review-card',
  templateUrl: 'review-card.component.html',
  styleUrls: ['review-card.component.scss'],
})

export class ReviewCardComponent implements OnInit{
  @Input() review : Review;
  currentRate: Number;
  comment = faComment;
  heart = faHeart;
  faBan = faBan;
  faEdit = faEdit;
  trash = faTrash;
  thumbs= faThumbsUp;
  faInfo= faInfo;
  isOwner = false;
  likeCount: number;
  hasLike: boolean;
  hasImage: boolean;

  constructor(private reviewService: ReviewService, public apiClient: ApiClientService, private userService: UserService, private modalService: NgbModal, private notificationService: NotificationService){ 
   }
  
  ngOnInit(): void {
    this.userService.getImage(this.review.user.userName).subscribe(
      (data) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.review.user.image = reader.result;
      }, false);

      if (data.size > 0) {
        reader.readAsDataURL(data);
      }
    });
    this.currentRate=this.review.points;
    this.hasImage=this.review.img ? true : false;
    this.isOwner=parseInt(sessionStorage.getItem("userId"))===this.review.user.id;
    this.likes();
  }

  likes(){
    if(this.review.id){
      this.reviewService.likes(this.review.id).subscribe((response)=>{
        this.likeCount = response.length;
        this.hasLike = response.some((like: Like)=>like.user.id===parseInt(sessionStorage.getItem("userId")));
      });
    }
  }

  comments(){
    if(this.review.id){
      const modalRef = this.modalService.open(CommentListComponent);
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.reviewId = this.review.id;
    }
  }

  remove(){
    if(this.review.id){
      Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'Cancelar',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.reviewService.delete(this.review.id).subscribe(() => {
            this.notificationService.showSuccess('Su reseña esta siendo eliminada..');
          })
        }
      })
    }
  }

  moreDetails(){
    Swal.fire({
      title: this.review.title,
      showCancelButton: false,
      html: ` <img id="tool-tip" src="${this.review.img}" fallimg="movie" style="max-height:200px; width:auto;"/>
      <p>${this.review.overview}</p>`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Cerrar'
    });
  }

  likear(){
    if(this.review.id){
      this.reviewService.likear(this.review.id).subscribe(() => {
        if(this.hasLike) {
          this.likeCount = this.likeCount-1;
        }else{
          this.likeCount = this.likeCount+1;
        } 
        this.hasLike = !this.hasLike
      })
    }
  }

  edit(){
    if(this.review.user.id === parseInt(sessionStorage.getItem('userId'))){
      const modalRef = this.modalService.open(ModalEditReviewComponent);
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.review = this.review;
    }
  }

  denounce(){
    const modalRef = this.modalService.open(DenounceRadioReviewComponent);
      modalRef.componentInstance.modal = modalRef;
      modalRef.componentInstance.review = this.review;
  }

}