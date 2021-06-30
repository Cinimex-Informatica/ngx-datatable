import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camel-case';
// browser detection and prefixing tools
const transform = typeof window !== 'undefined' ? getVendorPrefixedName('transform') : undefined;
const backfaceVisibility = typeof window !== 'undefined' ? getVendorPrefixedName('backfaceVisibility') : undefined;
const hasCSSTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('transform') : undefined;
const hasCSS3DTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('perspective') : undefined;
const ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
const isSafari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
export function translateXY(styles, x, y) {
  if (typeof transform !== 'undefined' && hasCSSTransforms) {
    if (!isSafari && hasCSS3DTransforms) {
      styles[transform] = `translate3d(${x}px, ${y}px, 0)`;
      styles[backfaceVisibility] = 'hidden';
    } else {
      styles[camelCase(transform)] = `translate(${x}px, ${y}px)`;
    }
  } else {
    styles.top = `${y}px`;
    styles.left = `${x}px`;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL3RyYW5zbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6Qyx3Q0FBd0M7QUFDeEMsTUFBTSxTQUFTLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ2pHLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDbkgsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQzFHLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUM5RyxNQUFNLEVBQUUsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFDakYsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFN0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFXLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDM0QsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksZ0JBQWdCLEVBQUU7UUFDeEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxrQkFBa0IsRUFBRTtZQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDckQsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDNUQ7S0FDRjtTQUFNO1FBQ0wsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztLQUN4QjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRWZW5kb3JQcmVmaXhlZE5hbWUgfSBmcm9tICcuL3ByZWZpeGVzJztcclxuaW1wb3J0IHsgY2FtZWxDYXNlIH0gZnJvbSAnLi9jYW1lbC1jYXNlJztcclxuXHJcbi8vIGJyb3dzZXIgZGV0ZWN0aW9uIGFuZCBwcmVmaXhpbmcgdG9vbHNcclxuY29uc3QgdHJhbnNmb3JtID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBnZXRWZW5kb3JQcmVmaXhlZE5hbWUoJ3RyYW5zZm9ybScpIDogdW5kZWZpbmVkO1xyXG5jb25zdCBiYWNrZmFjZVZpc2liaWxpdHkgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IGdldFZlbmRvclByZWZpeGVkTmFtZSgnYmFja2ZhY2VWaXNpYmlsaXR5JykgOiB1bmRlZmluZWQ7XHJcbmNvbnN0IGhhc0NTU1RyYW5zZm9ybXMgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/ICEhZ2V0VmVuZG9yUHJlZml4ZWROYW1lKCd0cmFuc2Zvcm0nKSA6IHVuZGVmaW5lZDtcclxuY29uc3QgaGFzQ1NTM0RUcmFuc2Zvcm1zID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyAhIWdldFZlbmRvclByZWZpeGVkTmFtZSgncGVyc3BlY3RpdmUnKSA6IHVuZGVmaW5lZDtcclxuY29uc3QgdWEgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50IDogJ0Nocm9tZSc7XHJcbmNvbnN0IGlzU2FmYXJpID0gL1NhZmFyaVxcLy8udGVzdCh1YSkgJiYgIS9DaHJvbWVcXC8vLnRlc3QodWEpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZVhZKHN0eWxlczogYW55LCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gIGlmICh0eXBlb2YgdHJhbnNmb3JtICE9PSAndW5kZWZpbmVkJyAmJiBoYXNDU1NUcmFuc2Zvcm1zKSB7XHJcbiAgICBpZiAoIWlzU2FmYXJpICYmIGhhc0NTUzNEVHJhbnNmb3Jtcykge1xyXG4gICAgICBzdHlsZXNbdHJhbnNmb3JtXSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgMClgO1xyXG4gICAgICBzdHlsZXNbYmFja2ZhY2VWaXNpYmlsaXR5XSA9ICdoaWRkZW4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3R5bGVzW2NhbWVsQ2FzZSh0cmFuc2Zvcm0pXSA9IGB0cmFuc2xhdGUoJHt4fXB4LCAke3l9cHgpYDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgc3R5bGVzLnRvcCA9IGAke3l9cHhgO1xyXG4gICAgc3R5bGVzLmxlZnQgPSBgJHt4fXB4YDtcclxuICB9XHJcbn1cclxuIl19
