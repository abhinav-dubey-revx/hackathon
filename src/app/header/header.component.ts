import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  constructor(
    // private loginService: LoginService,
  ) { }
  
  ngOnInit() {
    // this.username = this.loginService.logedUser.username;
  }
  userInfo = {
    isSuperUser: false
  }
}
