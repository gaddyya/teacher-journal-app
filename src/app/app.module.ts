import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
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
import { PanelComponent } from './components/panel/panel.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    PanelComponent,
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
