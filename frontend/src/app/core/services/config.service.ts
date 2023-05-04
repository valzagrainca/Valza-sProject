import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Message } from '../models/message';
import { Messages } from '../models/messages';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly apiUrl = 'http://localhost:3001/';
  socket: Socket | undefined;

  constructor() {   }

  setupSocketConnection(): void {
    const storedSocketId = localStorage.getItem('socketId');
    if (storedSocketId) {
      this.socket = io(this.apiUrl, { query: { socketId: storedSocketId } });
    } else {
      this.socket = io(this.apiUrl);
    }

    this.socket.on('connect', () => {
      localStorage.setItem('socketId', this.socket?.id || '');
    });
  }

  sendMessage(message: Messages): void {
    this.socket?.emit('message', message);
  }

  getMessage(): Observable<Messages> {
    return new Observable((observer: Observer<Messages>) => {
      this.socket?.on('message', (message: Messages) => {
        observer.next(message);
      });
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    localStorage.removeItem('socketId');
  }
}
