/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
export class RowHeightCache {
  constructor() {
    /**
     * Tree Array stores the cumulative information of the row heights to perform efficient
     * range queries and updates.  Currently the tree is initialized to the base row
     * height instead of the detail row height.
     */
    this.treeArray = [];
  }
  /**
   * Clear the Tree array.
   */
  clearCache() {
    this.treeArray = [];
  }
  /**
   * Initialize the Fenwick tree with row Heights.
   *
   * @param rows The array of rows which contain the expanded status.
   * @param rowHeight The row height.
   * @param detailRowHeight The detail row height.
   */
  initCache(details) {
    const { rows, rowHeight, detailRowHeight, externalVirtual, rowCount, rowIndexes, rowExpansions } = details;
    const isFn = typeof rowHeight === 'function';
    const isDetailFn = typeof detailRowHeight === 'function';
    if (!isFn && isNaN(rowHeight)) {
      throw new Error(`Row Height cache initialization failed. Please ensure that 'rowHeight' is a
        valid number or function value: (${rowHeight}) when 'scrollbarV' is enabled.`);
    }
    // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
    if (!isDetailFn && isNaN(detailRowHeight)) {
      throw new Error(`Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a
        valid number or function value: (${detailRowHeight}) when 'scrollbarV' is enabled.`);
    }
    const n = externalVirtual ? rowCount : rows.length;
    this.treeArray = new Array(n);
    for (let i = 0; i < n; ++i) {
      this.treeArray[i] = 0;
    }
    for (let i = 0; i < n; ++i) {
      const row = rows[i];
      let currentRowHeight = rowHeight;
      if (isFn) {
        currentRowHeight = rowHeight(row);
      }
      // Add the detail row height to the already expanded rows.
      // This is useful for the table that goes through a filter or sort.
      const expanded = rowExpansions.has(row);
      if (row && expanded) {
        if (isDetailFn) {
          const index = rowIndexes.get(row);
          currentRowHeight += detailRowHeight(row, index);
        } else {
          currentRowHeight += detailRowHeight;
        }
      }
      this.update(i, currentRowHeight);
    }
  }
  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.  Below handles edge cases.
   */
  getRowIndex(scrollY) {
    if (scrollY === 0) return 0;
    return this.calcRowIndex(scrollY);
  }
  /**
   * When a row is expanded or rowHeight is changed, update the height.  This can
   * be utilized in future when Angular Data table supports dynamic row heights.
   */
  update(atRowIndex, byRowHeight) {
    if (!this.treeArray.length) {
      throw new Error(`Update at index ${atRowIndex} with value ${byRowHeight} failed:
        Row Height cache not initialized.`);
    }
    const n = this.treeArray.length;
    atRowIndex |= 0;
    while (atRowIndex < n) {
      this.treeArray[atRowIndex] += byRowHeight;
      atRowIndex |= atRowIndex + 1;
    }
  }
  /**
   * Range Sum query from 1 to the rowIndex
   */
  query(atIndex) {
    if (!this.treeArray.length) {
      throw new Error(`query at index ${atIndex} failed: Fenwick tree array not initialized.`);
    }
    let sum = 0;
    atIndex |= 0;
    while (atIndex >= 0) {
      sum += this.treeArray[atIndex];
      atIndex = (atIndex & (atIndex + 1)) - 1;
    }
    return sum;
  }
  /**
   * Find the total height between 2 row indexes
   */
  queryBetween(atIndexA, atIndexB) {
    return this.query(atIndexB) - this.query(atIndexA - 1);
  }
  /**
   * Given the ScrollY position i.e. sum, provide the rowIndex
   * that is present in the current view port.
   */
  calcRowIndex(sum) {
    if (!this.treeArray.length) return 0;
    let pos = -1;
    const dataLength = this.treeArray.length;
    // Get the highest bit for the block size.
    const highestBit = Math.pow(2, dataLength.toString(2).length - 1);
    for (let blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
      const nextPos = pos + blockSize;
      if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
        sum -= this.treeArray[nextPos];
        pos = nextPos;
      }
    }
    return pos + 1;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWhlaWdodC1jYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9yb3ctaGVpZ2h0LWNhY2hlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxPQUFPLGNBQWM7SUFBM0I7UUFDRTs7OztXQUlHO1FBQ0ssY0FBUyxHQUFhLEVBQUUsQ0FBQztJQTJJbkMsQ0FBQztJQXpJQzs7T0FFRztJQUNILFVBQVU7UUFDUixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUFDLE9BQVk7UUFDcEIsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUMzRyxNQUFNLElBQUksR0FBRyxPQUFPLFNBQVMsS0FBSyxVQUFVLENBQUM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsT0FBTyxlQUFlLEtBQUssVUFBVSxDQUFDO1FBRXpELElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUM7MkNBQ3FCLFNBQVMsaUNBQWlDLENBQUMsQ0FBQztTQUNsRjtRQUVELHNGQUFzRjtRQUN0RixJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDOzJDQUNxQixlQUFlLGlDQUFpQyxDQUFDLENBQUM7U0FDeEY7UUFFRCxNQUFNLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxH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WUFBWSxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXJDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFFekMsMENBQTBDO1FBQzFDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxFLEtBQUssSUFBSSxTQUFTLEdBQUcsVUFBVSxFQUFFLFNBQVMsS0FBSyxDQUFDLEVBQUUsU0FBUyxLQUFLLENBQUMsRUFBRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2hDLElBQUksT0FBTyxHQUFHLFVBQVUsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUQsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9CLEdBQUcsR0FBRyxPQUFPLENBQUM7YUFDZjtTQUNGO1FBRUQsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBUaGlzIG9iamVjdCBjb250YWlucyB0aGUgY2FjaGUgb2YgdGhlIHZhcmlvdXMgcm93IGhlaWdodHMgdGhhdCBhcmUgcHJlc2VudCBpbnNpZGVcclxuICogdGhlIGRhdGEgdGFibGUuICAgSXRzIGJhc2VkIG9uIEZlbndpY2sgdHJlZSBkYXRhIHN0cnVjdHVyZSB0aGF0IGhlbHBzIHdpdGhcclxuICogcXVlcnlpbmcgc3VtcyB0aGF0IGhhdmUgdGltZSBjb21wbGV4aXR5IG9mIGxvZyBuLlxyXG4gKlxyXG4gKiBGZW53aWNrIFRyZWUgQ3JlZGl0czogaHR0cDovL3BldHItbWl0cmljaGV2LmJsb2dzcG90LmNvbS8yMDEzLzA1L2ZlbndpY2stdHJlZS1yYW5nZS11cGRhdGVzLmh0bWxcclxuICogaHR0cHM6Ly9naXRodWIuY29tL21pa29sYWx5c2Vua28vZmVud2ljay10cmVlXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUm93SGVpZ2h0Q2FjaGUge1xyXG4gIC8qKlxyXG4gICAqIFRyZWUgQXJyYXkgc3RvcmVzIHRoZSBjdW11bGF0aXZlIGluZm9ybWF0aW9uIG9mIHRoZSByb3cgaGVpZ2h0cyB0byBwZXJmb3JtIGVmZmljaWVudFxyXG4gICAqIHJhbmdlIHF1ZXJpZXMgYW5kIHVwZGF0ZXMuICBDdXJyZW50bHkgdGhlIHRyZWUgaXMgaW5pdGlhbGl6ZWQgdG8gdGhlIGJhc2Ugcm93XHJcbiAgICogaGVpZ2h0IGluc3RlYWQgb2YgdGhlIGRldGFpbCByb3cgaGVpZ2h0LlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdHJlZUFycmF5OiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgVHJlZSBhcnJheS5cclxuICAgKi9cclxuICBjbGVhckNhY2hlKCk6IHZvaWQge1xyXG4gICAgdGhpcy50cmVlQXJyYXkgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEZlbndpY2sgdHJlZSB3aXRoIHJvdyBIZWlnaHRzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHJvd3MgVGhlIGFycmF5IG9mIHJvd3Mgd2hpY2ggY29udGFpbiB0aGUgZXhwYW5kZWQgc3RhdHVzLlxyXG4gICAqIEBwYXJhbSByb3dIZWlnaHQgVGhlIHJvdyBoZWlnaHQuXHJcbiAgICogQHBhcmFtIGRldGFpbFJvd0hlaWdodCBUaGUgZGV0YWlsIHJvdyBoZWlnaHQuXHJcbiAgICovXHJcbiAgaW5pdENhY2hlKGRldGFpbHM6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgeyByb3dzLCByb3dIZWlnaHQsIGRldGFpbFJvd0hlaWdodCwgZXh0ZXJuYWxWaXJ0dWFsLCByb3dDb3VudCwgcm93SW5kZXhlcywgcm93RXhwYW5zaW9ucyB9ID0gZGV0YWlscztcclxuICAgIGNvbnN0IGlzRm4gPSB0eXBlb2Ygcm93SGVpZ2h0ID09PSAnZnVuY3Rpb24nO1xyXG4gICAgY29uc3QgaXNEZXRhaWxGbiA9IHR5cGVvZiBkZXRhaWxSb3dIZWlnaHQgPT09ICdmdW5jdGlvbic7XHJcblxyXG4gICAgaWYgKCFpc0ZuICYmIGlzTmFOKHJvd0hlaWdodCkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSb3cgSGVpZ2h0IGNhY2hlIGluaXRpYWxpemF0aW9uIGZhaWxlZC4gUGxlYXNlIGVuc3VyZSB0aGF0ICdyb3dIZWlnaHQnIGlzIGFcclxuICAgICAgICB2YWxpZCBudW1iZXIgb3IgZnVuY3Rpb24gdmFsdWU6ICgke3Jvd0hlaWdodH0pIHdoZW4gJ3Njcm9sbGJhclYnIGlzIGVuYWJsZWQuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHRoaXMgYWRkaXRpb25hbCBndWFyZCBpbiBjYXNlIGRldGFpbFJvd0hlaWdodCBpcyBzZXQgdG8gJ2F1dG8nIGFzIGl0IHdvbnQgd29yay5cclxuICAgIGlmICghaXNEZXRhaWxGbiAmJiBpc05hTihkZXRhaWxSb3dIZWlnaHQpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUm93IEhlaWdodCBjYWNoZSBpbml0aWFsaXphdGlvbiBmYWlsZWQuIFBsZWFzZSBlbnN1cmUgdGhhdCAnZGV0YWlsUm93SGVpZ2h0JyBpcyBhXHJcbiAgICAgICAgdmFsaWQgbnVtYmVyIG9yIGZ1bmN0aW9uIHZhbHVlOiAoJHtkZXRhaWxSb3dIZWlnaHR9KSB3aGVuICdzY3JvbGxiYXJWJyBpcyBlbmFibGVkLmApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG4gPSBleHRlcm5hbFZpcnR1YWwgPyByb3dDb3VudCA6IHJvd3MubGVuZ3RoO1xyXG4gICAgdGhpcy50cmVlQXJyYXkgPSBuZXcgQXJyYXkobik7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcclxuICAgICAgdGhpcy50cmVlQXJyYXlbaV0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IHJvd3NbaV07XHJcbiAgICAgIGxldCBjdXJyZW50Um93SGVpZ2h0ID0gcm93SGVpZ2h0O1xyXG4gICAgICBpZiAoaXNGbikge1xyXG4gICAgICAgIGN1cnJlbnRSb3dIZWlnaHQgPSByb3dIZWlnaHQocm93KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWRkIHRoZSBkZXRhaWwgcm93IGhlaWdodCB0byB0aGUgYWxyZWFkeSBleHBhbmRlZCByb3dzLlxyXG4gICAgICAvLyBUaGlzIGlzIHVzZWZ1bCBmb3IgdGhlIHRhYmxlIHRoYXQgZ29lcyB0aHJvdWdoIGEgZmlsdGVyIG9yIHNvcnQuXHJcbiAgICAgIGNvbnN0IGV4cGFuZGVkID0gcm93RXhwYW5zaW9ucy5oYXMocm93KTtcclxuICAgICAgaWYgKHJvdyAmJiBleHBhbmRlZCkge1xyXG4gICAgICAgIGlmIChpc0RldGFpbEZuKSB7XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IHJvd0luZGV4ZXMuZ2V0KHJvdyk7XHJcbiAgICAgICAgICBjdXJyZW50Um93SGVpZ2h0ICs9IGRldGFpbFJvd0hlaWdodChyb3csIGluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY3VycmVudFJvd0hlaWdodCArPSBkZXRhaWxSb3dIZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnVwZGF0ZShpLCBjdXJyZW50Um93SGVpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdpdmVuIHRoZSBTY3JvbGxZIHBvc2l0aW9uIGkuZS4gc3VtLCBwcm92aWRlIHRoZSByb3dJbmRleFxyXG4gICAqIHRoYXQgaXMgcHJlc2VudCBpbiB0aGUgY3VycmVudCB2aWV3IHBvcnQuICBCZWxvdyBoYW5kbGVzIGVkZ2UgY2FzZXMuXHJcbiAgICovXHJcbiAgZ2V0Um93SW5kZXgoc2Nyb2xsWTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmIChzY3JvbGxZID09PSAwKSByZXR1cm4gMDtcclxuICAgIHJldHVybiB0aGlzLmNhbGNSb3dJbmRleChzY3JvbGxZKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSByb3cgaXMgZXhwYW5kZWQgb3Igcm93SGVpZ2h0IGlzIGNoYW5nZWQsIHVwZGF0ZSB0aGUgaGVpZ2h0LiAgVGhpcyBjYW5cclxuICAgKiBiZSB1dGlsaXplZCBpbiBmdXR1cmUgd2hlbiBBbmd1bGFyIERhdGEgdGFibGUgc3VwcG9ydHMgZHluYW1pYyByb3cgaGVpZ2h0cy5cclxuICAgKi9cclxuICB1cGRhdGUoYXRSb3dJbmRleDogbnVtYmVyLCBieVJvd0hlaWdodDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudHJlZUFycmF5Lmxlbmd0aCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVwZGF0ZSBhdCBpbmRleCAke2F0Um93SW5kZXh9IHdpdGggdmFsdWUgJHtieVJvd0hlaWdodH0gZmFpbGVkOlxyXG4gICAgICAgIFJvdyBIZWlnaHQgY2FjaGUgbm90IGluaXRpYWxpemVkLmApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG4gPSB0aGlzLnRyZWVBcnJheS5sZW5ndGg7XHJcbiAgICBhdFJvd0luZGV4IHw9IDA7XHJcblxyXG4gICAgd2hpbGUgKGF0Um93SW5kZXggPCBuKSB7XHJcbiAgICAgIHRoaXMudHJlZUFycmF5W2F0Um93SW5kZXhdICs9IGJ5Um93SGVpZ2h0O1xyXG4gICAgICBhdFJvd0luZGV4IHw9IGF0Um93SW5kZXggKyAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmFuZ2UgU3VtIHF1ZXJ5IGZyb20gMSB0byB0aGUgcm93SW5kZXhcclxuICAgKi9cclxuICBxdWVyeShhdEluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKCF0aGlzLnRyZWVBcnJheS5sZW5ndGgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBxdWVyeSBhdCBpbmRleCAke2F0SW5kZXh9IGZhaWxlZDogRmVud2ljayB0cmVlIGFycmF5IG5vdCBpbml0aWFsaXplZC5gKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIGF0SW5kZXggfD0gMDtcclxuXHJcbiAgICB3aGlsZSAoYXRJbmRleCA+PSAwKSB7XHJcbiAgICAgIHN1bSArPSB0aGlzLnRyZWVBcnJheVthdEluZGV4XTtcclxuICAgICAgYXRJbmRleCA9IChhdEluZGV4ICYgKGF0SW5kZXggKyAxKSkgLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaW5kIHRoZSB0b3RhbCBoZWlnaHQgYmV0d2VlbiAyIHJvdyBpbmRleGVzXHJcbiAgICovXHJcbiAgcXVlcnlCZXR3ZWVuKGF0SW5kZXhBOiBudW1iZXIsIGF0SW5kZXhCOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucXVlcnkoYXRJbmRleEIpIC0gdGhpcy5xdWVyeShhdEluZGV4QSAtIDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2l2ZW4gdGhlIFNjcm9sbFkgcG9zaXRpb24gaS5lLiBzdW0sIHByb3ZpZGUgdGhlIHJvd0luZGV4XHJcbiAgICogdGhhdCBpcyBwcmVzZW50IGluIHRoZSBjdXJyZW50IHZpZXcgcG9ydC5cclxuICAgKi9cclxuICBwcml2YXRlIGNhbGNSb3dJbmRleChzdW06IG51bWJlcik6IG51bWJlciB7XHJcbiAgICBpZiAoIXRoaXMudHJlZUFycmF5Lmxlbmd0aCkgcmV0dXJuIDA7XHJcblxyXG4gICAgbGV0IHBvcyA9IC0xO1xyXG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IHRoaXMudHJlZUFycmF5Lmxlbmd0aDtcclxuXHJcbiAgICAvLyBHZXQgdGhlIGhpZ2hlc3QgYml0IGZvciB0aGUgYmxvY2sgc2l6ZS5cclxuICAgIGNvbnN0IGhpZ2hlc3RCaXQgPSBNYXRoLnBvdygyLCBkYXRhTGVuZ3RoLnRvU3RyaW5nKDIpLmxlbmd0aCAtIDEpO1xyXG5cclxuICAgIGZvciAobGV0IGJsb2NrU2l6ZSA9IGhpZ2hlc3RCaXQ7IGJsb2NrU2l6ZSAhPT0gMDsgYmxvY2tTaXplID4+PSAxKSB7XHJcbiAgICAgIGNvbnN0IG5leHRQb3MgPSBwb3MgKyBibG9ja1NpemU7XHJcbiAgICAgIGlmIChuZXh0UG9zIDwgZGF0YUxlbmd0aCAmJiBzdW0gPj0gdGhpcy50cmVlQXJyYXlbbmV4dFBvc10pIHtcclxuICAgICAgICBzdW0gLT0gdGhpcy50cmVlQXJyYXlbbmV4dFBvc107XHJcbiAgICAgICAgcG9zID0gbmV4dFBvcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb3MgKyAxO1xyXG4gIH1cclxufVxyXG4iXX0=
