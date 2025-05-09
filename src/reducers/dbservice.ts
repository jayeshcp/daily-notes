import { NoteType } from "../shared/types/note";

const DB_NAME = 'NotesDB';
const DB_VERSION = 1;
const STORE_NAME = 'notes';

export class IndexedDBService {
  private db: IDBDatabase | null = null;

  constructor() {
    this.init();
  }

  private init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = request.result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, {
            keyPath: 'id',
            autoIncrement: true,
          });
          objectStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        // Placeholder for future upgrade logic
        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion;
        console.log(`Upgrading DB from version ${oldVersion} to ${newVersion}`);
        // Add future migration/upgrade code here
      };
    });
  }

  private getStore(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) {
      throw new Error('IndexedDB is not initialized');
    }
    const tx = this.db.transaction(STORE_NAME, mode);
    return tx.objectStore(STORE_NAME);
  }

  async addNote(note: NoteType): Promise<number> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.add(note);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getNote(id: number): Promise<NoteType | undefined> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore('readonly');
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllNotes(): Promise<NoteType[]> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore('readonly');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result as NoteType[]);
      request.onerror = () => reject(request.error);
    });
  }

  async updateNote(note: NoteType): Promise<void> {
    if (!note.id) {
      throw new Error('Note must have an id to be updated');
    }
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.put(note);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteNote(id: number): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async clearAllNotes(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const store = this.getStore('readwrite');
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
