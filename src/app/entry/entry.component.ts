import { Component } from '@angular/core';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss'
})
export class EntryComponent {
  title = "";
  calculation = "";
  keyPads = ["(", ")", "AC", "+", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "/", 0, ".", "="];
  units = ["m2", "m3", "u", "l"]

}
