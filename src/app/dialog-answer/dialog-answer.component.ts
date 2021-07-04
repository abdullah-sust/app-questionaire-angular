import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: number;
  newReply: string;
}

@Component({
  selector: 'app-dialog-answer',
  templateUrl: './dialog-answer.component.html',
  styleUrls: ['./dialog-answer.component.scss']
})
export class DialogAnswerComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogAnswerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  questionList: any = []

  ngOnInit(): void {
    if (localStorage.getItem('question_list') === null) {
      this.questionList = []
    } else {
      this.questionList = JSON.parse(localStorage.getItem('question_list') || '[]')
    }
  }


  onCancelClick(): void {
    this.data.newReply = ''
    this.dialogRef.close();
  }

  onReplyClick(): void {
    if (this.data.newReply !== '') {
      for(var i=0; i<this.questionList.length; i++) {
        if (parseInt(this.questionList[i].id) === this.data.id) {
          this.questionList[i].answer.unshift(this.data.newReply)
          localStorage.setItem('question_list', JSON.stringify(this.questionList))
          break
        }
      }
      this.openSnackBar('Successfully replied', 'Cancel')
      this.dialogRef.close();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 })
  }
}
