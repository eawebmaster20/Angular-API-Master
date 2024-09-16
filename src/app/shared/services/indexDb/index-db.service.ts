import { Injectable } from '@angular/core';
import { openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
  private dbPromise = openDB('http-cache', 1, {
    upgrade(db) {
      db.createObjectStore('requests');
    },
  });

  async getCache(url: string): Promise<any | null> {
    const db = await this.dbPromise;
    return db.get('requests', url);
  }

  async setCache(url: string, data: any): Promise<void> {
    console.log('setCache', url);
    const db = await this.dbPromise;
    const existingData = await this.getCache(url);
    console.log(existingData);
    const updatedData = existingData ? [...existingData, ...data] : data;
    await db.put('requests', updatedData, url);
  }
  

  // async setCache(url: string, data: any): Promise<void> {
  //   console.log('setCache', url)
  //   const db = await this.dbPromise;
  //   await db.put('requests', data, url);
  // }
}
