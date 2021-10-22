import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService implements OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize!: string;
  gridColCount!: number;
  
   // Create a map to display breakpoint names for demonstration purposes.
   displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  
  constructor(breakpointObserver: BreakpointObserver) {


    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            
            switch(this.currentScreenSize) {
              case 'XSmall':
                this.gridColCount = 1
                break;
              case 'Small':
                this.gridColCount = 1
                break;
              case 'Medium':
                this.gridColCount = 2
                break;
              case 'Large':
                this.gridColCount = 3
                break;
              case 'XLarge':
                this.gridColCount = 4
                break;
              default:
                this.gridColCount = 3
                break;
            }
          }
        }
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
