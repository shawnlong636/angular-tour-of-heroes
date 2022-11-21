import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages?: string[]
  add (message: string): void {
    if (this.messages == null) { this.messages = [] }
    this.messages.push(message)
  }

  clear (): void {
    this.messages = undefined
  }
}
