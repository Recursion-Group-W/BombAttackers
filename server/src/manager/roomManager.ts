  
import { Namespace } from 'socket.io'
  
  import { v4 as uuidv4 } from 'uuid'
import { Rooms } from '../types/multiGame.type'
  
  export default class RoomManager {
    rooms: Rooms = {}
  
    constructor(public ioNspGame: Namespace) {
    }
  
    generateClientId(socket: any) {
      let clientId: string = uuidv4()
      socket.clientId = clientId
      socket.emit('clientId', clientId)
    }
  
   
  
  }