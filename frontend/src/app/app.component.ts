
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Almacen de respuestos';

  showLogin = true;

  

  constructor(private router: Router) {
    this.showLogin = this.router.url === '/login';
    console.log('showLogin:', this.showLogin);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogin = event.url === '/login';
        console.log('event.url:', event.url);
        console.log('showLogin:', this.showLogin);
      }
    });


    this.showLogin = this.router.url === '/';

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogin = event.url === '/';
        console.log('event.url:', event.url);
        console.log('showLogin:', this.showLogin);
      }
    });
  }
  }
  
  
