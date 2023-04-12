import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentCommunicationService } from 'app/services/component-communication/component-com.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  
    private element: HTMLElement;

  constructor(private el: ElementRef, private componentComm: ComponentCommunicationService) { 
    this.element = el.nativeElement;
  }

  open(flag: boolean) {    
    if (flag === true) {
      console.log(flag);                
      this.element.style.display = 'block';
      document.body.classList.add('jw-modal-open');      
    }
    return;    
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.componentComm.sendFlag(false);    
  }

  ngOnInit(): void {
    this.componentComm.showHideSubject$.subscribe(showModal => this.open(showModal));
    document.body.appendChild(this.element);
    this.close();
  }

  ngOnDestroy() {    
    this.element.remove();
  }

}
