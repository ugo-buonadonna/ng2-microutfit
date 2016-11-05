import {Injectable}     from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {Outfit}         from '../outfit-model/outfit.model';

@Injectable()
export class BoardService {
    // URL to web API

  constructor() {
  }

  getBoard(): any {
    let headers: Headers = new Headers();
    headers.append('X-API-TOKEN', 'ng-book');
    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    return Promise.resolve([
      new Outfit({
        season: 'summer',
        year: 2016,
        clothes: Array(3).fill('hat'),
        name: 'Il furbo',
        imageURL: 'assets/outfit1.jpg'
      }),
      new Outfit({
        season: 'winter',
        year: 2016,
        clothes: Array(3).fill('capo'),
        name: 'Il modaiolo',
        imageURL: 'assets/outfit2.jpg'
      }),
      new Outfit({
        season: 'spring',
        year: 2016,
        clothes: Array(3).fill('capo'),
        name: 'Zante',
        imageURL: 'assets/outfit3.jpg'
      })
    ]);
  }

}
