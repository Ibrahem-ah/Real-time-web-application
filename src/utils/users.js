// const UserBlog = require('../models/user');
const RoomBlog = require('../models/room');

const jwt = require('jsonwebtoken');

const addUser = async (room, username) => {
  const roomExist = await RoomBlog.findOne({ room: room });

  if (!roomExist) {
    const room1 = await new RoomBlog({
      room: room,
      users: [{ user: username }],
    }).save();
  } else if (
    roomExist.users.find((usera) => {
      return usera.user === username;
    })
  ) {
    return { error: 'user exist in the room' };
  } else {
    roomExist.users.push({ user: username });
    await roomExist.save();
  }
};


const getUsersInRoom = async (room) => {
  const usersInRoom = await RoomBlog.findOne({ room: room });
  return usersInRoom;
};

const removeUser = async (user) => {
  // get the room that the user in the remove it 
  try {
    const room = await RoomBlog.findOne({ 'users.user': user });
    const userId = room.users.find((a) => {
      if (a.user == user) {
        return a._id;
      }
    });
    await room.users.id(userId._id).remove();
    await room.save();
    return [room, userId];
  } catch (err) {
    console.log('error removing the user');
  }
};

module.exports = { addUser, getUsersInRoom, removeUser };
