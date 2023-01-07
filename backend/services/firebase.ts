import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { FirebaseStorage, getStorage } from 'firebase/storage'

class FirebaseSetup {
  app: FirebaseApp
  firebaseConfig: FirebaseOptions
  storage: FirebaseStorage

  init(config: FirebaseOptions) {
    this.firebaseConfig = config

    this.app = initializeApp(this.firebaseConfig)
    this.storage = getStorage(this.app)
  }
}

export const firebaseApp = new FirebaseSetup()
