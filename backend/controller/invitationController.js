import Invitation from "../model/invitation.model.js";

 const sendInvitation = async (req, res) => {
  try {
    const {receiverId } = req.params;
    const senderId = req.user.id; // Assuming `req.user` contains authenticated user info

    if (receiverId === senderId) {
      return res.status(400).json({ message: "You cannot invite yourself." });
    }

    // Check if an invitation already exists
    const existingInvitation = await Invitation.findOne({ sender: senderId, receiver: receiverId });
    if (existingInvitation) {
      return res.status(400).json({ message: "Invitation already sent." });
    }

    const invitation = new Invitation({ sender: senderId, receiver: receiverId });
    await invitation.save();

    res.status(201).json({ message: "Invitation sent successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const acceptInvitation = async (req, res) => {
    try {
      const { invitationId } = req.body;
  
      const invitation = await Invitation.findById(invitationId);
      if (!invitation || invitation.status !== "pending") {
        return res.status(404).json({ message: "Invitation not found or already responded." });
      }
  
      invitation.status = "accepted";
      await invitation.save();
  
      // Create a new conversation
      const conversation = new Conversation({ participants: [invitation.sender, invitation.receiver] });
      await conversation.save();
  
      res.status(200).json({ message: "Invitation accepted. Chat started!", conversation });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


 const declineInvitation = async (req, res) => {
    try {
      const { invitationId } = req.body;
  
      const invitation = await Invitation.findById(invitationId);
      if (!invitation || invitation.status !== "pending") {
        return res.status(404).json({ message: "Invitation not found or already responded." });
      }
  
      invitation.status = "declined";
      await invitation.save();
  
      res.status(200).json({ message: "Invitation declined." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export {acceptInvitation,sendInvitation,declineInvitation};
