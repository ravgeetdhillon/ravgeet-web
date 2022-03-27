import { nanoid } from 'nanoid'

const addNuxtId = (entity) => {
  if (Array.isArray(entity)) {
    return entity.map((item) => ({
      ...item,
      nid: nanoid(),
    }))
  } else if (typeof entity === 'object' && !Array.isArray(entity) && entity !== null) {
    return {
      ...entity,
      nid: nanoid(),
    }
  }
}

export { addNuxtId }
