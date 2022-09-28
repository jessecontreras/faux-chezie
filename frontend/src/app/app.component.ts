//Ng dependencies
import { Component } from '@angular/core';
//Local dependencies
import { AccountService } from './_services/account.service';
import { User } from './_models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //title = 'faux-chezie';
  user!: User | null;
  constructor(private accountService: AccountService) {
    this.accountService.user$.subscribe((userData) => (this.user = userData));
  }

  logout() {
    this.accountService.logout();
  }
}
