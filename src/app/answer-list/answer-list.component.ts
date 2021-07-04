import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAnswerComponent } from '../dialog-answer/dialog-answer.component';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss'],
})

export class AnswerListComponent {
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  panelOpenState = false
  questionId: any = 0
  answers: any = []
  question: string = ''
  isLoggedIn: boolean = false
  questionList: any = []
  isQuestionFound: boolean = false
  newReply: string = ''
  index: number = -1

  ngOnInit() {
    this.questionId = this.route.snapshot.paramMap.get("id")
    this.answers = []
    if (localStorage.getItem('isUserLoggedInAng') === '1') {
      this.isLoggedIn = true
    } else {
      this.isLoggedIn = false
    }
    this.initialize()
  }

  initialize(): void {
    if (localStorage.getItem('question_list') !== null) {
      this.questionList = JSON.parse(localStorage.getItem('question_list') || '[]')
      for(var i=0; i<this.questionList.length; i++) {
        if (parseInt(this.questionId) === this.questionList[i].id) {
          this.index = i
          this.question = this.questionList[i].question
          this.answers = this.questionList[i].answer
          this.isQuestionFound = true
          break
        }
      }
    }
  }

  onReplyClick(): void {
    if (this.isLoggedIn) {
      this.openReplyDialog()
    } else {
      this.router.navigate(['/login'])
    }
  }

  openReplyDialog(): void {
    const dialogRef = this.dialog.open(DialogAnswerComponent, {
      width: '500px',
      data: { newReply: this.newReply, id: parseInt(this.questionId)}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.questionList[this.index].answer.unshift(this.newReply)
      this.initialize()
    });
  }
}
