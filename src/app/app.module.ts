import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { BodyRendererComponent } from './body-renderer/body-renderer.component';
import { ClotheItemRendererComponent } from './clothe-item-renderer/clothe-item-renderer.component';
import { ClotheDetailComponent } from './clothe-detail/clothe-detail.component';
import { OutfitContainerComponent } from './outfit-container/outfit-container.component';
import {BoardService} from "./app.service";
import { FormComponentComponent } from './form-component/form-component.component';


@NgModule({
  declarations: [
    AppComponent,
    BodyRendererComponent,
    ClotheItemRendererComponent,
    ClotheDetailComponent,
    OutfitContainerComponent,
    FormComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
