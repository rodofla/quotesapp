import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonFabButton,
  IonFab,
  IonButtons,
} from '@ionic/angular/standalone';
import { settings, add } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { QuotesService } from '@services/quotes.service';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonFabButton,
    IonFab,
    IonButtons,
    RouterModule,
  ],
  standalone: true,
})
export class HomePage implements OnInit {
  randomQuote = { quote: '', author: '' };

  constructor(private quotesService: QuotesService) {
      addIcons({settings,add});}

      async ngOnInit() {
        try {
          await this.loadRandomQuote();
        } catch (error) {
          console.error('Error during initialization:', error);
        }
      }

  async loadRandomQuote() {
    const quote = await this.quotesService.getRandomQuote();
    if (quote) {
      this.randomQuote = quote;
    } else {
      console.warn('No se pudo cargar una cita.');
    }
  }
}

