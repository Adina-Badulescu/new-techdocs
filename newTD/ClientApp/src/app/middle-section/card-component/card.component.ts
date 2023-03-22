import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { ComponentCommunicationService } from 'app/services/component-communication/component-com.service';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() Title?: string = "";
  @Input() Description?: string = "";
  @Input() Id?: string = "";
  
  constructor(private componentCommunicationService: ComponentCommunicationService,
    private router: Router) { }

  showOrder() {
    this.componentCommunicationService.sendFlag(false);
    this.router.navigate(
      ['/orders'],
      {
        queryParams: { order: this.Title, Id: this.Id }
      }

    );

  }

  ngOnInit(): void {
  }

}
