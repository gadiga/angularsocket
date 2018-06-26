import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css']
})
export class SubListComponent implements OnInit {

  @Input('list') subList;
  @Input('holder') parent;
  constructor() { }

  ngOnInit() {
  }

}
