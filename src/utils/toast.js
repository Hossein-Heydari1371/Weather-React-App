// Tiny app-wide toast. Usage: toast('پیام شما')
export function toast(message) {
  window.dispatchEvent(new CustomEvent('ng-toast', { detail: message }));
}
