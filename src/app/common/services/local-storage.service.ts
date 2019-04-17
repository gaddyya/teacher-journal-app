import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  protected stringifyItem(value: any): string {
    return JSON.stringify(value);
  }

  protected objectifyItem(value: string): object[] {
    return Object.values(JSON.parse(value));
  }

  protected setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  protected getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public addData(value: any, key: string): void {
    let stringValue: string = this.stringifyItem(value);
    this.setItem(key, stringValue);
  }

  public getData(key: string): object[] {
    let item: string = this.getItem(key);
    let objectItem: object[] = this.objectifyItem(item);
    return objectItem;
  }
}
