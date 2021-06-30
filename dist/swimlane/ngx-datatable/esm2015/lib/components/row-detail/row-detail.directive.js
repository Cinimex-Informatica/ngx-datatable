import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
export class DatatableRowDetailDirective {
  constructor() {
    /**
     * The detail row height is required especially
     * when virtual scroll is enabled.
     */
    this.rowHeight = 0;
    /**
     * Row detail row visbility was toggled.
     */
    this.toggle = new EventEmitter();
  }
  get template() {
    return this._templateInput || this._templateQuery;
  }
  /**
   * Toggle the expansion of the row
   */
  toggleExpandRow(row) {
    this.toggle.emit({
      type: 'row',
      value: row
    });
  }
  /**
   * API method to expand all the rows.
   */
  expandAllRows() {
    this.toggle.emit({
      type: 'all',
      value: true
    });
  }
  /**
   * API method to collapse all the rows.
   */
  collapseAllRows() {
    this.toggle.emit({
      type: 'all',
      value: false
    });
  }
}
DatatableRowDetailDirective.decorators = [{ type: Directive, args: [{ selector: 'ngx-datatable-row-detail' }] }];
DatatableRowDetailDirective.propDecorators = {
  rowHeight: [{ type: Input }],
  _templateInput: [{ type: Input, args: ['template'] }],
  _templateQuery: [
    { type: ContentChild, args: [DatatableRowDetailTemplateDirective, { read: TemplateRef, static: true }] }
  ],
  toggle: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWRldGFpbC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWRhdGF0YWJsZS9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9yb3ctZGV0YWlsL3Jvdy1kZXRhaWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd0RixNQUFNLE9BQU8sMkJBQTJCO0lBRHhDO1FBRUU7OztXQUdHO1FBQ00sY0FBUyxHQUFxRCxDQUFDLENBQUM7UUFZekU7O1dBRUc7UUFDTyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUErQjNELENBQUM7SUF0Q0MsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDcEQsQ0FBQztJQU9EOztPQUVHO0lBQ0gsZUFBZSxDQUFDLEdBQVE7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYTtRQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7d0JBTWhELEtBQUs7NkJBRUwsS0FBSyxTQUFDLFVBQVU7NkJBR2hCLFlBQVksU0FBQyxtQ0FBbUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFVckYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGF0YWJsZVJvd0RldGFpbFRlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi9yb3ctZGV0YWlsLXRlbXBsYXRlLmRpcmVjdGl2ZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICduZ3gtZGF0YXRhYmxlLXJvdy1kZXRhaWwnIH0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhdGFibGVSb3dEZXRhaWxEaXJlY3RpdmUge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBkZXRhaWwgcm93IGhlaWdodCBpcyByZXF1aXJlZCBlc3BlY2lhbGx5XHJcbiAgICogd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHJvd0hlaWdodDogbnVtYmVyIHwgKChyb3c/OiBhbnksIGluZGV4PzogbnVtYmVyKSA9PiBudW1iZXIpID0gMDtcclxuXHJcbiAgQElucHV0KCd0ZW1wbGF0ZScpXHJcbiAgX3RlbXBsYXRlSW5wdXQ6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIEBDb250ZW50Q2hpbGQoRGF0YXRhYmxlUm93RGV0YWlsVGVtcGxhdGVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxyXG4gIF90ZW1wbGF0ZVF1ZXJ5OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICBnZXQgdGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVJbnB1dCB8fCB0aGlzLl90ZW1wbGF0ZVF1ZXJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm93IGRldGFpbCByb3cgdmlzYmlsaXR5IHdhcyB0b2dnbGVkLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0b2dnbGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGUgdGhlIGV4cGFuc2lvbiBvZiB0aGUgcm93XHJcbiAgICovXHJcbiAgdG9nZ2xlRXhwYW5kUm93KHJvdzogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ3JvdycsXHJcbiAgICAgIHZhbHVlOiByb3dcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQVBJIG1ldGhvZCB0byBleHBhbmQgYWxsIHRoZSByb3dzLlxyXG4gICAqL1xyXG4gIGV4cGFuZEFsbFJvd3MoKTogdm9pZCB7XHJcbiAgICB0aGlzLnRvZ2dsZS5lbWl0KHtcclxuICAgICAgdHlwZTogJ2FsbCcsXHJcbiAgICAgIHZhbHVlOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFQSSBtZXRob2QgdG8gY29sbGFwc2UgYWxsIHRoZSByb3dzLlxyXG4gICAqL1xyXG4gIGNvbGxhcHNlQWxsUm93cygpOiB2b2lkIHtcclxuICAgIHRoaXMudG9nZ2xlLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnYWxsJyxcclxuICAgICAgdmFsdWU6IGZhbHNlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
