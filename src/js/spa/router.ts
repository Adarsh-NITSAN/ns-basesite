import { Route, RouterConfig, NavigationEvent } from './types';
import { EventBus } from './event-emitter';

export class Router {
  private routes: Route[];
  private defaultRoute: string;
  private notFoundRoute: string;
  private currentRoute: string = '/';
  private eventBus: EventBus;

  constructor(config: RouterConfig, eventBus: EventBus) {
    this.routes = config.routes;
    this.defaultRoute = config.defaultRoute || '/';
    this.notFoundRoute = config.notFoundRoute || '/404';
    this.eventBus = eventBus;
    
    this.init();
  }

  private init(): void {
    // Handle browser back/forward
    window.addEventListener('popstate', (event) => {
      this.navigate(window.location.pathname, false);
    });

    // Handle initial route
    const initialPath = window.location.pathname || this.defaultRoute;
    this.navigate(initialPath, false);
  }

  // Navigate to a route
  navigate(path: string, updateHistory: boolean = true): void {
    const previousRoute = this.currentRoute;
    this.currentRoute = path;

    // Update browser history
    if (updateHistory) {
      window.history.pushState({ path }, '', path);
    }

    // Find matching route
    const route = this.findRoute(path);
    
    if (route) {
      this.loadRoute(route);
    } else {
      // Handle 404
      const notFoundRoute = this.findRoute(this.notFoundRoute);
      if (notFoundRoute) {
        this.loadRoute(notFoundRoute);
      }
    }

    // Emit navigation event
    const navigationEvent: NavigationEvent = {
      from: previousRoute,
      to: path,
      timestamp: Date.now()
    };
    
    this.eventBus.emit('navigation', navigationEvent);
  }

  // Find route by path
  private findRoute(path: string): Route | null {
    return this.routes.find(route => {
      // Simple exact match for now
      // Can be extended to support dynamic routes like /user/:id
      return route.path === path;
    }) || null;
  }

  // Load route content
  private async loadRoute(route: Route): Promise<void> {
    try {
      console.log('🔄 Loading route:', route.path, route.component);
      this.eventBus.emit('routeLoading', { route });

      let content: string;

      if (route.component.startsWith('http') || route.component.startsWith('/')) {
        // Load from URL
        console.log('📡 Fetching from URL:', route.component);
        const response = await fetch(route.component);
        if (!response.ok) {
          throw new Error(`Failed to load route: ${response.statusText}`);
        }
        content = await response.text();
        console.log('📦 Content loaded, length:', content.length);
        console.log('📦 Content preview:', content.substring(0, 200) + '...');
      } else {
        // Static content
        console.log('📝 Using static content');
        content = route.component;
      }

      // Update document title
      if (route.title) {
        document.title = route.title;
        console.log('📄 Updated title:', route.title);
      }

      // Emit route loaded event
      this.eventBus.emit('routeLoaded', { route, content });
      console.log('✅ Route loaded successfully');

    } catch (error) {
      console.error('❌ Error loading route:', error);
      this.eventBus.emit('routeError', { route, error });
    }
  }

  // Get current route
  getCurrentRoute(): string {
    return this.currentRoute;
  }

  // Get all routes
  getRoutes(): Route[] {
    return this.routes;
  }

  // Add route dynamically
  addRoute(route: Route): void {
    this.routes.push(route);
  }

  // Remove route
  removeRoute(path: string): void {
    const index = this.routes.findIndex(route => route.path === path);
    if (index > -1) {
      this.routes.splice(index, 1);
    }
  }

  // Check if route exists
  hasRoute(path: string): boolean {
    return this.routes.some(route => route.path === path);
  }
}
