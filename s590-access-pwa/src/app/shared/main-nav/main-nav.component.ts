import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BreakpointService } from '../services/breakpoint.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  isDarkTheme: boolean = false;
  toggleControl: any;
  className!: string;

  constructor(
    public bp: BreakpointService,
    public auth: AuthService,
    private overlay: OverlayContainer,
    private matIconRegistry:MatIconRegistry,
    private domSanitzer:DomSanitizer,
    ) {
      this.matIconRegistry.addSvgIcon(
        'google_G',
        this.domSanitzer.bypassSecurityTrustResourceUrl('../../../assets/Google__G__Logo.svg')
      )
     }

  ngOnInit(): void {
    const systemPrefered = window.matchMedia("(prefers-color-scheme: dark)")
    if (systemPrefered.matches) {
      this.isDarkTheme = true;
      this.overlay.getContainerElement().classList.add('dark-theme-mode');
    } else {
      this.isDarkTheme = false;
      this.overlay.getContainerElement().classList.remove('dark-theme-mode');
    }

    //if (this.auth.user$) { //TODO some of the transitions aren't that smooth or don't work at all
      this.auth.user$.subscribe(user => {
        if (user) {
        switch (user.defaultView) {
          case 'light':
            this.isDarkTheme = false;
            this.overlay.getContainerElement().classList.remove('dark-theme-mode');
            break;
          case 'dark':
            this.isDarkTheme = true;
            this.overlay.getContainerElement().classList.add('dark-theme-mode');
            break;
          default:
            const systemPrefered = window.matchMedia("(prefers-color-scheme: dark)")  // Kinda redundant but you need it there for if you switch back to system prefered
            if (systemPrefered.matches) {
              this.isDarkTheme = true;
              this.overlay.getContainerElement().classList.add('dark-theme-mode');
            } else {
              this.isDarkTheme = false;
              this.overlay.getContainerElement().classList.remove('dark-theme-mode');
            }
          }
        }
      });
    //}
  }
}
