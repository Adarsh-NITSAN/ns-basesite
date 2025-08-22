import { VNode } from './types';

export class VirtualDOM {
  private container: HTMLElement;
  private currentVNode: VNode | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  // Create a virtual node
  createElement(tagName: string, props: Record<string, any> = {}, children: VNode[] = []): VNode {
    return {
      type: 'element',
      tagName,
      props,
      children
    };
  }

  // Create a text node
  createTextNode(text: string): VNode {
    return {
      type: 'text',
      text
    };
  }

  // Render virtual DOM to real DOM
  render(vnode: VNode): HTMLElement | Text {
    if (vnode.type === 'text') {
      return document.createTextNode(vnode.text || '');
    }

    if (vnode.type === 'element' && vnode.tagName) {
      const element = document.createElement(vnode.tagName);
      
      // Set properties
      if (vnode.props) {
        Object.entries(vnode.props).forEach(([key, value]) => {
          if (key.startsWith('on')) {
            // Event handler
            const eventName = key.toLowerCase().substring(2);
            element.addEventListener(eventName, value as EventListener);
          } else if (key === 'className') {
            element.className = value as string;
          } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
          } else {
            element.setAttribute(key, value as string);
          }
        });
      }

      // Render children
      if (vnode.children) {
        vnode.children.forEach(child => {
          const childElement = this.render(child);
          element.appendChild(childElement);
        });
      }

      return element;
    }

    throw new Error('Invalid virtual node');
  }

  // Update the DOM with new virtual node
  update(newVNode: VNode): void {
    console.log('🎭 Virtual DOM update:', newVNode);
    
    if (!this.currentVNode) {
      // Initial render
      console.log('🎨 Initial render');
      const element = this.render(newVNode);
      this.container.appendChild(element);
      console.log('✅ Initial render complete');
    } else {
      // Update existing DOM
      console.log('🔄 Patching existing DOM');
      this.patch(this.container, this.currentVNode, newVNode);
      console.log('✅ DOM patch complete');
    }
    
    this.currentVNode = newVNode;
  }

  // Simple patch algorithm
  private patch(container: HTMLElement, oldVNode: VNode, newVNode: VNode): void {
    if (oldVNode.type !== newVNode.type) {
      // Different types, replace completely
      container.innerHTML = '';
      const element = this.render(newVNode);
      container.appendChild(element);
      return;
    }

    if (oldVNode.type === 'text' && newVNode.type === 'text') {
      // Update text content
      if (oldVNode.text !== newVNode.text) {
        container.textContent = newVNode.text || '';
      }
      return;
    }

    if (oldVNode.type === 'element' && newVNode.type === 'element' && 
        oldVNode.tagName === newVNode.tagName) {
      
      // Update properties
      this.updateElementProperties(container as HTMLElement, oldVNode.props || {}, newVNode.props || {});
      
      // Update children
      this.updateChildren(container as HTMLElement, oldVNode.children || [], newVNode.children || []);
    }
  }

  private updateElementProperties(element: HTMLElement, oldProps: Record<string, any>, newProps: Record<string, any>): void {
    // Remove old properties
    Object.keys(oldProps).forEach(key => {
      if (!(key in newProps)) {
        if (key.startsWith('on')) {
          const eventName = key.toLowerCase().substring(2);
          element.removeEventListener(eventName, oldProps[key]);
        } else if (key === 'className') {
          element.className = '';
        } else {
          element.removeAttribute(key);
        }
      }
    });

    // Set new properties
    Object.entries(newProps).forEach(([key, value]) => {
      if (oldProps[key] !== value) {
        if (key.startsWith('on')) {
          const eventName = key.toLowerCase().substring(2);
          element.removeEventListener(eventName, oldProps[key]);
          element.addEventListener(eventName, value as EventListener);
        } else if (key === 'className') {
          element.className = value as string;
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(element.style, value);
        } else {
          element.setAttribute(key, value as string);
        }
      }
    });
  }

  private updateChildren(container: HTMLElement, oldChildren: VNode[], newChildren: VNode[]): void {
    const maxLength = Math.max(oldChildren.length, newChildren.length);
    
    for (let i = 0; i < maxLength; i++) {
      if (i >= oldChildren.length) {
        // New child
        const childElement = this.render(newChildren[i]);
        container.appendChild(childElement);
      } else if (i >= newChildren.length) {
        // Remove old child
        if (container.children[i]) {
          container.removeChild(container.children[i]);
        }
      } else {
        // Update existing child
        this.patch(container.children[i] as HTMLElement, oldChildren[i], newChildren[i]);
      }
    }
  }

  // Clear the container
  clear(): void {
    this.container.innerHTML = '';
    this.currentVNode = null;
  }
}
