import { LoadSubjects } from './../../../redux/actions/subjects.actions';
import { DataService } from './../../../common/services/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'src/app/common/entities';
import { AppState } from 'src/app/redux/state/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public subjectsName: string[];
  public subjects: Subject[];

  constructor(
    private store: Store<AppState>,
    ) {
  }

  private initializeSubject(): void {
    this.subscription = this.store.select('subjectsPage').subscribe(({subjects}) => {
      this.subjects = subjects;
      this.subjectsName = this.subjects.map(subject => subject.subjectName);
    });
  }

  public ngOnInit(): void {
    this.initializeSubject();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
