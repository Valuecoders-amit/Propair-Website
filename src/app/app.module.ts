import { BrowserModule } from "@angular/platform-browser";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { ToasterModule } from "angular2-toaster";
import { RequestInterceptor } from "./lib/interceptors/request.inetrceptor";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./lib/auth/auth.guard";
import { StudentGuard } from './lib/auth/student.guard';
import { AdvisorGuard} from "./lib/auth/advisor.guard";

import { NgxSpinnerModule } from "ngx-spinner";
import { OwlModule } from "ngx-owl-carousel";
import { ModalModule } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';



// import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { NgxStepperModule } from 'ngx-stepper';
// import { ScrollPercentageDirective } from '../app/lib/Directives/scroll-percentage-directives.';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RequestDetailComponent } from './advsior-dashboard/student-request/request-detail/request-detail.component';




@NgModule({
  declarations: [AppComponent, NotFoundComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    OwlModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
   

    
  ],
  providers: [
    DatePipe,
    AuthGuard,
    StudentGuard,
    AdvisorGuard,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
