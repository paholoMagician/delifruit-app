import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  validateCaches() {
    if(window.caches) {
      caches.open('deli-cache')
    }
  }
}
