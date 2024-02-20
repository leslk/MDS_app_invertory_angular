import { Component, inject } from '@angular/core';
import { Entry } from '../../interfaces/entry_interface'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntryService } from '../../entry.service';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss'
})

export class EntryComponent {
  entryService = inject(EntryService);
  id: number = 0;
  entry: Entry = {
    id: this.id,
    title: "",
    total: 0,
    unit: "m2",
    calculationString: ""
  }
  keyPads = ["(", ")", "AC", "+", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "="];
  units = ["m2", "m3", "u", "l"];
  entries: Entry[] = [];

  updateCalculations(key: string | number) {
    if (key === "=") {
      if (this.entry.calculationString.includes('x')) {
        this.entry.calculationString = this.entry.calculationString.replace('x', '*');
      }
      this.entry.total = eval(this.entry.calculationString);
    } else if (key === "AC") {
      this.entry.calculationString = "";
      this.entry.total = 0;
    }
    else {
      this.entry.calculationString = this.entry.calculationString + key;
    }
  }

  addEntry() {
    const storedEntries = this.entryService.getStoredEntries();
    const selectedInventory = this.entryService.getSelectedInventory();
    if (storedEntries.length > 0  && selectedInventory) {
      if (storedEntries.filter((entry: Entry) => selectedInventory.id === entry.id).length > 0) {
        const index = this.entries.findIndex((entry: Entry) => entry.id === selectedInventory.id);
        this.entries.splice(index, 1);
      }
    }
    this.entries.push(this.entry);
    this.id++;
    this.entryService.setStoredEntries(this.entries);
    this.entryService.removeSelectedInventory();
    this.entry = {
      id: this.id,
      title: "",
      total: 0,
      unit: "m2",
      calculationString: ""
    }
  }

  ngOnInit() {
    this.entries = this.entryService.getStoredEntries();
     const selectedInventory = this.entryService.getSelectedInventory();
    if (selectedInventory) {
      this.entry = selectedInventory;
    }
  }

}
