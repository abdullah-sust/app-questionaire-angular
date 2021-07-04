import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AnswerListComponent } from './answer-list/answer-list.component';

const routes: Routes = [
  { path: '', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'dashboard', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'question-list', component: QuestionListComponent, pathMatch: 'full' },
  { path: 'answer-list/:id', component: AnswerListComponent, pathMatch: 'full' },
  { path: 'login', component: localStorage.getItem('isUserLoggedInAng') === '1' ? QuestionListComponent : LoginFormComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
