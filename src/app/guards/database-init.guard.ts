import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuotesService } from '@services/quotes.service';
import { SettingsService } from '@services/settings.service';

export const databaseInitGuard: CanActivateFn = async () => {
  const quotesService = inject(QuotesService);
  const settingsService = inject(SettingsService);

  try {
    console.log('Inicializando la base de datos...');

    // Inicializar las bases de datos
    await quotesService.initializeDatabase();
    await settingsService.initializeDatabase();

    // Verificar y agregar cita predeterminada si es necesario
    const quotes = await quotesService.getQuotes();
    if (quotes.length === 0) {
      await quotesService.addQuote(
        'In the middle of difficulty lies opportunity.',
        'Albert Einstein'
      );
    }

    console.log('Base de datos inicializada correctamente.');
    return true; // Permitir acceso
  } catch (error) {
    console.error('Error inicializando la base de datos:', error);
    return false; // Bloquear acceso si algo falla
  }
};
