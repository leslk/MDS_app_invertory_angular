import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { EntryService } from '../entry.service';
import { InventoryComponent } from './inventory/inventory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EntryComponent, InventoryComponent],
  template: `
    @if (!isTabletDevice) {
      <header>
        <nav>
          <button class="header-button" (click)="setTypeOfView('entry')">Saisie</button>
          <button class="header-button" (click)="setTypeOfView('inventory')">Inventaire</button>
        </nav>
      </header>
      @if (typeOfView === "entry") {
        <app-entry></app-entry>
      }
      @else {
        <app-inventory (setSelectedInventory)="setTypeOfView('entry')"></app-inventory>
      }
    }
    @else {
      <div class="tablet-view">
        <app-entry></app-entry>
        <app-inventory></app-inventory>
      </div> 
    }
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    this.checkScreenSize(window.innerWidth);
  }
  entryService = inject(EntryService);
  title = 'app_inventory';
  typeOfView = "entry";
  isTabletDevice = false;

  setTypeOfView(type: string) {
    this.typeOfView = type;
  }

  getEntries() {
    return this.entryService.getStoredEntries();
  }

  getSelectedInventory() {
    return this.entryService.getSelectedInventory();
  }

  checkScreenSize(width: number) {
    if (width >= 768) {
      this.isTabletDevice = true;
    }
    else {
      this.isTabletDevice = false;
    }
  }

  @HostListener('window:resize', ['$event']) 
    onResize(event: any) {
      this.checkScreenSize(event.target.innerWidth);
    }
  
    ngAfterViewInit() {
      this.checkScreenSize(window.innerWidth);
    }
}
