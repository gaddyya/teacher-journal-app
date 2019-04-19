import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public stringifyItem(value: object): string {
    return JSON.stringify(value);
  }

  public objectifyItem(value: string): object {
    return JSON.parse(localStorage.getItem(value));
  }
}
