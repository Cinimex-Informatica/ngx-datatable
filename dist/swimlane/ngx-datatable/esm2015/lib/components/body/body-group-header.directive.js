import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';
export class DatatableGroupHeaderDirective {
  constructor() {
    /**
     * Row height is required when virtual scroll is enabled.
     */
    this.rowHeight = 0;
    /**
     * Track toggling of group visibility
     */
    this.toggle = new EventEmitter();
  }
  get template() {
    return this._templateInput || this._templateQuery;
  }
  /**
   * Toggle the expansion of a group
   */
  toggleExpandGroup(group) {
    this.toggle.emit({
      type: 'group',
      value: group
    });
  }
  /**
   * Expand all groups
   */
  expandAllGroups() {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }
  /**
   * Collapse all groups
   */
  collapseAllGroups() {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }
}
DatatableGroupHeaderDirective.decorators = [{ type: Directive, args: [{ selector: 'ngx-datatable-group-header' }] }];
DatatableGroupHeaderDirective.propDecorators = {
  rowHeight: [{ type: Input }],
  _templateInput: [{ type: Input, args: ['template'] }],
  _templateQuery: [
    { type: ContentChild, args: [DatatableGroupHeaderTemplateDirective, { read: TemplateRef, static: true }] }
  ],
  toggle: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS1ncm91cC1oZWFkZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYm9keS9ib2R5LWdyb3VwLWhlYWRlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRy9GLE1BQU0sT0FBTyw2QkFBNkI7SUFEMUM7UUFFRTs7V0FFRztRQUNNLGNBQVMsR0FBdUQsQ0FBQyxDQUFDO1FBWTNFOztXQUVHO1FBQ08sV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBK0IzRCxDQUFDO0lBdENDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ3BELENBQUM7SUFPRDs7T0FFRztJQUNILGlCQUFpQixDQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGlCQUFpQjtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQWxERixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsNEJBQTRCLEVBQUU7Ozt3QkFLbEQsS0FBSzs2QkFFTCxLQUFLLFNBQUMsVUFBVTs2QkFHaEIsWUFBWSxTQUFDLHFDQUFxQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3FCQVV2RixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlR3JvdXBIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSB9IGZyb20gJy4vYm9keS1ncm91cC1oZWFkZXItdGVtcGxhdGUuZGlyZWN0aXZlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ25neC1kYXRhdGFibGUtZ3JvdXAtaGVhZGVyJyB9KVxyXG5leHBvcnQgY2xhc3MgRGF0YXRhYmxlR3JvdXBIZWFkZXJEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFJvdyBoZWlnaHQgaXMgcmVxdWlyZWQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyIHwgKChncm91cD86IGFueSwgaW5kZXg/OiBudW1iZXIpID0+IG51bWJlcikgPSAwO1xyXG5cclxuICBASW5wdXQoJ3RlbXBsYXRlJylcclxuICBfdGVtcGxhdGVJbnB1dDogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgQENvbnRlbnRDaGlsZChEYXRhdGFibGVHcm91cEhlYWRlclRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcclxuICBfdGVtcGxhdGVRdWVyeTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgZ2V0IHRlbXBsYXRlKCk6IFRlbXBsYXRlUmVmPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlSW5wdXQgfHwgdGhpcy5fdGVtcGxhdGVRdWVyeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrIHRvZ2dsaW5nIG9mIGdyb3VwIHZpc2liaWxpdHlcclxuICAgKi9cclxuICBAT3V0cHV0KCkgdG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVG9nZ2xlIHRoZSBleHBhbnNpb24gb2YgYSBncm91cFxyXG4gICAqL1xyXG4gIHRvZ2dsZUV4cGFuZEdyb3VwKGdyb3VwOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnZ3JvdXAnLFxyXG4gICAgICB2YWx1ZTogZ3JvdXBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhwYW5kIGFsbCBncm91cHNcclxuICAgKi9cclxuICBleHBhbmRBbGxHcm91cHMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2FsbCcsXHJcbiAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbGxhcHNlIGFsbCBncm91cHNcclxuICAgKi9cclxuICBjb2xsYXBzZUFsbEdyb3VwcygpOiB2b2lkIHtcclxuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnYWxsJyxcclxuICAgICAgdmFsdWU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
