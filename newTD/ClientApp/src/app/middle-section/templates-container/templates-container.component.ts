import { Component, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend.service';
import { ICard } from '../card-component/ICard.interface';


@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit {


  constructor(private backendService: BackendService) {  }

  cardsArray: ICard[] = [];


  ngOnInit(): void {
    this.backendService.listTemplates()
    .subscribe(cardData => this.cardsArray = cardData);
  }
}
