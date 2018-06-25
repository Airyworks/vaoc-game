import { VNodeData } from './vnode-data'

export class VNode {
  public data?: VNodeData
  public children?: VNode[]
  public key?: string | number
  public parent?: VNode
  public isRoot: boolean

  constructor(
    data?: VNodeData,
    children?: VNode[],
    key?: string | number,
    parent?: VNode,
    isRoot?: boolean
  ) {
    this.data = data
    this.children = children
    this.key = key
    this.parent = parent
    this.isRoot = isRoot ? isRoot : false
  }
}
