import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Faker } from '@faker-js/faker/faker';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  

  users = new Array(10).fill(null).map(() => {
    return {     
      avatar: faker.image.image(),
      title: faker.company.name(),
      description: faker.lorem.lines()
    };
  });



  ngOnInit(): void {
    // console.log(this.users)
  }
}
