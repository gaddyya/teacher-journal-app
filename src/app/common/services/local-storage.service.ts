import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  // i use any, because there can come IStudents or ISubjects or ISubjcetTable or etc...
  private stringifyItem(value: any[]): string {
    return JSON.stringify(value);
  }

  // i use any, because there can come IStudents or ISubjects or ISubjcetTable or etc...
  private objectifyItem(value: string): any[] {
    return JSON.parse(value);
  }

  private setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public length(): number {
    return localStorage.length;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public isElementOfLocal(key: string): boolean {
    return !(localStorage.getItem(key) === null)
  }

  // i use any, because there can come IStudents or ISubjects or ISubjcetTable or etc...
  public addData(value: any[], key: string): void {
    let stringValue: string = this.stringifyItem(value);
    this.setItem(key, stringValue);
  }

  // i use any, because there can come IStudents or ISubjects or ISubjcetTable or etc...
  public getData(key: string): any[] {
    let item: string = this.getItem(key);
    let objectItem: any[] = this.objectifyItem(item);
    return objectItem;
  }
}
