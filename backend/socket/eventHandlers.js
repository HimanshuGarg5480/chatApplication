import Message from "../model/message.model.js";
import Conversation from "../model/conversation.model.js";
import { userSocketMap, getRecipientSocketId } from "./utils.js";

export const registerSocketEvents = (io, socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") userSocketMap[userId] = socket.id;

  sendRelevantOnlineUsers(io, userId);
  
  // ✅ Mark Messages as Seen
  socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
    try {
      await Message.updateMany(
        { conversationId, seen: false },
        { $set: { seen: true } }
      );

      await Conversation.updateOne(
        { _id: conversationId },
        { $set: { "lastMessage.seen": true } }
      );

      io.to(getRecipientSocketId(userId)).emit("messagesSeen", { conversationId });
    } catch (error) {
      console.log("Error marking messages as seen:", error);
    }
  });

  // ✅ Handle Disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    sendRelevantOnlineUsers(io, userId);
  });
};

const sendRelevantOnlineUsers = async (io, userId) => {
  try {
    // Get all conversations where the user is a participant
    const conversations = await Conversation.find({ participants: userId });

    // Extract participant IDs from all conversations
    const participantIds = new Set();
    conversations.forEach((conv) => {
      conv.participants.forEach((participantId) => {
        if (participantId !== userId) participantIds.add(participantId.toString());
      });
    });

    // Get only the online participants
    const onlineRelevantUsers = [...participantIds].filter(id => userSocketMap[id]);

    // Send only relevant users to the connected user
    io.emit("getOnlineUsers", onlineRelevantUsers);
  } catch (error) {
    console.error("Error fetching conversation participants:", error);
  }
};
