import {Component, Inject} from '@angular/core';
import {Http} from '@angular/http';
import { Outfit } from './models/outfit.model';
import { OnInit } from '@angular/core';
import { BoardService} from './board-service/board.service';
import {AppState} from './reducers/rootReducer';
import {AppStore} from './store/appStore';
import {getOutfits} from './reducers/outfitReducer';
// import {Store} from "redux";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Object;
  outfits: Outfit[];
  board: any;
  requestFired: boolean;

  constructor(public http: Http, private boardService: BoardService, @Inject(AppStore) private store: any) {
      store.subscribe(() => this.updateState() );
    this.requestFired = false;
  };

    updateState() {
        let state = this.store.getState();
        this.outfits = getOutfits(state);
    }

  getBoard() {
    this.boardService.getBoard();
  }

  ngOnInit(): void {
  }

  makeRequest(): void {
    this.getBoard();
    this.requestFired = true;
  }


}

// Qua devo creare 1 outfit
// Gli outfit li prenderò da un database
// Boh penso che sia così





/*constructor () {
 this.outfits = [
 new Outfit({
 season: 'summer',
 year: 2016,
 clothes: Array(3).fill('hat'),
 name: 'Il furbo'
 }),
 new Outfit({
 season: 'winter',
 year: 2016,
 clothes: Array(3).fill('capo'),
 name: 'Il modaiolo'
 }),
 new Outfit({
 season: 'spring',
 year: 2016,
 clothes: Array(3).fill('capo'),
 name: 'Zante'
 })
 ]
 }*/
