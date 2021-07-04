import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { QuestionListDataSource, QuestionListItem } from './question-list-datasource';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogQuestionComponent } from '../dialog-question/dialog-question.component'
import { DialogAnswerComponent } from '../dialog-answer/dialog-answer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<QuestionListItem>;
  dataSource: QuestionListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'question', 'count', 'view', 'reply'];
  id: number = 0;
  question: string = '';
  answers: any[] = [];
  isUserLoggedIn: boolean = false;
  newQuestion: string = '';
  newReply: string = '';
  questionId: any = '';

  constructor(public dialog: MatDialog, private router: Router) {
    this.dataSource = new QuestionListDataSource();
  }

  ngOnInit () {
    if(localStorage.getItem('isUserLoggedInAng') === '1') {
      this.isUserLoggedIn = true
      this.displayedColumns = ['id', 'question', 'count', 'view', 'reply'];
    } else {
      this.isUserLoggedIn = false
      this.displayedColumns = ['id', 'question', 'count', 'view'];
    }
  }

  initialize () {
    this.table.dataSource = JSON.parse(localStorage.getItem('question_list') || '[]')
    this.dataSource.data = JSON.parse(localStorage.getItem('question_list') || '[]')
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openQuestionDialog(): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      width: '500px',
      data: { newQuestion: this.newQuestion }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initialize()
      this.newQuestion = '';
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onAskClick(): void {
    if (this.isUserLoggedIn) {
      this.openQuestionDialog()
    } else {
      this.router.navigate(['/login'])
    }
  }

  onViewClicked(id: number): void {
    this.router.navigate(['/answer-list/' + id])
  }

  onReplyClicked(id: number): void {
    this.questionId = id
    if (this.isUserLoggedIn) {
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
      this.initialize()
      this.newReply = '';
    });
  }
}
