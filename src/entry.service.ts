import { Injectable } from '@angular/core';
import { Entry } from './interfaces/entry_interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  selectedInventory: Entry | null = null;
  entries: Entry[] = [];
  entries$ = new BehaviorSubject<Entry[]>([]);
  selectedInventory$ = new BehaviorSubject<Entry | null>(null);
  getStoredEntries() {
    let storedEntries = localStorage.getItem('Entries');
    if (storedEntries) {
      this.entries = JSON.parse(storedEntries);
      this.entries$.next(this.entries);
      return this.entries;
    } 
    return [];  
  }

  setStoredEntries(entries: any) {
    localStorage.setItem('Entries', JSON.stringify(entries));
    this.entries = entries;
    this.entries$.next(this.entries);
  }

  getSelectedInventory() {
    let selectedInventory = localStorage.getItem('selectedInventory');
    if (selectedInventory) {
      this.selectedInventory = JSON.parse(selectedInventory);
      if (!this.selectedInventory?.calculationString) {
        this.selectedInventory!.calculationString = "";
      }
      this.selectedInventory$.next(this.selectedInventory);
      return this.selectedInventory;
    }
    return null;
  }

  setSelectedInventory(entry: any) {
    localStorage.setItem('selectedInventory', JSON.stringify(entry));
    this.selectedInventory = entry;
    this.selectedInventory$.next(this.selectedInventory);
  }

  removeSelectedInventory() {
    this.selectedInventory = null;
    this.selectedInventory$.next(this.selectedInventory);
    localStorage.removeItem('selectedInventory');
  }
}
