import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Entry } from '../../interfaces/entry_interface'
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  entries: Entry[] = [];
  @Output() setSelectedInventory = new EventEmitter();

  getStoredEntries() {
    let storedEntries = localStorage.getItem('Entries');
    if (storedEntries) {
      this.entries = JSON.parse(storedEntries);
    }
  }

  protected _setSelectedInventory(entry: Entry) {
    this.setSelectedInventory.emit();
    localStorage.setItem('selectedInventory', JSON.stringify(entry));
  }

  ngOnInit() {
    this.getStoredEntries();
  }

}
