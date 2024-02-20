import { Component, Input, inject } from '@angular/core';
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
  entries: Entry[] = [];
  entryService = inject(EntryService);
  entry: Entry = {
    id: 0,
    title: null,
    total: null,
    unit: "m2",
    calculationString: "",
  };
  errorTitle: string | null = null;
  errorTotal: string | null = null;
  keyPads = ["(", ")", "AC", "+", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "="];
  units = ["m2", "m3", "u", "l"];
  regexSymbols = /[+\-x/\.]/;
  regexDecimalNumbers = /^.*(\d\.\d)$/;

  updateCalculations(key: string | number) {
    if (key === "=") {
      if (this.lastCharIsSymbol()) {
        this.entry.calculationString = this.entry.calculationString.slice(0, -1);
      }
      this.entry.total = eval(this.entry.calculationString.replace('x', '*')).toFixed(2);
    } else if (key === "AC") {
      this.entry.calculationString = "";
      this.entry.total = 0;
    }
    else {
      if (this.regexDecimalNumbers.test(this.entry.calculationString) && key === ".") {
        return;
      }

      if ((this.inputIsSymbol(key) && this.lastCharIsSymbol())) {
          this.entry.calculationString = this.entry.calculationString.slice(0, -1);
      }
      this.entry.calculationString = this.entry.calculationString + key;
    }
  }

  inputIsSymbol(key: string | number) {
    return this.regexSymbols.test(key.toString());
  }

  lastCharIsSymbol() {
    const lastChar = this.entry.calculationString[this.entry.calculationString.length - 1];
    return this.regexSymbols.test(lastChar);
  }

  resetErrors() {
    this.errorTitle = null;
    this.errorTotal = null;
  }

  resetEntry() {
    this.entry = {
      id: 0,
      title: null,
      total: null,
      unit: "m2",
      calculationString: ""
    }
  }

  addEntry() {
    this.resetErrors();
    if (!this.entry.title) {
      this.errorTitle = "Un titre est requis";
    }
    if (!this.entry.total) {
      this.errorTotal = "Un total est requis";
    }
    if (this.errorTitle || this.errorTotal) {
      return;
    }
    const entryIndex = this.entries.findIndex((entry: Entry) => entry.id === this.entry.id);
    if (entryIndex !== -1) {
      this.entries[entryIndex] = this.entry;
    }
    else {
      this.entry.id = this.entries.length + 1;
      this.entries.push(this.entry);
    }
    this.entryService.setStoredEntries(this.entries);
    this.entryService.removeSelectedInventory();
    this.resetEntry();
    this.resetErrors();
  }

  ngOnInit() {
    this.entries = this.entryService.getStoredEntries();
    this.entryService.selectedInventory$.subscribe((entry: Entry | null) => {
      if (entry) {
        this.entry = entry;
      } else {
        
      }
    });
    this.entryService.entries$.subscribe((entries: Entry[]) => {
        this.entries = entries;
    });  
  }
}
