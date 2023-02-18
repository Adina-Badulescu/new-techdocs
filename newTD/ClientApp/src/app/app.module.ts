import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { routes } from './routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
//import { WhoisService } from './services/whois.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CarouselComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

