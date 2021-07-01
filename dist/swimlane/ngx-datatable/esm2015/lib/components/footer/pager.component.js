import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
export class DataTablePagerComponent {
  constructor() {
    this.showLastPage = true;
    this.change = new EventEmitter();
    this._count = 0;
    this._page = 1;
    this._size = 0;
  }
  set size(val) {
    this._size = val;
    this.pages = this.calcPages();
  }
  get size() {
    return this._size;
  }
  set count(val) {
    this._count = val;
    this.pages = this.calcPages();
  }
  get count() {
    return this._count;
  }
  set page(val) {
    this._page = val;
    this.pages = this.calcPages();
  }
  get page() {
    return this._page;
  }
  get totalPages() {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }
  canPrevious() {
    return this.page > 1;
  }
  canNext() {
    return this.page < this.totalPages;
  }
  prevPage() {
    this.selectPage(this.page - 1);
  }
  nextPage() {
    this.selectPage(this.page + 1);
  }
  selectPage(page) {
    if (page > 0 && page <= this.totalPages && page !== this.page) {
      this.page = page;
      this.change.emit({
        page
      });
    }
  }
  calcPages(page) {
    const pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;
    page = page || this.page;
    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);
      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      } else if (endPage > this.totalPages) {
        startPage = Math.max(this.totalPages - maxSize + 1, 1);
        endPage = this.totalPages;
      }
    }
    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: num
      });
    }
    return pages;
  }
}
DataTablePagerComponent.decorators = [
  {
    type: Component,
    args: [
      {
        selector: 'datatable-pager',
        template: `
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" (click)="selectPage(1)">
          <i class="{{ pagerPreviousIcon }}"></i>
        </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" (click)="prevPage()">
          <i class="{{ pagerLeftArrowIcon }}"></i>
        </a>
      </li>
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page"
      >
        <a href="javascript:void(0)" (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" (click)="nextPage()">
          <i class="{{ pagerRightArrowIcon }}"></i>
        </a>
      </li>
      <li *ngIf="showLastPage" [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" (click)="selectPage(totalPages)">
          <i class="{{ pagerNextIcon }}"></i>
        </a>
      </li>
    </ul>
  `,
        host: {
          class: 'datatable-pager'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
      }
    ]
  }
];
DataTablePagerComponent.propDecorators = {
  pagerLeftArrowIcon: [{ type: Input }],
  pagerRightArrowIcon: [{ type: Input }],
  pagerPreviousIcon: [{ type: Input }],
  pagerNextIcon: [{ type: Input }],
  showLastPage: [{ type: Input }],
  size: [{ type: Input }],
  count: [{ type: Input }],
  page: [{ type: Input }],
  change: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9vdGVyL3BhZ2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBNENoRyxNQUFNLE9BQU8sdUJBQXVCO0lBMUNwQztRQStDVyxpQkFBWSxHQUFHLElBQUksQ0FBQztRQXFDbkIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO0lBNERwQixDQUFDO0lBbkdDLElBQ0ksSUFBSSxDQUFDLEdBQVc7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsSUFDSSxLQUFLLENBQUMsR0FBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUNJLElBQUksQ0FBQyxHQUFXO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFB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O2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtpQkFDekI7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7OztpQ0FFRSxLQUFLO2tDQUNMLEtBQUs7Z0NBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7bUJBRUwsS0FBSztvQkFVTCxLQUFLO21CQVVMLEtBQUs7cUJBZUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkYXRhdGFibGUtcGFnZXInLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8dWwgY2xhc3M9XCJwYWdlclwiPlxyXG4gICAgICA8bGkgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5QcmV2aW91cygpXCI+XHJcbiAgICAgICAgPGEgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJnbyB0byBmaXJzdCBwYWdlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3RQYWdlKDEpXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyUHJldmlvdXNJY29uIH19XCI+PC9pPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9saT5cclxuICAgICAgPGxpIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuUHJldmlvdXMoKVwiPlxyXG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gcHJldmlvdXMgcGFnZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwicHJldlBhZ2UoKVwiPlxyXG4gICAgICAgICAgPGkgY2xhc3M9XCJ7eyBwYWdlckxlZnRBcnJvd0ljb24gfX1cIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGlcclxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcclxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidwYWdlICcgKyBwZy5udW1iZXJcIlxyXG4gICAgICAgIGNsYXNzPVwicGFnZXNcIlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBwZyBvZiBwYWdlc1wiXHJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJwZy5udW1iZXIgPT09IHBhZ2VcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHBnLm51bWJlcilcIj5cclxuICAgICAgICAgIHt7IHBnLnRleHQgfX1cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvbGk+XHJcbiAgICAgIDxsaSBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbk5leHQoKVwiPlxyXG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gbmV4dCBwYWdlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJuZXh0UGFnZSgpXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyUmlnaHRBcnJvd0ljb24gfX1cIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgICA8bGkgKm5nSWY9XCJzaG93TGFzdFBhZ2VcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbk5leHQoKVwiPlxyXG4gICAgICAgIDxhIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiZ28gdG8gbGFzdCBwYWdlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJzZWxlY3RQYWdlKHRvdGFsUGFnZXMpXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInt7IHBhZ2VyTmV4dEljb24gfX1cIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuICBgLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnZGF0YXRhYmxlLXBhZ2VyJ1xyXG4gIH0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVBhZ2VyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBwYWdlckxlZnRBcnJvd0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlclJpZ2h0QXJyb3dJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGFnZXJQcmV2aW91c0ljb246IHN0cmluZztcclxuICBASW5wdXQoKSBwYWdlck5leHRJY29uOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2hvd0xhc3RQYWdlID0gdHJ1ZTtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc2l6ZSh2YWw6IG51bWJlcikge1xyXG4gICAgdGhpcy5fc2l6ZSA9IHZhbDtcclxuICAgIHRoaXMucGFnZXMgPSB0aGlzLmNhbGNQYWdlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9zaXplO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY291bnQodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2NvdW50ID0gdmFsO1xyXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuY2FsY1BhZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9jb3VudDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHBhZ2UodmFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3BhZ2UgPSB2YWw7XHJcbiAgICB0aGlzLnBhZ2VzID0gdGhpcy5jYWxjUGFnZXMoKTtcclxuICB9XHJcblxyXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFnZTtcclxuICB9XHJcblxyXG4gIGdldCB0b3RhbFBhZ2VzKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBjb3VudCA9IHRoaXMuc2l6ZSA8IDEgPyAxIDogTWF0aC5jZWlsKHRoaXMuY291bnQgLyB0aGlzLnNpemUpO1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KGNvdW50IHx8IDAsIDEpO1xyXG4gIH1cclxuXHJcbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIF9jb3VudDogbnVtYmVyID0gMDtcclxuICBfcGFnZTogbnVtYmVyID0gMTtcclxuICBfc2l6ZTogbnVtYmVyID0gMDtcclxuICBwYWdlczogYW55O1xyXG5cclxuICBjYW5QcmV2aW91cygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2UgPiAxO1xyXG4gIH1cclxuXHJcbiAgY2FuTmV4dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhZ2UgPCB0aGlzLnRvdGFsUGFnZXM7XHJcbiAgfVxyXG5cclxuICBwcmV2UGFnZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0UGFnZSh0aGlzLnBhZ2UgLSAxKTtcclxuICB9XHJcblxyXG4gIG5leHRQYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSArIDEpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0UGFnZShwYWdlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmIChwYWdlID4gMCAmJiBwYWdlIDw9IHRoaXMudG90YWxQYWdlcyAmJiBwYWdlICE9PSB0aGlzLnBhZ2UpIHtcclxuICAgICAgdGhpcy5wYWdlID0gcGFnZTtcclxuXHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQoe1xyXG4gICAgICAgIHBhZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxjUGFnZXMocGFnZT86IG51bWJlcik6IGFueVtdIHtcclxuICAgIGNvbnN0IHBhZ2VzID0gW107XHJcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcclxuICAgIGxldCBlbmRQYWdlID0gdGhpcy50b3RhbFBhZ2VzO1xyXG4gICAgY29uc3QgbWF4U2l6ZSA9IDU7XHJcbiAgICBjb25zdCBpc01heFNpemVkID0gbWF4U2l6ZSA8IHRoaXMudG90YWxQYWdlcztcclxuXHJcbiAgICBwYWdlID0gcGFnZSB8fCB0aGlzLnBhZ2U7XHJcblxyXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcclxuICAgICAgc3RhcnRQYWdlID0gcGFnZSAtIE1hdGguZmxvb3IobWF4U2l6ZSAvIDIpO1xyXG4gICAgICBlbmRQYWdlID0gcGFnZSArIE1hdGguZmxvb3IobWF4U2l6ZSAvIDIpO1xyXG5cclxuICAgICAgaWYgKHN0YXJ0UGFnZSA8IDEpIHtcclxuICAgICAgICBzdGFydFBhZ2UgPSAxO1xyXG4gICAgICAgIGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyBtYXhTaXplIC0gMSwgdGhpcy50b3RhbFBhZ2VzKTtcclxuICAgICAgfSBlbHNlIGlmIChlbmRQYWdlID4gdGhpcy50b3RhbFBhZ2VzKSB7XHJcbiAgICAgICAgc3RhcnRQYWdlID0gTWF0aC5tYXgodGhpcy50b3RhbFBhZ2VzIC0gbWF4U2l6ZSArIDEsIDEpO1xyXG4gICAgICAgIGVuZFBhZ2UgPSB0aGlzLnRvdGFsUGFnZXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xyXG4gICAgICBwYWdlcy5wdXNoKHtcclxuICAgICAgICBudW1iZXI6IG51bSxcclxuICAgICAgICB0ZXh0OiA8c3RyaW5nPig8YW55Pm51bSlcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhZ2VzO1xyXG4gIH1cclxufVxyXG4iXX0=
