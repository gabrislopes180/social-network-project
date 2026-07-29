import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    // O UUID que você mencionou (pode ser gerado no controller com o módulo 'crypto')
    token: {
      type: String,
      required: true,
      unique: true,
    },
    // Qual grupo é o convite
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    // Quem enviou (o Líder)
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Quem recebeu (O Convidado)
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "0" },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Invite", InviteSchema);
