import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Hero } from './hero'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly heroesUrl = 'api/heroes' // URL to web
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) { }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHerores', []))
      )
  }

  getHero (id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      )
  }

  private log (message: string): void {
    this.messageService.add(`HeroService: ${message}`)
  }

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
  }

  deleteHero (id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: AnalyserNode): Observable<T> => {
      console.error(error)
      const message = error instanceof Error ? error.message : 'reason unknown'
      this.log(`${operation} failed: ${message}`)
      return of(result as T)
    }
  }
}
