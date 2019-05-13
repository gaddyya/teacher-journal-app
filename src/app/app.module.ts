import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatButtonModule, MatInputModule, MatIconModule, MatButtonToggleModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

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
import { ButtonComponent } from './shared/components/button/button.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { environment } from 'src/environments/environment';
import { studentsReducer } from './redux/reducers/students.reducer';
import { subjectsReducer } from './redux/reducers/subjects.reducer';
import { StudentsEffects } from './redux/effects/students.effects';
import { SubjectsEffects } from './redux/effects';
import { HighlightOurMainColorDirective } from './common/directives/highlight-our-main-color.directive';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

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
    ButtonComponent,
    NoContentComponent,
    HighlightOurMainColorDirective,
    StatisticsComponent,
  ],
  imports: [
    MatTableModule,
    MatIconModule,
    BrowserModule,
    MatButtonModule,
    MatButtonToggleModule,
    AppRoutingModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    EffectsModule.forRoot([StudentsEffects, SubjectsEffects]),
    StoreModule.forRoot({studentsPage: studentsReducer, subjectsPage: subjectsReducer}),
    environment.production.valueOf() ? [] :  StoreDevtoolsModule.instrument(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [
  ]
})
export class AppModule { }
