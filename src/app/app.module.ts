import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule, MatSortModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { StudentPageComponent } from './components/students/student-page/student-page.component';
import { StudentTableComponent } from './components/students/student-table/student-table.component';
import { SubjectFormComponent } from './components/subjects/subject-form/subject-form.component';
import { SubjectPageComponent } from './components/subjects/subject-page/subject-page.component';
import { SubjectTableComponent } from './components/subjects/subject-table/subject-table.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './shared/components/form/form.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { HighlightOurMainColorDirective } from './common/style/highlight-our-main-color.directive';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './common/services/in-memory-data.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    StudentPageComponent,
    StudentTableComponent,
    SubjectFormComponent,
    SubjectPageComponent,
    SubjectTableComponent,
    HeaderComponent,
    NavComponent,
    FormComponent,
    ButtonComponent,
    NoContentComponent,
    HighlightOurMainColorDirective
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [ ]
})
export class AppModule { }
