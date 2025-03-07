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
  constructor() {
    addIcons({ trash });
  }

  @Input() quote!: { id: number; quote: string; author: string };

  @Input() allowDeletion = true;

  @Output() delete = new EventEmitter<number>();

  deleteQuote() {
    if (this.allowDeletion) {
      this.delete.emit(this.quote.id);
    }
  }
}


