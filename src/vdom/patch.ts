import { VNode } from './vnode'
import { VNodeData } from './vnode-data'

function isSameNode(a: VNode, b: VNode): boolean {
  return a.key === b.key
}

function patch(oldVNode: VNode, newVNode: VNode): void {
  
}
