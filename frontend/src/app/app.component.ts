import { Component, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private config:ConfigService) {}
  
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.config.setupSocketConnection();
    }
  }
  title = 'Project';
}
