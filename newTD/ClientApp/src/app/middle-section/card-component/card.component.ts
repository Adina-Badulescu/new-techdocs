import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() Title: string = "";
  @Input() Description: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
