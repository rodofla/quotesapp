import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle, IonButtons, IonBackButton} from "@ionic/angular/standalone";
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle, IonButtons, IonBackButton],
})
export class SettingsPage {
  allowDeletion = false;

  constructor(private router: Router) {}

  toggleAllowDeletion() {
    this.router.navigate(['/manage-quotes'], {
      state: { allowDeletion: this.allowDeletion },
    });
  }
}
