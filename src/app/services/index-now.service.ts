import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface IndexNowRequest {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

@Injectable({
  providedIn: 'root'
})
export class IndexNowService {
  private readonly INDEX_NOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
  private readonly API_KEY = 'e6361573d6214698bda221ec1950ef0e';

  // Use the actual domain once deployed, fallback to localhost for development
  private readonly HOST = typeof window !== 'undefined' ? window.location.hostname : 'naveenweb.site'; 
  private readonly KEY_LOCATION = `https://${this.HOST}/${this.API_KEY}.txt`;

  constructor(private http: HttpClient) {}

  /**
   * Submit a single URL to IndexNow via GET request.
   * Format: https://<searchengine>/indexnow?url=url-changed&key=your-key
   * Note: The standard IndexNow API prefers the POST method for multiple parameters (like keyLocation), 
   * but GET is supported for simplest single URL submissions.
   */
  submitSingleUrl(url: string): Observable<boolean> {
    const encodedUrl = encodeURIComponent(url);
    const getEndpoint = `${this.INDEX_NOW_ENDPOINT}?url=${encodedUrl}&key=${this.API_KEY}`;

    return this.http.get(getEndpoint, { observe: 'response', responseType: 'text' }).pipe(
      map(response => this.handleSuccess(response.status)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /**
   * Submit multiple URLs to IndexNow via POST request.
   */
  submitUrls(urls: string[]): Observable<boolean> {
    const payload: IndexNowRequest = {
      host: this.HOST,
      key: this.API_KEY,
      keyLocation: this.KEY_LOCATION,
      urlList: urls
    };

    return this.http.post(this.INDEX_NOW_ENDPOINT, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map(response => this.handleSuccess(response.status)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  /**
   * Helper method to notify search engine about content change
   * @param urls Array of URLs or single URL string
   */
  notifyContentChanged(urls: string | string[]): Observable<boolean> {
    const urlArray = Array.isArray(urls) ? urls : [urls];
    
    // Ensure URLs are absolute
    const absoluteUrls = urlArray.map(url => {
      // Basic check to see if it starts with http
      if (!url.startsWith('http')) {
        const origin = typeof window !== 'undefined' ? window.location.origin : `https://${this.HOST}`;
        return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
      }
      return url;
    });

    if (absoluteUrls.length === 1) {
      // You can also use submitSingleUrl, but submitUrls (POST) is safer and supports host/keyLocation parameters.
      // We will provide both as requested.
      return this.submitSingleUrl(absoluteUrls[0]);
    } else {
      return this.submitUrls(absoluteUrls);
    }
  }

  private handleSuccess(status: number): boolean {
    if (status === 200 || status === 202) {
      console.log('IndexNow Submission Successful: URL(s) successfully submitted.');
      return true;
    }
    console.warn(`IndexNow Submission returned unexpected status: ${status}`);
    return false;
  }

  private handleError(error: HttpErrorResponse): Observable<boolean> {
    const status = error.status;

    switch (status) {
      case 400:
        console.error('IndexNow Error 400 (Bad Request): Invalid format.', error.message);
        break;
      case 403:
        console.error('IndexNow Error 403 (Forbidden): Note: In case of key not valid (e.g. key not found, file found but key not in the file).', error.message);
        break;
      case 422:
        console.error('IndexNow Error 422 (Unprocessable Entity): Note: In case of URLs don\'t belong to the host or the key is not matching the schema in the protocol.', error.message);
        break;
      case 429:
        console.error('IndexNow Error 429 (Too Many Requests): Too Many Requests (potential Spam).', error.message);
        break;
      default:
        console.error(`IndexNow Error ${status}: Unexpected error occurred.`, error.message);
    }

    return of(false); // Do not break the app
  }
}
