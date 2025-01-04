import { Component} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonFabButton, IonFab, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { settings, add } from 'ionicons/icons';
import {addIcons} from "ionicons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonFabButton, IonFab, IonButtons],
})
export class HomePage {
  randomQuote = { text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'Franklin D. Roosevelt' };

  constructor(private router: Router) {
    addIcons({ settings, add });
  }

  navigateToManageQuotes() {
    this.router.navigate(['/manage-quotes']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
}
