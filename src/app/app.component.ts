import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationStart } from '@angular/router';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { ComponentCommunicationService } from './services/component-com.service'
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Techdocs-app';  
  hide: boolean = true;
  navigationBackSubscription: Subscription = new Subscription();
  showHideSubscription: Subscription = new Subscription();



  constructor(private route: ActivatedRoute, 
    private componentCommunicationService: ComponentCommunicationService,
    ) {


  }

  sendInfo() {
    this.componentCommunicationService.sendFlag(true);
  }

  ngOnInit() {
    this.navigationBackSubscription = fromEvent(window, 'popstate').subscribe((e) => {
      if (e.type === 'popstate') {
        this.hide = true;
      } else { this.hide = false }
    });
    this.showHideSubscription = this.componentCommunicationService.showHideSubject$.subscribe(hideAppComponentView => this.hide = hideAppComponentView);
  }

  ngOnDestroy(): void {
    this.navigationBackSubscription.unsubscribe();
    this.showHideSubscription.unsubscribe();
  }


}
