import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users:any;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.getUsers().subscribe((result)=>{
      this.users=result;
    })
  }
  
}
