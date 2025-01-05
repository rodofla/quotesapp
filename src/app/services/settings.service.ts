import { Injectable } from '@angular/core';
import { SQLiteHelper } from '../database/sqlite.helper';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private dbHelper: SQLiteHelper;
  private dbName: string = 'quotes.db';
  private tableSQL: string = `
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY NOT NULL,
      allowDeletion INTEGER NOT NULL
    );
`;

  constructor() {
    this.dbHelper = new SQLiteHelper();
  }

  async initializeDatabase() {
    await this.dbHelper.initializeDatabase(this.dbName, 1, 'no-encryption', false, false, this.tableSQL);
  }

  async updateAllowDeletion(allow: boolean) {
    const checkQuery = `SELECT id FROM settings WHERE id = 1`;
    try {
      const existing = await this.dbHelper.fetchAll(checkQuery);

      if (existing.length === 0) {
        const insertQuery = `INSERT INTO settings (id, allowDeletion) VALUES (?, ?)`;
        await this.dbHelper.executeQuery(insertQuery, [1, allow ? 1 : 0]);
      } else {
        const updateQuery = `UPDATE settings SET allowDeletion = ? WHERE id = 1`;
        await this.dbHelper.executeQuery(updateQuery, [allow ? 1 : 0]);
      }
    } catch (error) {
      console.error('Error al actualizar la configuración:', error);
    }
  }


  async getSettings() {
    const query = `SELECT * FROM settings WHERE id = 1`;
    try {
      const result = await this.dbHelper.fetchAll(query);

      if (result.length === 0) {
        return [{ id: 1, allowDeletion: 1 }];
      }

      return result;
    } catch (error) {
      console.error('Error al obtener la configuración:', error);
      return [{ id: 1, allowDeletion: 1 }];
    }
  }
}
