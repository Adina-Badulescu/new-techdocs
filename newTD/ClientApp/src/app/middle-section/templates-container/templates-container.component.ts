import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from '../../services/component-com.service'
import { BackendService } from 'app/services/backend.service';
import { ICard } from '../card-component/ICard.interface';


@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit {


  constructor(private componentCommunicationService: ComponentCommunicationService,
    private router: Router,
    private backendService: BackendService) {



  }

  cardsArray: ICard[] = [];


  showOrder() {
    this.componentCommunicationService.sendFlag(false);
    this.router.navigate(['/orders']);


  }


  ngOnInit(): void {
    this.backendService.listTemplates()
    .subscribe(cardData => this.cardsArray = cardData);
  }
}
