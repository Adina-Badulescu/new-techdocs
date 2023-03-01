import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TemplatesContainerComponent } from './middle-section/templates-container/templates-container.component';
import { CarouselComponent } from './carousel/carousel.component';
import { routes } from './routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { SpinnerInterceptor } from './services/spinner-interceptor.service';
import { CardComponent } from './middle-section/card-component/card.component';
import { HomeComponent } from './home/home.component';
// import { ErrorInterceptor } from './services/error-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplatesContainerComponent,
    CarouselComponent,
    NotFoundComponent,
    CardComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

