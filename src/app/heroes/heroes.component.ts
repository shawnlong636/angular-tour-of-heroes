import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = []

  getHeroes (): void {
    this.heroService.getHeroes()
      .subscribe(heroes => { this.heroes = heroes })
  }

  add (name: string): void {
    name = name.trim()
    if (name != null) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.heroService.addHero({ name } as Hero)
        .subscribe((hero: Hero) => {
          this.heroes.push(hero)
        })
    }
  }

  delete (hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }

  constructor (
    private readonly heroService: HeroService
  ) { }

  ngOnInit (): void {
    this.getHeroes()
  }
}
