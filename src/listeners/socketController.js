import { ChatSession } from '../models/ChatSession.js'
import { ChatMessage } from '../models/ChatMessage.js'
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
    if (userSession && userSession.user) {
      // find existing session
      const chatSession = await ChatSession.findOne({ username: userSession.user })

      if (chatSession) {
        socket.sessionID = chatSession.sessionID
        socket.userID = chatSession.userID
        socket.username = chatSession.username

        // Change user to status online
        await ChatSession.updateOne({ username: userSession.user }, { connected: true })

        // Join userID
        socket.join(chatSession.userID)

        return next()
      }

      const session = socket.request.session
      if (!session.user) {
        return next(new Error('Invalid user'))
      }

      // Create session
      socket.sessionID = randomId()
      socket.userID = randomId()
      socket.username = session.user

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

    socket.emit('users', users) // Connected users

    // Add user to all clients except itself
    socket.broadcast.emit('user connected', {
      userID: socket.userID,
      username: socket.request.session.user,
      connected: true
    })

    // Get old messages when open chat
    socket.on('get messages', async ({ chatUserID }) => {
      // Find 10 latest messages in db
      const messages = await ChatMessage.find({
        $or: [
          { to: chatUserID, from: socket.userID },
          { to: socket.userID, from: chatUserID }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(10) // ToDo: get older messages, pagination!

      messages.sort((a, b) => a.createdAt - b.createdAt)

      // Return messages to client
      socket.emit('get messages', {
        messages
      })
    })

    socket.on('private message', async ({ content, to }) => {
      // Save message in DB
      try {
        const newMessage = new ChatMessage({
          message: content,
          from: socket.userID,
          to
        })

        await newMessage.save()
      } catch (err) {
        console.error(err)
      }

      // Send message to recipient

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
        // Notify other users
        socket.server.emit('user_disconnected', { userID: socket.userID })

        // Update the connection status of the session
        await ChatSession.updateOne({ userID: socket.userID }, {
          userID: socket.userID,
          username: socket.username,
          connected: false
        })
      }
    })
  }
}
