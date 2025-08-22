import { SPAConfig, VNode } from './types';
import { EventBus } from './event-emitter';
import { AppStore } from './store';
import { VirtualDOM } from './virtual-dom';
import { Router } from './router';

export class SPA {
  private config: SPAConfig;
  private eventBus: EventBus;
  private store: AppStore;
  private virtualDOM: VirtualDOM;
  private router: Router;
  private rootElement: HTMLElement;
  private isLoading: boolean = false;

  constructor(config: SPAConfig) {
    this.config = config;
    this.eventBus = new EventBus();
    this.store = new AppStore({
      currentRoute: '/',
      isLoading: false,
      navigationHistory: []
    });
    
    this.rootElement = document.querySelector(config.rootElement) as HTMLElement;
    if (!this.rootElement) {
      throw new Error(`Root element not found: ${config.rootElement}`);
    }
    
    this.virtualDOM = new VirtualDOM(this.rootElement);
    this.router = new Router(config.router, this.eventBus);
    
    this.init();
  }

  private init(): void {
    // Set up event listeners
    this.setupEventListeners();
    
    // Set up link interception
    this.setupLinkInterception();
    
    // Initialize the app
    this.eventBus.emit('appInitialized', { config: this.config });
    
    console.log('🚀 SPA initialized successfully');
  }

  private setupEventListeners(): void {
    // Handle navigation events
    this.eventBus.on('navigation', (event) => {
      this.store.dispatch({ type: 'UPDATE_NAVIGATION', payload: event.to });
      this.store.dispatch({ 
        type: 'UPDATE_HISTORY', 
        payload: [...this.store.getState().navigationHistory, event] 
      });
    });

    // Handle route loading
    this.eventBus.on('routeLoading', (event) => {
      this.isLoading = true;
      this.store.dispatch({ type: 'UPDATE_LOADING', payload: true });
      this.showLoadingIndicator();
    });

    // Handle route loaded
    this.eventBus.on('routeLoaded', (event) => {
      this.isLoading = false;
      this.store.dispatch({ type: 'UPDATE_LOADING', payload: false });
      this.hideLoadingIndicator();
      this.renderContent(event.content);
    });

    // Handle route errors
    this.eventBus.on('routeError', (event) => {
      this.isLoading = false;
      this.store.dispatch({ type: 'UPDATE_LOADING', payload: false });
      this.hideLoadingIndicator();
      this.renderError(event.error);
    });

    // Handle app state changes
    this.store.subscribe((state) => {
      this.eventBus.emit('stateChanged', { state });
    });
  }

  private setupLinkInterception(): void {
    // Intercept all link clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && this.shouldInterceptLink(link)) {
        event.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          this.router.navigate(href);
        }
      }
    });
  }

  private shouldInterceptLink(link: HTMLAnchorElement): boolean {
    const href = link.getAttribute('href');
    if (!href) return false;

    // Don't intercept external links
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    // Don't intercept links with target="_blank"
    if (link.getAttribute('target') === '_blank') {
      return false;
    }

    // Don't intercept links with data-no-spa attribute
    if (link.hasAttribute('data-no-spa')) {
      return false;
    }

    return true;
  }

  private renderContent(content: string): void {
    try {
      console.log('🔄 Rendering content:', content.substring(0, 200) + '...');
      
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      
      // Try multiple selectors to find the main content
      let mainContent = doc.querySelector('.site-main');
      
      if (!mainContent) {
        mainContent = doc.querySelector('main');
      }
      
      if (!mainContent) {
        mainContent = doc.querySelector('.content-section');
      }
      
      if (!mainContent) {
        mainContent = doc.querySelector('#content');
      }
      
      if (!mainContent) {
        mainContent = doc.body;
      }
      
      console.log('📦 Found main content:', mainContent?.tagName, mainContent?.className);
      console.log('📦 Main content HTML:', mainContent?.innerHTML?.substring(0, 200) + '...');
      
      // For now, use a simpler approach - directly update the DOM
      if (mainContent && this.rootElement) {
        console.log('🎨 Direct DOM update');
        this.rootElement.innerHTML = mainContent.innerHTML;
        console.log('✅ Direct DOM update complete');
      } else {
        console.log('❌ No main content or root element found');
        // Fallback to virtual DOM
        const vnode = this.htmlToVNode(mainContent);
        console.log('🎭 Created virtual node:', vnode);
        this.virtualDOM.update(vnode);
      }
      
      // Re-initialize components after content update
      this.reinitializeComponents();
      
      this.eventBus.emit('contentRendered', { content });
      
      console.log('✅ Content rendered successfully');
      
    } catch (error) {
      console.error('❌ Error rendering content:', error);
      this.renderError(error);
    }
  }

  private htmlToVNode(element: Element): VNode {
    if (element.nodeType === Node.TEXT_NODE) {
      return {
        type: 'text',
        text: element.textContent || ''
      };
    }

    if (element.nodeType === Node.ELEMENT_NODE) {
      const el = element as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      const props: Record<string, any> = {};
      const children: VNode[] = [];

      // Extract attributes
      Array.from(el.attributes).forEach(attr => {
        if (attr.name === 'class') {
          props.className = attr.value;
        } else if (attr.name === 'style') {
          props.style = attr.value;
        } else {
          props[attr.name] = attr.value;
        }
      });

      // Extract children
      Array.from(el.childNodes).forEach(child => {
        children.push(this.htmlToVNode(child));
      });

      return {
        type: 'element',
        tagName,
        props,
        children
      };
    }

    return {
      type: 'text',
      text: ''
    };
  }

  private renderError(error: any): void {
    const errorVNode: VNode = {
      type: 'element',
      tagName: 'div',
      props: { className: 'error-container' },
      children: [
        {
          type: 'element',
          tagName: 'h1',
          children: [{ type: 'text', text: 'Error' }]
        },
        {
          type: 'element',
          tagName: 'p',
          children: [{ type: 'text', text: error.message || 'An error occurred' }]
        }
      ]
    };

    this.virtualDOM.update(errorVNode);
  }

  private showLoadingIndicator(): void {
    if (this.config.enableProgressBar) {
      // You can implement a progress bar here
      this.eventBus.emit('loadingStarted');
    }
  }

  private hideLoadingIndicator(): void {
    if (this.config.enableProgressBar) {
      this.eventBus.emit('loadingFinished');
    }
  }

  private reinitializeComponents(): void {
    // Re-initialize any components that need it
    this.eventBus.emit('componentsReinitialize');
  }

  // Public API
  public navigate(path: string): void {
    this.router.navigate(path);
  }

  public getCurrentRoute(): string {
    return this.router.getCurrentRoute();
  }

  public getStore(): AppStore {
    return this.store;
  }

  public getEventBus(): EventBus {
    return this.eventBus;
  }

  public destroy(): void {
    this.eventBus.clear();
    this.virtualDOM.clear();
  }
}
