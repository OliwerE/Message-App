/**
   * Socket.io middleware wrapper.
   *
   * @param {object} middleware - Middleware object
   * @returns {object} - Middleware
   */
export const wrap = middleware => (socket, next) => middleware(socket.request, {}, next) // convert a connect middleware to a Socket.IO middleware
