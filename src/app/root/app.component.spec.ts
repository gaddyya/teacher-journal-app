import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
// tslint:disable-next-line: typedef
    const fixture = TestBed.createComponent(AppComponent);
// tslint:disable-next-line: typedef
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'teacher-journal-app'`, () => {
// tslint:disable-next-line: typedef
    const fixture = TestBed.createComponent(AppComponent);
// tslint:disable-next-line: typedef
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('teacher-journal-app');
  });

  it('should render title in a h1 tag', () => {
// tslint:disable-next-line: typedef
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
// tslint:disable-next-line: typedef
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to teacher-journal-app!');
  });
});
