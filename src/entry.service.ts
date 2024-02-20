import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  getStoredEntries() {
    let storedEntries = localStorage.getItem('Entries');
    if (storedEntries) {
      return JSON.parse(storedEntries);
    } 
    return [];  
  }

  setStoredEntries(entries: any) {
    localStorage.setItem('Entries', JSON.stringify(entries));
  }

  getSelectedInventory() {
    let selectedInventory = localStorage.getItem('selectedInventory');
    if (selectedInventory) {
      return JSON.parse(selectedInventory);
    }
    return null;
  }

  setSelectedInventory(entry: any) {
    localStorage.setItem('selectedInventory', JSON.stringify(entry));
  }

  removeSelectedInventory() {
    localStorage.removeItem('selectedInventory');
  }
}
