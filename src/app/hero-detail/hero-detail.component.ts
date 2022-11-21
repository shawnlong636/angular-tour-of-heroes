import { Component, Input, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero

  constructor (
    private readonly route: ActivatedRoute,
    private readonly heroService: HeroService,
    private readonly location: Location
  ) { }

  ngOnInit (): void {
    this.getHero()
  }

  getHero (): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(id).subscribe(hero => { this.hero = hero })
  }

  goBack (): void {
    this.location.back()
  }
}
