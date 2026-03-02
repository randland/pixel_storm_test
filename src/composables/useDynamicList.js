import { reactive } from 'vue'

export default function useDynamicList(list = []) {
  const dirty = reactive(new Set())
  const markDirty = (index) => dirty.add(index)
  const markAllDirty = () => {
    for (let i = 0; i < items.length; i++) {
      dirty.add(i)
    }
  }
  const flush = () => dirty.clear()

  const items = reactive(list)

  const add = (item) => {
    items.push(item)
    const index = items.length - 1
    markDirty(index)
    return index
  }

  const remove = (index) => {
    if (index < 0 || index >= items.length) return false

    const removedItem = items[index]
    items[index] = items[items.length - 1]
    items.pop()

    if (index < items.length) markDirty(index)

    return removedItem
  }

  return {
    items,
    dirty,
    add,
    remove,
    markDirty,
    markAllDirty,
    flush,
  }
}
