import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
import { HttpService } from './common_services/http.service';
import { DataService } from './common_services/data.service';

@NgModule({
  declarations: [
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // HeaderComponen
    // FooterComponent
  ],
  providers: [
    HttpService,
    DataService
  ]
})
export class SharedModule { }
