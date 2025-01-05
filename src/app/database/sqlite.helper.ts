import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

export class SQLiteHelper {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initializeDatabase(
    dbName: string,
    dbVersion: number,
    dbMode: string,
    dbEncrypted: boolean,
    dbReadOnly: boolean,
    tableSQL: string
  ): Promise<void> {
    try {
      const platform = Capacitor.getPlatform();

      if (platform === 'web') {
        await customElements.whenDefined('jeep-sqlite');
        const jeepSqliteEl = document.querySelector('jeep-sqlite');
        if (jeepSqliteEl) {
          await this.sqlite.initWebStore();
        } else {
          throw new Error('jeep-sqlite not found in the DOM.');
        }
      }

      const ret = await this.sqlite.checkConnectionsConsistency();
      const isConn = (await this.sqlite.isConnection(dbName, dbReadOnly)).result;

      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(dbName, dbReadOnly);
      } else {
        this.db = await this.sqlite.createConnection(dbName, dbEncrypted, dbMode, dbVersion, dbReadOnly);
      }

      await this.db.open();

      await this.db.execute(tableSQL);
    } catch (error) {
      console.error('Error initializing database:', error);
      throw new Error(`Failed to initialize database "${dbName}".`);
    }
  }

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return await this.db.run(query, params);
  }

  async fetchAll(query: string, params: any[] = []): Promise<any[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const res = await this.db.query(query, params);
    return res.values ?? [];
  }

  async closeDatabase(dbName: string): Promise<void> {
    try {
      await this.sqlite.closeConnection(dbName, false);
      console.log(`Database "${dbName}" closed successfully.`);
    } catch (error) {
      console.error(`Error closing database "${dbName}":`, error);
      throw new Error(`Failed to close database "${dbName}".`);
    }
  }
}

