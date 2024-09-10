import Store from 'electron-store'

const store = new Store()

store.set('appConfig', {
  alignment: 'center',
  commands: {
    'cmd-1': 'echo "Hello World!"',
    'cmd-2': 'echo "Hello World!"'
  }
})

export function getAppConfig() {
  return store.get('appConfig')
}
