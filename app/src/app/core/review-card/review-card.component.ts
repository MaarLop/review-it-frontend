import {Component, Input, OnInit } from '@angular/core';
import { Review } from '../models/review-model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from 'src/app/services/review.service';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { NotificationService } from '../shared/errors/notification.service';
import { faComment, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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
  trash = faTrash;
  isOwner = false;
  constructor(private reviewService: ReviewService, private userService: UserService, private modalService: NgbModal, private notificationService: NotificationService){ 
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
    this.isOwner=parseInt(sessionStorage.getItem("userId"))===this.review.user.id;
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
            this.notificationService.showSuccess('Su reseña ha sido eliminada');
          })
        }
      })
    }
  }

}