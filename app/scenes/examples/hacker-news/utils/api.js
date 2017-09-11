import firebase from 'firebase/app'
import 'firebase/database'
import hackernews from 'firebase-hackernews'

const hnservice = hackernews.init(firebase)

export default hnservice
