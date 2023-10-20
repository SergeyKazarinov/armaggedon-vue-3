import { type Directive } from 'vue';

interface IBindingValue {
  callback: () => void;
}

export const vInterception: Directive<Element, IBindingValue> = {
  mounted(element, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 0
    };
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        binding.value.callback();
      }
    };
    const observer = new IntersectionObserver(callback, options);

    observer.observe(element);
  }
};
