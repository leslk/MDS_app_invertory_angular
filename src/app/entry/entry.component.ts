import { Component } from '@angular/core';
import { Entry } from '../../interfaces/entry_interface'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss'
})

export class EntryComponent {
  id: number = 0;
  entry: Entry = {
    id: this.id,
    title: "",
    totalCalculation: 0,
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
      this.entry.totalCalculation= eval(this.entry.calculationString);
    } else if (key === "AC") {
      this.entry.calculationString = "";
    }
    else {
      this.entry.calculationString = this.entry.calculationString + key;
    }
  }

  addEntry() {
    const storedEntries = localStorage.getItem('Entries');
    const selectedInventory = localStorage.getItem('selectedInventory');
    if (storedEntries && selectedInventory) {
      let parsedSelectedInventory = JSON.parse(selectedInventory);
      let parsedEntries = JSON.parse(storedEntries);
      if (parsedEntries.filter((entry: Entry) => parsedSelectedInventory.id === entry.id).length > 0) {
        const index = this.entries.findIndex((entry: Entry) => entry.id === parsedSelectedInventory.id);
        this.entries.splice(index, 1);
      }
      this.entries.push(this.entry);
      this.id++;
      localStorage.setItem('Entries', JSON.stringify(this.entries));
      this.entry = {
        id: this.id,
        title: "",
        totalCalculation: 0,
        unit: "m2",
        calculationString: ""
      }
    }
  }

  ngOnInit() {
    let entries = localStorage.getItem('Entries');
    if (entries) {
      this.entries = JSON.parse(entries);
    }
    let selectedInventory = localStorage.getItem('selectedInventory');
    if (selectedInventory) {
      this.entry = JSON.parse(selectedInventory);
    }
  }

}
