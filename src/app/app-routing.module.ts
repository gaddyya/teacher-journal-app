import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentPageComponent } from './components/students/student-page/student-page.component';
import { SubjectPageComponent } from './components/subjects/subject-page/subject-page.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: 'students', component: StudentPageComponent },
  { path: 'subjects', component: SubjectPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
