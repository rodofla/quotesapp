import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { SQLiteHelper } from '../database/sqlite.helper';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {

  private dbHelper: SQLiteHelper;
  private dbName: string = 'quotes.db';
  private tableSQL: string = `
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY NOT NULL,
      quote TEXT NOT NULL,
      author TEXT NOT NULL
    );
  `;



  constructor() {
    this.dbHelper = new SQLiteHelper();
  }

  async initializeDatabase() {
    try {
      // Inicializa la base de datos con la tabla "quotes"
      await this.dbHelper.initializeDatabase(
        this.dbName,
        1,
        'no-encryption',
        false,
        false,
        this.tableSQL
      );
      console.log('Base de datos inicializada para quotes.');
    } catch (error) {
      console.error('Error inicializando la base de datos de quotes:', error);
    }
  }



  async getQuotes() {
    const query = `SELECT * FROM quotes`;
    return await this.dbHelper.fetchAll(query);
  }

  async addQuote(quote: string, author: string) {
    const query = `INSERT INTO quotes (quote, author) VALUES (?, ?)`;
    await this.dbHelper.executeQuery(query, [quote, author]);
  }

  async removeQuote(index: number) {
    const query = `DELETE FROM quotes WHERE id = ?`;
    try {
      await this.dbHelper.executeQuery(query, [index]);
      console.log(`Quote con ID ${index} eliminada exitosamente.`);
    } catch (error) {
      console.error(`Error al eliminar la quote con ID ${index}:`, error);
    }
  }


  async getRandomQuote() {
    const query = `SELECT * FROM quotes`;
    try {
      const quotes = await this.dbHelper.fetchAll(query);

      if (quotes.length === 0) {
        return { quote: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' };
      }

      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    } catch (error) {
      console.error('Error al obtener una cita aleatoria:', error);
      return null;
    }
  }

}
