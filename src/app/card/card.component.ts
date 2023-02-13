import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Faker } from '@faker-js/faker/faker';
import { Router } from '@angular/router';

import { ComponentCommunicationService } from '../services/component-com.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  constructor(private componentCommunicationService: ComponentCommunicationService, private router: Router) {

  }

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
    
  }
}
