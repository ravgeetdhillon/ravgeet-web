import { nanoid } from 'nanoid'

const isObject = (val) => val && typeof val === 'object' && !Array.isArray(val)

const addNuxtId = (obj) => {
  if (!obj || typeof obj !== 'object') return
  if (isObject(obj)) {
    obj.nid = nanoid()
  }
  Object.keys(obj).forEach((k) => addNuxtId(obj[k]))
  return obj
}

export { addNuxtId }
