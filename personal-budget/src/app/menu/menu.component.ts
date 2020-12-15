import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: User;

  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }
  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
}

}
