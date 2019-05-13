import { LoadSubjects } from './../../../redux/actions/subjects.actions';
import { DataService } from './../../../common/services/data.service';
import { Component } from '@angular/core';
import { Subject } from 'src/app/common/entities';
import { AppState } from 'src/app/redux/state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.sass']
})
export class SubjectPageComponent {

  public subjectsName: string[];
  public subjects: Subject[];

  constructor(
    private store: Store<AppState>,
    private dataService: DataService,
    ) {
  }

  private initializeSubject(): void {
    if (this.store.source._value.subjectsPage.subjects.length === 0) {
      this.dataService.getSubjectsFromHttp().subscribe(data => {
        this.store.dispatch(new LoadSubjects(data));
      });
    }
    this.store.select('subjectsPage').subscribe(({subjects}) => {
      this.subjects = subjects;
      this.subjectsName = this.subjects.map(subject => subject.subjectName);
    });
  }

  public ngOnInit(): void {
    this.initializeSubject();
  }
}
