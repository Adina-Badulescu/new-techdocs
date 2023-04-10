import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TemplatesContainerComponent } from './middle-section/templates-container/templates-container.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { routes } from './routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { SpinnerInterceptor } from './services/spinner/spinner-interceptor.service';
import { CardComponent } from './middle-section/card-component/card.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NavbarComponent } from './home/navbar/navbar.component';
import { LoginComponent } from './home/navbar/login/login.component';
import { RegisterComponent } from './home/navbar/register/register.component';
import { JwtInterceptor } from './services/jwt/jwt.interceptor';
// import { ErrorInterceptor } from './services/error-interceptor.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TemplatesContainerComponent,
    CarouselComponent,
    NotFoundComponent,
    CardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    // FontAwesomeModule,
    ReactiveFormsModule,
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
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

