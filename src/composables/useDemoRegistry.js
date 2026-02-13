const modules = import.meta.glob('../demos/**/index.vue')

const registry = Object.entries(modules).reduce((acc, [path, importer]) => {
  const name = path.split('/').slice(-2, -1)[0]
  acc[name] = importer
  return acc
}, {})

const demoNames = Object.keys(registry)

export default function useDemoRegistry() {
  const getComponent = (name) => {
    if (!registry[name]) {
      throw new Error(`Demo component "${name}" not found in registry.`)
    }

    return registry[name]
  }

  return {
    demoNames,
    getComponent,
  }
}
