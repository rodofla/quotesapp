import { Component } from '@angular/core';
import { QuotesService } from '@services/quotes.service';
import { SettingsService } from '@services/settings.service';
import { QuoteItemComponent } from '@components/quote-item/quote-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonList,
  IonInput,
  IonText,
} from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-manage-quotes',
  templateUrl: './manage-quotes.page.html',
  styleUrls: ['./manage-quotes.page.scss'],
  imports: [
    IonCardHeader,
    IonBackButton,
    IonButtons,
    IonHeader,
    CommonModule,
    FormsModule,
    QuoteItemComponent,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonList,
    IonInput,
    IonText,
  ],
  standalone: true,
})
export class ManageQuotesPage {
  quotes: any[] = [];
  newQuote = { quote: '', author: '' };
  allowDeletion = true;
  isLoading = true;
  formSubmitted = false;

  constructor(private quotesService: QuotesService, private settingsService: SettingsService,  private router: Router) {}

  async ngOnInit() {
    try {
      await this.loadAllowDeletion();
      await this.loadQuotes();
    } finally {
      this.isLoading = false;
    }
  }

  async loadAllowDeletion() {
    try {
      const settings = await this.settingsService.getSettings();
      this.allowDeletion = settings[0]?.allowDeletion === 1;
    } catch (error) {
      console.error('Error loading settings:', error);
      this.allowDeletion = true;
    }
  }

  async loadQuotes() {
    try {
      this.quotes = await this.quotesService.getQuotes();
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  }

  async addQuote(quoteInput: NgModel, authorInput: NgModel) {
    this.formSubmitted = true;

    if (!quoteInput.valid || !authorInput.valid) {
      return;
    }

    try {
      await this.quotesService.addQuote(this.newQuote.quote, this.newQuote.author);
      this.newQuote = { quote: '', author: '' };
      this.formSubmitted = false;
      quoteInput.reset();
      authorInput.reset();
      await this.loadQuotes();
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  }

  async removeQuote(index: number) {
    if (this.allowDeletion) {
      try {
        await this.quotesService.removeQuote(index);
        await this.loadQuotes();
      } catch (error) {
        console.error('Error removing quote:', error);
      }
    }
  }
}
