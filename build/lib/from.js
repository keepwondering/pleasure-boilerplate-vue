import path from 'path'

export function root (...paths) {
  return path.join(__dirname, ...paths)
}

export function src (...paths) {
  return root('src', ...paths)
}

export function dist (...paths) {
  return root('dist', ...paths)
}
