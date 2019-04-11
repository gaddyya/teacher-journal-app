import { NgModule } from '@angular/core';
import { from } from 'rxjs';
import { Routes, RouterModule } from '@angular/router';
import { StudentPageComponent } from './components/students/student-page/student-page.component';
import { SubjectPageComponent } from './components/subjects/subject-page/subject-page.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: 'students', component: StudentPageComponent },
  { path: 'subjects', component: SubjectPageComponent },
  { path: 'students/addStudents', component: StudentFormComponent },
  { path: 'subjects/addSubjects', component: SubjectFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
