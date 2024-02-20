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
  @Input() entries: Entry[] = [];
  entryService = inject(EntryService);
  id: number = 0;
  entry: Entry = {
    id: this.id,
    title: null,
    total: null,
    unit: "m2",
    calculationString: "",
  }
  errorTitle: string | null = null;
  errorTotal: string | null = null;
  keyPads = ["(", ")", "AC", "+", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "="];
  units = ["m2", "m3", "u", "l"];

  updateCalculations(key: string | number) {
    if (key === "=") {
      if (this.entry.calculationString.includes('x')) {
        this.entry.calculationString = this.entry.calculationString.replace('x', '*');
      }
      this.entry.total = eval(this.entry.calculationString);
      console.log(this.entry);
    } else if (key === "AC") {
      this.entry.calculationString = "";
      this.entry.total = 0;
    }
    else {
      this.entry.calculationString = this.entry.calculationString + key;
    }
  }

  resetErrors() {
    this.errorTitle = null;
    this.errorTotal = null;
  }

  resetEntry() {
    this.entry = {
      id: this.id,
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
      if (this.entries.filter((entry: Entry) => this.entry.id === entry.id).length > 0) {
        const index = this.entries.findIndex((entry: Entry) => entry.id === this.entry.id);
        this.entries.splice(index, 1);
      }
    this.entries.push(this.entry);
    this.id++;
    this.entryService.setStoredEntries(this.entries);
    this.entryService.removeSelectedInventory();
    this.resetEntry();
    this.resetErrors();
  }

  ngOnInit() {
    this.entryService.selectedInventory$.subscribe((entry: Entry | null) => {
      if (entry) {
        this.entry = entry;
      }
    });
    this.entryService.entries$.subscribe((entries: Entry[]) => {
      if (entries.length > 0) {
        this.entries = entries;
      } else {
        this.entries = this.entryService.getStoredEntries();
      }
    });  
  }

}
