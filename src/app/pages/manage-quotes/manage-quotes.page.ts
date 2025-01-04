import { Component } from '@angular/core';
import { QuotesService } from '@services/quotes.service';
import { QuoteItemComponent } from '@components/quote-item/quote-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonButtons, IonToolbar, IonBackButton, IonTitle, IonContent, IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonIcon, IonList, IonInput } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-quotes',
  templateUrl: './manage-quotes.page.html',
  styleUrls: ['./manage-quotes.page.scss'],
  imports: [IonCardHeader, IonBackButton, IonButtons, IonHeader, CommonModule, FormsModule, QuoteItemComponent, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonIcon, IonList, IonInput],
  standalone: true,
})
export class ManageQuotesPage {
  quotes = this.quotesService.getQuotes();
  newQuote = { text: '', author: '' };
  allowDeletion = true;

  constructor(private quotesService: QuotesService, private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.allowDeletion = state?.['allowDeletion'] ?? true;
  }

  addQuote() {
    if (this.newQuote.text && this.newQuote.author) {
      this.quotesService.addQuote(this.newQuote.text, this.newQuote.author);
      this.newQuote = { text: '', author: '' }; // Clear input fields
      this.quotes = this.quotesService.getQuotes();
    }
  }

  removeQuote(index: number) {
    if (this.allowDeletion) {
      this.quotesService.removeQuote(index);
      this.quotes = this.quotesService.getQuotes();
    }
  }
}
