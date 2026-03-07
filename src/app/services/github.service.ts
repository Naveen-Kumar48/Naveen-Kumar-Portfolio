import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';

export interface GithubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: { message: string }[];
    pull_request?: { title: string; html_url: string };
    issue?: { title: string; html_url: string };
    action?: string;
    ref?: string;
    ref_type?: string;
  };
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://api.github.com/users/Naveen-Kumar48/events/public';

  getRecentActivity(): Observable<GithubEvent[]> {
    return this.http.get<GithubEvent[]>(this.API_URL).pipe(
      map(events => events.slice(0, 5)), // Get last 5 events
      catchError(error => {
        console.error('Error fetching GitHub activity:', error);
        return of([]);
      })
    );
  }
}
