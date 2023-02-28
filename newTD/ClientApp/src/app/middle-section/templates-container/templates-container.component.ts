import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Router } from '@angular/router';


import { ComponentCommunicationService } from '../../services/component-com.service'
import { BackendService } from 'app/services/backend.service';
import { ICard } from '../card-component/ICard.interface';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit {


  constructor(private componentCommunicationService: ComponentCommunicationService,
    private router: Router,
    private backendService: BackendService) {
      // this.backendService.listTemplates()
      // .subscribe(cardsObjects => this.cardsDataArray.push(cardsObjects));
      this.backendService.listTemplates()
      .subscribe(x => this.cardsArray = x)
      
      // .pipe(map(v => this.cardsArray))
      // .subscribe(y => console.log("DATA from Db: " + JSON.stringify(y)))
  }

  // cardsData:
  cardsArray:any = [];

  // showOrderForm: boolean = false;
  cards = new Array(9).fill(null).map(() => {
    return {
      avatar: faker.image.image(),
      title: faker.company.name(),
      description: faker.lorem.lines()
    };
  });
  showOrder() {
    this.componentCommunicationService.sendFlag(false);
    this.router.navigate(['/orders']);


  }


  ngOnInit(): void {
    // this.backendService.listTemplates().subscribe(x => console.log("DATA from Db: " + JSON.stringify(x)));

  }
}
