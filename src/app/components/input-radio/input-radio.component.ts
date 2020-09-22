import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent implements OnInit {

  @Input() options: any;
  @Output() action = new EventEmitter<any>();

  customValue: any;

  constructor() { }

  ngOnInit(): void {
  }

  selectRadio(radio: any) {
    if (radio.selected) return;
    this.options.find(radio => radio.selected && (radio.selected = false));
    radio.selected = !radio.selected;
    this.action.emit(radio);
  }
}
