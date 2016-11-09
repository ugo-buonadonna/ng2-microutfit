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
import { FormComponentComponent } from './form-component/form-component.component';

import {AppState, default as reducer} from './reducers/rootReducer';
import {Store, StoreEnhancer, compose, createStore}  from 'redux';
import {AppStore} from './store/appStore';
import {BoardService} from './board-service/board.service';


let devtools: StoreEnhancer<AppState> =
    window['devToolsExtension'] ?
        window['devToolsExtension']() : f => f;


let store: Store<AppState> = createStore<AppState>(
    reducer,
    compose(devtools)
);



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
  providers: [BoardService,
      { provide: AppStore, useFactory: () => store }],
  bootstrap: [AppComponent]
})
export class AppModule {

}


