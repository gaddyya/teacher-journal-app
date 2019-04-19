import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.sass']
})
export class SubjectTableComponent implements OnInit {

  public subject: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.params.subscribe( data => {
      this.subject = data.subjects;
    });
  }
}
