import {Injectable, Inject}     from '@angular/core';
import {RequestOptions, Headers, Response, Http} from '@angular/http';
import {AppStore} from '../store/appStore';
import * as OutfitActions from '../actions/OutfitActions';
import {Outfit} from '../models/outfit.model';

@Injectable()
export class BoardService {
    // URL to web API

  constructor(public http: Http, @Inject(AppStore) private store: any ) {
  }

  getBoard(): void {
    let headers: Headers = new Headers();
    headers.append('X-API-TOKEN', 'ng-book');
    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
      this.http.request('http://localhost:3000/api/outfits/public')
          .subscribe((res: Response) => {
              let outfits: Outfit[] = res.json().outfits;
              outfits.map( o => this.store.dispatch(OutfitActions.addOutfit(o)));
          });
  }

}
