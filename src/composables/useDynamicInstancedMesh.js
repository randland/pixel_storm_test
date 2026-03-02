import { shallowRef } from 'vue'
import { toRef } from '@vueuse/core'
import { InstancedMesh, Matrix4, Color } from 'three'
import useDynamicList from '@/composables/useDynamicList'

const START_CAPACITY = 1000

export default function useDynamicInstancedMesh(geometry, material, capacity) {
  capacity = toRef(capacity || START_CAPACITY)
  const mesh = shallowRef()
  const propsList = useDynamicList()

  // Reusable objects to avoid allocations during updates
  const matrix = new Matrix4()
  const color = new Color()

  // Allocates a new InstancedMesh with the current capacity and disposes the old one
  const allocateMesh = () => {
    const oldMesh = mesh.value
    mesh.value = new InstancedMesh(geometry, material, capacity.value)
    oldMesh?.dispose()

    propsList.markAllDirty()
    resetCount()
  }

  // Doubles the capacity of the mesh and reallocates it
  const enlargeMesh = () => {
    capacity.value *= 2
    allocateMesh()
  }

  // Resets the mesh count to match the number of items in the props list
  const resetCount = () => mesh.value.count = propsList.items.length

  // Adds a new instance with the given properties and returns its index
  const add = (props) => {
    // If we've reached capacity, double the size of the mesh
    if (propsList.items.length >= capacity.value) {
      enlargeMesh()
    }

    const index = propsList.add(props)
    resetCount()
    return index
  }

  // Removes the instance at the given index and returns its properties
  const remove = (index) => {
    const item = propsList.remove(index)
    if (item) resetCount()
    return item
  }

  const update = (index, props) => {
    if (index < 0 || index >= propsList.items.length) return false

    const existing = propsList.items[index]
    propsList.items[index] = { ...existing, ...props }
    propsList.markDirty(index)

    return true
  }

  const setPosition = (index, {x, y, z}) => {
    matrix.setPosition(x, y, z)
    mesh.value.setMatrixAt(index, matrix)
  }

  const setColor = (index, colorValue) => {
    color.set(colorValue)
    mesh.value.setColorAt(index, color)
  }

  const flush = () => {
    if (propsList.dirty.size === 0) return

    propsList.dirty.forEach(index => {
      const { x = 0, y = 0, z = 0, color = "#FFFFFF" } = propsList.items[index]

      setPosition(index, {x, y, z})
      setColor(index, color)
    })

    mesh.value.instanceMatrix.needsUpdate = true
    mesh.value.instanceColor.needsUpdate = true
     
    propsList.flush()
  }

  // Initial mesh allocation
  allocateMesh()

  return {
    mesh,
    add,
    remove,
    update,
    flush,
  }
}
