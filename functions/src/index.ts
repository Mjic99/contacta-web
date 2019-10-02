import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

const auth = admin.auth()

export const getAllUsers = functions.https.onRequest((req, res) => {

  auth.listUsers().then((userRecords) => {
    let userList : any[] = []
    userRecords.users.forEach((user) => userList.push(user))
    res.json(userList)
  }).catch((error) => console.log(error));
})