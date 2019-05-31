import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { AppState } from '../redux/state';
import { Store } from '@ngrx/store';
import { LoadSubjects, LoadStudents } from '../redux/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  public sub$;
  public stu$;

  constructor(
    private dataService: DataService,
    private store: Store<AppState>
    ) {}

  public ngOnInit(): void {
    this.sub$ = this.dataService.getSubjectsFromHttp().subscribe(data => {
      this.store.dispatch(new LoadSubjects(data));
    });
    this.stu$ = this.dataService.getStudentsFromHttp().subscribe(data => {
      this.store.dispatch(new LoadStudents(data));
    })
  }

  public ngOnDestroy(): void {
    this.stu$.unsubcribe();
    this.sub$.unsubcribe();
  }
}
