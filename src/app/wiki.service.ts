import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  constructor(private http: HttpClient) {
  }

  searchWiki(text: string): Observable<any> {
    const wikiUrl = 'https://ru.wikipedia.org/w/api.php'
    const params = new HttpParams()
      .set('action', 'opensearch',)
      .set('format', 'json')
      .set('search', text)

    return this.http.jsonp(`${wikiUrl}?${params.toString()}`, 'callback').pipe(
      map((res: any) => {

        const l = res[1].length
        const result = []

        for (let i = 0; i < l; i++) {
          result.push({
            name: res[1][i],
            description: res[2][i],
            link: res[3][i]
          })
        }

        return result
      })
    )
  }
}
