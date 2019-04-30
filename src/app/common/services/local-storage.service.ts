import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  protected stringifyItem(value: object[]): string {
    return JSON.stringify(value);
  }

  protected objectifyItem(value: string): object[] {
    return JSON.parse(value);
  }

  protected setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  protected getItem(key: string): string {
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
    let length = localStorage.length;
    for (let i = 0; i < length; i++){
      if(localStorage.key(i) === key) return true;
    }
  };

  public addData(value: object[], key: string): void {
    let stringValue: string = this.stringifyItem(value);
    this.setItem(key, stringValue);
  }

  public getData(key: string): object[] {
    let item: string = this.getItem(key);
    let objectItem: object[] = this.objectifyItem(item);
    return objectItem;
  }
}
