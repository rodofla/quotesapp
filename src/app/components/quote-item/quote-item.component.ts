import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-quote-item',
  templateUrl: './quote-item.component.html',
  styleUrls: ['./quote-item.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class QuoteItemComponent {
  // Agrega los íconos necesarios al constructor
  constructor() {
    addIcons({ trash });
  }

  // Input para recibir la cita
  @Input() quote!: { id: number; quote: string; author: string };

  // Input para habilitar/deshabilitar la eliminación
  @Input() allowDeletion = true;

  // Evento para emitir cuando se desea eliminar una cita
  @Output() delete = new EventEmitter<number>();

  // Método para emitir el evento de eliminación
  deleteQuote() {
    if (this.allowDeletion) {
      this.delete.emit(this.quote.id); // Emitir el ID de la cita
    }
  }
}


