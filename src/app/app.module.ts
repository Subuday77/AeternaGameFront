import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapSetupComponent } from './components/map-setup/map-setup.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { GameFlowComponent } from './components/game-flow/game-flow.component';
import { SwapSideComponent } from './components/swap-side/swap-side.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    MapSetupComponent,
    GameFlowComponent,
    SwapSideComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxSpinnerModule,
    TextareaAutosizeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
