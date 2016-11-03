import { Component } from '@angular/core';
import {Http, Response, Jsonp, RequestOptionsArgs, Headers, Request} from '@angular/http';
import { Outfit } from './outfit-model/outfit.model';
import { OnInit } from '@angular/core';
import { BoardService} from './app.service'
let XML2json = require('./xml2json.min.js');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Object;
  outfits: Outfit[];
  x2js: any;
  board: any;
  requestFired: boolean;

  constructor(public http: Http, private jsonp: Jsonp, private boardService: BoardService) {
    this.requestFired = false;
  this.x2js = new XML2json();
  };

  getBoard() {
    this.boardService.getBoard().then( res => this.outfits = res);
  }

  ngOnInit(): void {
  }

  makeRequest(): void {
    this.requestFired = true;
    this.getBoard();
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
