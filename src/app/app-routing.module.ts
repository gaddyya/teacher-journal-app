import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentPageComponent } from './components/students/student-page/student-page.component';
import { SubjectPageComponent } from './components/subjects/subject-page/subject-page.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { SubjectTableComponent } from './components/subjects/subject-table/subject-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full'},
  { path: 'students', component: StudentPageComponent },
  { path: 'subjects', component: SubjectPageComponent },
  { path: 'students/addStudents', component: StudentFormComponent },
  { path: 'subjects/addSubjects', component: SubjectFormComponent },
  { path: 'subjectsTable/:subjects', component: SubjectTableComponent },
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
