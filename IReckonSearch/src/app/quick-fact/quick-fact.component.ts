import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quick-fact',
  templateUrl: './quick-fact.component.html',
  styleUrls: ['./quick-fact.component.scss']
})
export class QuickFactComponent implements OnInit {

  @Input()
  iconColor: string;
  
  @Input()
  title: string;

  @Input()
  icon: string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
