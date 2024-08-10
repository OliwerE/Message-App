import { ChatSession } from '../models/ChatSession.js'
import { v4 as randomId } from 'uuid'

/**
 * Socket controller.
 */
export class SocketController {
  /**
   * Authentication middleware.
   *
   * @param {object} socket - Socket object.
   * @param {Function} next - Next function.
   * @returns {Function} - Next function.
   */
  authMiddleware = async (socket, next) => {
    const userSession = socket.request.session
    // console.log(session)
    if (userSession && userSession.user) { // used to be: (session && session.authenticated)
      console.log('true sessionID')
      // find existing session
      const chatSession = await ChatSession.findOne({ username: userSession.user })
      console.log(chatSession)
      console.log('efter find session')

      if (chatSession) {
        console.log('session true')
        socket.sessionID = chatSession.sessionID
        socket.userID = chatSession.userID
        socket.username = chatSession.username

        // Change user to status online
        await ChatSession.updateOne({ username: userSession.user }, { connected: true })

        // Join userID
        socket.join(chatSession.userID)

        return next()
      }

      console.log('check user')
      const session = socket.request.session
      // console.log(session)
      if (!session.user) {
        return next(new Error('Invalid user'))
      }

      console.log('skapa ny session')

      // Create session
      socket.sessionID = randomId()
      socket.userID = randomId()
      socket.username = session.user
      // console.log(socket)

      // Join userID
      socket.join(socket.userID)

      // Store session
      const newChatSession = new ChatSession({
        sessionID: socket.sessionID,
        userID: socket.userID,
        username: socket.username,
        connected: true
      })

      await newChatSession.save()

      next()
    } else {
      console.log('user not auth, socket access denied')
      next(new Error('unauthorized')) // Not returning error???
    }
  }

  /**
   * Handle socket connections.
   *
   * @param {object} socket - Socket object.
   */
  handleConnection = async (socket) => {
    // Put users into an array
    const users = []

    const allUsers = await ChatSession.find({})
    for (let i = 0; i < allUsers.length; i++) {
      users.push({
        userID: allUsers[i].userID,
        username: allUsers[i].username,
        connected: allUsers[i].connected,
        isSelf: socket.userID === allUsers[i].userID
      })
    }

    // console.log(users)
    // socket.emit('chat-room', { msg: 'Welcome to Message App', user: 'Server' }) // fix: don't allow Server as username!
    socket.emit('users', users) // Connected users

    // Add user to all clients except itself
    socket.broadcast.emit('user connected', {
      userID: socket.userID,
      username: socket.request.session.user,
      connected: true
    })

    /*
    socket.on('chat-room', message => { // public chat
      console.log(message)
      console.log(socket.request.session.user)
      // io.sockets.emit('chat-room', { msg: message, status: 200 }) // to all connected
      socket.broadcast.emit('chat-room', { msg: message, user: socket.request.session.user }) // all except sender
      // socket.emit('chat-room', { msg: message, status: 200 }) // only to sender!
    })
    */

    socket.on('private message', ({ content, to }) => {
      /*
      // console.log(content)
      // console.log(to)
      socket.to(to).emit('private message', {
        content,
        from: socket.userID
      })
      */
      console.log(content)
      console.log(to) // To = user1 userID (mottagaren)
      console.log(socket.userID) // = user22 userID (sändaren)

      socket.to(to).to(socket.userID).emit('private message', { // FUNKAR INTE!!
        content,
        from: socket.userID,
        to
      })
    })

    socket.on('disconnect', async () => {
      const matchingSockets = await socket.server.in(socket.userID).allSockets()
      const isDisconnected = matchingSockets.size === 0

      if (isDisconnected) {
        console.log('ALL SOCKETS DISCONNECTED!!!')
        // notify other users
        socket.server.emit('user_disconnected', { userID: socket.userID })

        // update the connection status of the session
        await ChatSession.updateOne({ userID: socket.userID }, {
          userID: socket.userID,
          username: socket.username,
          connected: false
        })
      }
    })
  }
}
