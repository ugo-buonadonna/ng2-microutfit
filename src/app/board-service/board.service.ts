import {Injectable}     from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Outfit}         from '../outfit-model/outfit.model'

@Injectable()
export class BoardService {
  private boardUrl = 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb&sort_order=best&phrase=hat';  // URL to web API

  constructor(private http: Http) {
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

  private static extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  private static handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
