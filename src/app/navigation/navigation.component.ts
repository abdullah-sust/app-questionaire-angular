import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isUserLoggedIn: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  ngOnInit () {
    if(localStorage.getItem('isUserLoggedInAng') === '1') {
      this.isUserLoggedIn = true
    } else {
      this.isUserLoggedIn = false
    }
  }

  onClickedLogin () {
    if(localStorage.getItem('isUserLoggedInAng') !== '1') {
      this.router.navigate(['/login'])
        }
  }

  onClickedLogout () {
    localStorage.removeItem('isUserLoggedInAng')
    this.router.navigate(['/login'])
    location.reload()
  }

}
