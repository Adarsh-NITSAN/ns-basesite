import { Store } from './types';

export class AppStore<T = any> implements Store<T> {
  public state: T;
  public subscribers: Set<(state: T) => void> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  subscribe(callback: (state: T) => void): () => void {
    this.subscribers.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  dispatch(action: any): void {
    // Update state based on action
    this.state = this.reducer(this.state, action);
    
    // Notify all subscribers
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error in store subscriber:', error);
      }
    });
  }

  getState(): T {
    return this.state;
  }

  // Simple reducer pattern - can be overridden
  private reducer(state: T, action: any): T {
    switch (action.type) {
      case 'UPDATE_NAVIGATION':
        return { ...state, currentRoute: action.payload };
      case 'UPDATE_LOADING':
        return { ...state, isLoading: action.payload };
      default:
        return state;
    }
  }

  // Helper methods
  setState(newState: Partial<T>): void {
    this.dispatch({ type: 'SET_STATE', payload: newState });
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.state[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.dispatch({ type: 'SET_PROPERTY', payload: { key, value } });
  }
}
