@SubscribeMessage('sendMessage')
handleSendMessage(client: Socket, payload: string) {
  // Process incoming message
  this.wss.emit('receiveMessage', payload);
}
