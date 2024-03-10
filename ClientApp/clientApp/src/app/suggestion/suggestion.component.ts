import { Suggestion } from './../Models/event';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  @Input() suggestion!: Suggestion

}
