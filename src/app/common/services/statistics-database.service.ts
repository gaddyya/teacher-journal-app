import { Subject } from './../entities/Subject.model';
import { AppState } from 'src/app/redux/state/app.state';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatisticsNode } from '../entities/Statistics.model';
import { Store } from '@ngrx/store';

let Data: any = {};

@Injectable({
  providedIn: 'root'
})
export class StatisticsDatabaseService {

  public dataChange: BehaviorSubject<StatisticsNode[]> = new BehaviorSubject<StatisticsNode[]>([]);

  get data(): StatisticsNode[] { return this.dataChange.value; }

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('subjectsPage').subscribe(({subjects}) => {
      subjects.forEach((el: Subject) => {
        let array = [];
        el.journal.forEach(date => array = [...array, date.date]);
        Data[el.subjectName] = {
          Date: array
        };
      });
      this.initialize();
    });

    //this.getData();
  }

  public initialize(): void {
    // Build the tree nodes from Json object. The result is a list of `StatisticsNode` with nested
    //     file node as children.
    const data: StatisticsNode[] = this.buildFileTree(Data, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `StatisticsNode`.
   */
  public buildFileTree(obj: {[key: string]: any}, level: number): StatisticsNode[] {
    return Object.keys(obj).reduce<StatisticsNode[]>((accumulator, key) => {
      const value: StatisticsNode = obj[key];
      const node: StatisticsNode = new StatisticsNode();
      node.item = key;
      if (value !== undefined) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }
      return accumulator.concat(node);
    },                                               []);
  }

  public getData(): void {
    this.store.select('subjectsPage').subscribe(({subjects}) => {
      subjects.forEach((el: Subject) => {
        let array = [];
        el.journal.forEach(date => array = [...array, date.date]);
        Data[el.subjectName] = {
          Date: array
        };
      });
    });
  }
}
