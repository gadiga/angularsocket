import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  @Input() dataList;
  
  constructor() { }

  ngOnInit() {
  }

}
