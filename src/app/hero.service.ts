import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Hero } from './hero'
import { HEROES } from './mock-heroes'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly heroesUrl = 'api/heroes' // URL to web

  constructor (
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) { }

  getHeroes (): Observable<Hero[]> {
    const heroes = this.http.get<Hero[]>(this.heroesUrl)
    this.log('fetched Heroes')
    return heroes
  }

  getHero (id: number): Observable<Hero> {
    const hero = HEROES.find((hero): boolean => { return hero.id === id })!
    this.log(`fetched hero id=${id}`)
    return of(hero)
  }

  private log (message: string): void {
    this.messageService.add(`HeroService: ${message}`)
  }
}
