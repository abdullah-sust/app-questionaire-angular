import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  newQuestion: string;
}

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.scss']
})
export class DialogQuestionComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
  questionList: any = []

  ngOnInit(): void {
    if (localStorage.getItem('question_list') === null) {
      this.questionList = []
    } else {
      this.questionList = JSON.parse(localStorage.getItem('question_list') || '[]')
    }
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSaveClick(): void {
    if (this.data.newQuestion !== '') {
      var ques = {
        id: this.questionList.length + 1,
        question: this.data.newQuestion,
        answer: []
      }
      this.questionList.unshift(ques)
      localStorage.setItem('question_list', JSON.stringify(this.questionList))
      this.openSnackBar('Successfully saved', 'Cancel')
      this.data.newQuestion = ''
      this.dialogRef.close();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 })
  }

}
