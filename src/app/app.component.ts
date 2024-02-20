import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { InventoryComponent } from './inventory/inventory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EntryComponent, InventoryComponent],
  template: `
    <header>
      <nav>
        <button><a routerLink="/entry" routerLinkActive="active" (click)="setTypeOfView('entry')">Saisie</a></button>
        <button><a routerLink="/inventory" routerLinkActive="active" (click)="setTypeOfView('inventory')" >Inventaire</a></button>
      </nav>
      @if (typeOfView === "entry") {
        <app-entry></app-entry>
      }
      @else {
        <app-inventory></app-inventory>
      }
    
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app_inventory';
  typeOfView = "entry";

  setTypeOfView(type: string) {
    this.typeOfView = type;
  }
}
