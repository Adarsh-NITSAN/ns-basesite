// Global type declarations for modules without TypeScript definitions
declare module 'flickity' {
  interface FlickityOptions {
    wrapAround?: boolean;
    autoPlay?: boolean | number;
    cellAlign?: string;
    contain?: boolean;
  }
  
  class Flickity {
    constructor(element: Element | string, options?: FlickityOptions);
    destroy(): void;
  }
  
  export = Flickity;
}

declare module 'aos' {
  interface AOSOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
  }
  
  interface AOS {
    init(options?: AOSOptions): void;
    refresh(): void;
  }
  
  const aos: AOS;
  export = aos;
}

declare module 'bootstrap' {
  class Tooltip {
    constructor(element: Element, options?: any);
  }
  
  class Popover {
    constructor(element: Element, options?: any);
  }
  
  export { Tooltip, Popover };
}

// Extend Window interface for Bootstrap
declare global {
  interface Window {
    bootstrap?: {
      Tooltip: typeof import('bootstrap').Tooltip;
      Popover: typeof import('bootstrap').Popover;
    };
  }
  
  interface Element {
    _tooltip?: any;
    _popover?: any;
    _flickity?: any;
  }
}
