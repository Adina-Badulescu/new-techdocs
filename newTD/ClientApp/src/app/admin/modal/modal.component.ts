import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentCommunicationService } from 'app/services/component-communication/component-com.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  
  isOpen: boolean = false;
  private element: HTMLElement;

  constructor(private el: ElementRef, private componentComm: ComponentCommunicationService) { 
    this.element = el.nativeElement;
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }

  ngOnInit(): void {
    document.body.appendChild(this.element);
          this.close();
  }

  ngOnDestroy() {    
    this.element.remove();
  }

}
