import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ReviewService } from '../../services/review.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  constructor(private userService: UserService, private reviewService: ReviewService) { }

  ngOnInit(): void {
  }

}
