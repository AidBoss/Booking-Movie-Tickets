import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName: string = 'app_db';
  private storeName: string = 'tokens';
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  // Khởi tạo cơ sở dữ liệu
  private initDB(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        const store = db.createObjectStore(this.storeName);
        store.createIndex('key', 'key', { unique: true })
        store.createIndex('token', 'token', { unique: true });
        store.createIndex('expiresAt', 'expiresAt');
      }
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
    };

    request.onerror = (event) => {
      console.error('Lỗi khi mở cơ sở dữ liệu:', event);
    };
  }

  // Đảm bảo cơ sở dữ liệu đã sẵn sàng
  private async ensureDBReady(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('MyAppDatabase', 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onerror = () => {
        reject(`Failed to open IndexedDB: ${request.error?.message}`);
      };
    });
  }

  // Lưu token
  async saveToken(key: string, token: string, expiresAt: string): Promise<void> {
    console.log("key : ", key);
    console.log("-------");
    console.log("token : ", token);
    console.log("--------------------------------");
    console.log("expiresAt : ", expiresAt);

    const db = await this.ensureDBReady();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const data = { key, token, expiresAt };
    const request = store.put(data, key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (error: any) => reject('Lỗi khi lưu token');
    });
  }

  // Lấy token
  async getToken(key: string): Promise<string | null> {
    const db = await this.ensureDBReady();
    const transaction = db.transaction(this.storeName, 'readonly');
    const store = transaction.objectStore(this.storeName);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result?.token || null);
      request.onerror = (error: any) => reject('Lỗi khi lấy token');
    });
  }

  // Xóa token
  async deleteToken(key: string): Promise<void> {
    const db = await this.ensureDBReady();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);

    const request = store.delete(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (error: any) => reject('Lỗi khi xóa token');
    });
  }
}
