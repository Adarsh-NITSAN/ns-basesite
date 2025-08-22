// Core SPA Types
export interface Route {
  path: string;
  component: string; // HTML content or component name
  title?: string;
}

export interface RouterConfig {
  routes: Route[];
  defaultRoute?: string;
  notFoundRoute?: string;
}

export interface SPAConfig {
  rootElement: string;
  router: RouterConfig;
  enableHistoryAPI?: boolean;
  enableProgressBar?: boolean;
}

export interface NavigationEvent {
  from: string;
  to: string;
  timestamp: number;
}

// Virtual DOM Types
export interface VNode {
  type: 'element' | 'text' | 'component';
  tagName?: string;
  props?: Record<string, any>;
  children?: VNode[];
  text?: string;
  key?: string;
}

export interface Component {
  render(): VNode;
  mount(container: HTMLElement): void;
  unmount(): void;
  update(props?: any): void;
}

// State Management Types
export interface Store<T = any> {
  state: T;
  subscribers: Set<(state: T) => void>;
  subscribe(callback: (state: T) => void): () => void;
  dispatch(action: any): void;
  getState(): T;
}

// Event System Types
export interface EventEmitter {
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
  emit(event: string, data?: any): void;
}
