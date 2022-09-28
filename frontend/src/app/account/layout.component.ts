import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService) {
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
  }
  // redirect to home if already logged in

  ngOnInit(): void {}
}
