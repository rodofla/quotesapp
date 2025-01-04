import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotes = [
    { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
    { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
  ];

  getQuotes() {
    return [...this.quotes];
  }

  addQuote(text: string, author: string) {
    this.quotes.push({ text, author });
  }

  removeQuote(index: number) {
    this.quotes.splice(index, 1);
  }
}
