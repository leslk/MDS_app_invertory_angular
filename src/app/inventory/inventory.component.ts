import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { Entry } from '../../interfaces/entry_interface'
import { EntryService } from '../../entry.service';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  entryService = inject(EntryService);
  entries: Entry[] = [];
  @Output() setSelectedInventory = new EventEmitter();


  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvData = e.target.result;
        const arrayObjects = this.csvToArrayOfObjects(csvData);
        this.entryService.setStoredEntries(arrayObjects);
      };
      reader.readAsText(file);
    }
  }

  csvToArrayOfObjects(csvData: string) {
    const lines = csvData.split("\n");
    const result: any = [];
    const headers: string[] = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      const entry: any = {};
      const currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
      entry[headers[j]] = currentline[j];
      }
      result.push(entry);
    }
    return result;

  }
  createCSVString() {
    let csvData = "id,title,total,unit";
    this.entries.forEach((entry: Entry) => {
      csvData += "\n" + entry.id + "," + entry.title + "," + entry.total + "," + entry.unit;
    });
    const encodeURi = encodeURI(csvData);
    const a = document.createElement('a');
    a.href = 'data:attachment/csv,' + encodeURi;
    a.download = 'inventory.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  protected _setSelectedInventory(entry: Entry) {
    this.setSelectedInventory.emit();
    this.entryService.setSelectedInventory(entry);
  }

  ngOnInit() {
    this.entryService.entries$.subscribe((entries: Entry[]) => {
      if (entries.length > 0) {
        this.entries = entries;     
      } else {
        this.entries = this.entryService.getStoredEntries();
      }
    });
  }

}
