import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css'],
})
export class ClientHomeComponent {
  constructor(private router: Router) {}
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
