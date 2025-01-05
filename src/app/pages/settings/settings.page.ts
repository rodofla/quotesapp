import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonToggle,
    IonButtons,
    IonBackButton,
  ],
})
export class SettingsPage implements OnInit {
  allowDeletion = true; // Valor predeterminado

  constructor(private settingsService: SettingsService) {}

  async ngOnInit() {
    try {
      const settings = await this.settingsService.getSettings();
      console.log('Config settings:', settings);

      // Usar el valor de la base de datos si existe
      if (settings.length > 0) {
        this.allowDeletion = !!settings[0].allowDeletion; // Convertir a booleano
      } else {
        console.warn('No se encontró configuración en la base de datos. Usando valor predeterminado.');
      }
    } catch (error) {
      console.error('Error al cargar la configuración inicial:', error);
    }
  }

  async toggleAllowDeletion() {
    try {
      console.log('este es el valor:', this.allowDeletion);
      await this.settingsService.updateAllowDeletion(this.allowDeletion);
      console.log('Configuración actualizada:', this.allowDeletion);
    } catch (error) {
      console.error('Error al actualizar la configuración:', error);
    }
  }
}
