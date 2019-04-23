import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  input: string;

  @Input()
  disabled: boolean;

  @Input()
  placeholder: string;

  @Output('onSubmit') 
  searchInput = new EventEmitter<string>(); 
  
  constructor() { }

  ngOnInit() {
  }

  search() {
    this.searchInput.emit(this.input);
  }
}
