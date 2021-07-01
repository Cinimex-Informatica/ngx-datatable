/**
 * Always returns the empty string ''
 */
export function emptyStringGetter() {
  return '';
}
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
export function getterForProp(prop) {
  if (prop == null) {
    return emptyStringGetter;
  }
  if (typeof prop === 'number') {
    return numericIndexGetter;
  } else {
    // deep or simple
    if (prop.indexOf('.') !== -1) {
      return deepValueGetter;
    } else {
      return shallowValueGetter;
    }
  }
}
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns any or '' if invalid index
 */
export function numericIndexGetter(row, index) {
  if (row == null) {
    return '';
  }
  // mimic behavior of deepValueGetter
  if (!row || index == null) {
    return row;
  }
  const value = row[index];
  if (value == null) {
    return '';
  }
  return value;
}
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 */
export function shallowValueGetter(obj, fieldName) {
  if (obj == null) {
    return '';
  }
  if (!obj || !fieldName) {
    return obj;
  }
  const value = obj[fieldName];
  if (value == null) {
    return '';
  }
  return value;
}
/**
 * Returns a deep object given a string. zoo['animal.type']
 */
export function deepValueGetter(obj, path) {
  if (obj == null) {
    return '';
  }
  if (!obj || !path) {
    return obj;
  }
  // check if path matches a root-level field
  // { "a.b.c": 123 }
  let current = obj[path];
  if (current !== undefined) {
    return current;
  }
  current = obj;
  const split = path.split('.');
  if (split.length) {
    for (let i = 0; i < split.length; i++) {
      current = current[split[i]];
      // if found undefined, return empty string
      if (current === undefined || current === null) {
        return '';
      }
    }
  }
  return current;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXByb3AtZ2V0dGVycy5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9zd2ltbGFuZS9uZ3gtZGF0YXRhYmxlL3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9jb2x1bW4tcHJvcC1nZXR0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQjtJQUMvQixPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLElBQXFCO0lBQ2pELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUNoQixPQUFPLGlCQUFpQixDQUFDO0tBQzFCO0lBRUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsT0FBTyxrQkFBa0IsQ0FBQztLQUMzQjtTQUFNO1FBQ0wsaUJBQWlCO1FBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QixPQUFPLGVBQWUsQ0FBQztTQUN4QjthQUFNO1lBQ0wsT0FBTyxrQkFBa0IsQ0FBQztTQUMzQjtLQUNGO0FBQ0gsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEdBQVUsRUFBRSxLQUFhO0lBQzFELElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxvQ0FBb0M7SUFDcEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ2pCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxHQUFRLEVBQUUsU0FBaUI7SUFDNUQsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2YsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDdEIsT0FBTyxHQUFHLENBQUM7S0FDWjtJQUVELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDakIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFRLEVBQUUsSUFBWTtJQUNwRCxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7UUFDZixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixPQUFPLEdBQUcsQ0FBQztLQUNaO0lBRUQsMkNBQTJDO0lBQzNDLG1CQUFtQjtJQUNuQixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3pCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBRUQsT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUNkLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFOUIsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsMENBQTBDO1lBQzFDLElBQUksT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUM3QyxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYWJsZUNvbHVtblByb3AgfSBmcm9tICcuLi90eXBlcy90YWJsZS1jb2x1bW4udHlwZSc7XHJcblxyXG4vLyBtYXliZSByZW5hbWUgdGhpcyBmaWxlIHRvIHByb3AtZ2V0dGVycy50c1xyXG5cclxuZXhwb3J0IHR5cGUgVmFsdWVHZXR0ZXIgPSAob2JqOiBhbnksIHByb3A6IFRhYmxlQ29sdW1uUHJvcCkgPT4gYW55O1xyXG5cclxuLyoqXHJcbiAqIEFsd2F5cyByZXR1cm5zIHRoZSBlbXB0eSBzdHJpbmcgJydcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbXB0eVN0cmluZ0dldHRlcigpOiBzdHJpbmcge1xyXG4gIHJldHVybiAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIGdldHRlciBmdW5jdGlvbiBmb3IgdGhpcyBraW5kIG9mIHByb3AuXHJcbiAqIElmIHByb3AgPT0gbnVsbCwgcmV0dXJucyB0aGUgZW1wdHlTdHJpbmdHZXR0ZXIuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0dGVyRm9yUHJvcChwcm9wOiBUYWJsZUNvbHVtblByb3ApOiBWYWx1ZUdldHRlciB7XHJcbiAgaWYgKHByb3AgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIGVtcHR5U3RyaW5nR2V0dGVyO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBwcm9wID09PSAnbnVtYmVyJykge1xyXG4gICAgcmV0dXJuIG51bWVyaWNJbmRleEdldHRlcjtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gZGVlcCBvciBzaW1wbGVcclxuICAgIGlmIChwcm9wLmluZGV4T2YoJy4nKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuIGRlZXBWYWx1ZUdldHRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzaGFsbG93VmFsdWVHZXR0ZXI7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgdmFsdWUgYXQgdGhpcyBudW1lcmljIGluZGV4LlxyXG4gKiBAcGFyYW0gcm93IGFycmF5IG9mIHZhbHVlc1xyXG4gKiBAcGFyYW0gaW5kZXggbnVtZXJpYyBpbmRleFxyXG4gKiBAcmV0dXJucyBhbnkgb3IgJycgaWYgaW52YWxpZCBpbmRleFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG51bWVyaWNJbmRleEdldHRlcihyb3c6IGFueVtdLCBpbmRleDogbnVtYmVyKTogYW55IHtcclxuICBpZiAocm93ID09IG51bGwpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcbiAgLy8gbWltaWMgYmVoYXZpb3Igb2YgZGVlcFZhbHVlR2V0dGVyXHJcbiAgaWYgKCFyb3cgfHwgaW5kZXggPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHJvdztcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbHVlID0gcm93W2luZGV4XTtcclxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGZpZWxkLlxyXG4gKiAobW9yZSBlZmZpY2llbnQgdGhhbiBkZWVwVmFsdWVHZXR0ZXIpXHJcbiAqIEBwYXJhbSBvYmogb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZpZWxkXHJcbiAqIEBwYXJhbSBmaWVsZE5hbWUgZmllbGQgbmFtZSBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93VmFsdWVHZXR0ZXIob2JqOiBhbnksIGZpZWxkTmFtZTogc3RyaW5nKTogYW55IHtcclxuICBpZiAob2JqID09IG51bGwpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcbiAgaWYgKCFvYmogfHwgIWZpZWxkTmFtZSkge1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbHVlID0gb2JqW2ZpZWxkTmFtZV07XHJcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIGRlZXAgb2JqZWN0IGdpdmVuIGEgc3RyaW5nLiB6b29bJ2FuaW1hbC50eXBlJ11cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwVmFsdWVHZXR0ZXIob2JqOiBhbnksIHBhdGg6IHN0cmluZyk6IGFueSB7XHJcbiAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG4gIGlmICghb2JqIHx8ICFwYXRoKSB7XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgLy8gY2hlY2sgaWYgcGF0aCBtYXRjaGVzIGEgcm9vdC1sZXZlbCBmaWVsZFxyXG4gIC8vIHsgXCJhLmIuY1wiOiAxMjMgfVxyXG4gIGxldCBjdXJyZW50ID0gb2JqW3BhdGhdO1xyXG4gIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBjdXJyZW50O1xyXG4gIH1cclxuXHJcbiAgY3VycmVudCA9IG9iajtcclxuICBjb25zdCBzcGxpdCA9IHBhdGguc3BsaXQoJy4nKTtcclxuXHJcbiAgaWYgKHNwbGl0Lmxlbmd0aCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjdXJyZW50ID0gY3VycmVudFtzcGxpdFtpXV07XHJcblxyXG4gICAgICAvLyBpZiBmb3VuZCB1bmRlZmluZWQsIHJldHVybiBlbXB0eSBzdHJpbmdcclxuICAgICAgaWYgKGN1cnJlbnQgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY3VycmVudDtcclxufVxyXG4iXX0=
