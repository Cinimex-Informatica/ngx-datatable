import { Directive, Output, EventEmitter, ElementRef, HostBinding, NgZone } from '@angular/core';
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
export class VisibilityDirective {
  constructor(element, zone) {
    this.element = element;
    this.zone = zone;
    this.isVisible = false;
    this.visible = new EventEmitter();
  }
  ngOnInit() {
    this.runCheck();
  }
  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
  onVisibilityChange() {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }
  runCheck() {
    const check = () => {
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;
      if (offsetHeight && offsetWidth) {
        clearTimeout(this.timeout);
        this.onVisibilityChange();
      } else {
        clearTimeout(this.timeout);
        this.zone.runOutsideAngular(() => {
          this.timeout = setTimeout(() => check(), 50);
        });
      }
    };
    this.timeout = setTimeout(() => check());
  }
}
VisibilityDirective.decorators = [{ type: Directive, args: [{ selector: '[visibilityObserver]' }] }];
VisibilityDirective.ctorParameters = () => [{ type: ElementRef }, { type: NgZone }];
VisibilityDirective.propDecorators = {
  isVisible: [{ type: HostBinding, args: ['class.visible'] }],
  visible: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy92aXNpYmlsaXR5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRXBIOzs7Ozs7Ozs7O0dBVUc7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBUTlCLFlBQW9CLE9BQW1CLEVBQVUsSUFBWTtRQUF6QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQU43RCxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRWpCLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUlNLENBQUM7SUFFakUsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsV0FBVztRQUNULFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLEtBQUssR0FBRyxHQUFHLEVBQUU7WUFDakIsa0RBQWtEO1lBQ2xELE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFFakUsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFO2dCQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7OztZQTVDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7OztZQWJMLFVBQVU7WUFBZSxNQUFNOzs7d0JBZXRFLFdBQVcsU0FBQyxlQUFlO3NCQUczQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIE5nWm9uZSwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKlxyXG4gKiBWaXNpYmlsaXR5IE9ic2VydmVyIERpcmVjdGl2ZVxyXG4gKlxyXG4gKiBVc2FnZTpcclxuICpcclxuICogXHRcdDxkaXZcclxuICogXHRcdFx0dmlzaWJpbGl0eU9ic2VydmVyXHJcbiAqIFx0XHRcdCh2aXNpYmxlKT1cIm9uVmlzaWJsZSgkZXZlbnQpXCI+XHJcbiAqIFx0XHQ8L2Rpdj5cclxuICpcclxuICovXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t2aXNpYmlsaXR5T2JzZXJ2ZXJdJyB9KVxyXG5leHBvcnQgY2xhc3MgVmlzaWJpbGl0eURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnZpc2libGUnKVxyXG4gIGlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgdmlzaWJsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHRpbWVvdXQ6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnJ1bkNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xyXG4gIH1cclxuXHJcbiAgb25WaXNpYmlsaXR5Q2hhbmdlKCk6IHZvaWQge1xyXG4gICAgLy8gdHJpZ2dlciB6b25lIHJlY2FsYyBmb3IgY29sdW1uc1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aXNpYmxlLmVtaXQodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJ1bkNoZWNrKCk6IHZvaWQge1xyXG4gICAgY29uc3QgY2hlY2sgPSAoKSA9PiB7XHJcbiAgICAgIC8vIGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL29mZnNldGhlaWdodC12aXNpYmlsaXR5XHJcbiAgICAgIGNvbnN0IHsgb2Zmc2V0SGVpZ2h0LCBvZmZzZXRXaWR0aCB9ID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICBpZiAob2Zmc2V0SGVpZ2h0ICYmIG9mZnNldFdpZHRoKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XHJcbiAgICAgICAgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjaGVjaygpLCA1MCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjaGVjaygpKTtcclxuICB9XHJcbn1cclxuIl19
