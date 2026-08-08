import { User } from "../models/User.js";
import { Group } from "../models/Group.js";

export const CreateGroup = async (req, res) => {
  try {
    const { name, allowMembersToPost, description } = req.body;

    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }

    if (!user.hasLeadershipBadge) {
      return res.status(403).json({
        success: false,
        message:
          "Você ainda não possui o selo de liderança para criar um grupo.",
      });
    }

    const currentLedGroup = await Group.findOne({ leaderId: user._id });
    if (currentLedGroup) {
      return res.status(403).json({
        success: false,
        message: `Você ainda é o líder do grupo "${currentLedGroup.name}". Ceda a liderança para outro membro antes de fundar um novo grupo.`,
      });
    }

    const lastCreatedGroup = await Group.findOne({ creatorId: user._id }).sort({
      createdAt: -1,
    });

    if (lastCreatedGroup && lastCreatedGroup.xp < 10000) {
      return res.status(403).json({
        success: false,
        message: `Para fundar um novo grupo, sua última criação ("${lastCreatedGroup.name}") precisa atingir 10.000 XP. Faltam ${10000 - lastCreatedGroup.xp} XP!`,
      });
    }

    if (!name || !description || allowMembersToPost === undefined) {
      return res.status(400).json({
        success: false,
        message: "Dados incompletos para a criação do grupo.",
      });
    }

    const existingGroup = await Group.findOne({ name });
    if (existingGroup) {
      return res.status(409).json({
        // 409 Conflict é o status ideal para duplicatas
        success: false,
        message: "Esse nome de grupo já está em uso.",
      });
    }

    const createdGroup = await Group.create({
      name,
      allowMembersToPost,
      description,
      leader: user._id,
      creatorId: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Seu grupo foi criado com sucesso!",
      group: createdGroup,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao criar o grupo",
      detail: err.message,
    });
  }
};

export const getGroups = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const groups = await Group.find({
      $or: [{ leader: userId }, { members: userId }],
    })
      .sort({ xp: -1 })
      .lean();

    const groupsWithLeaderFlag = groups.map((group) => {
      const currentLeaderId = group.leader._id.toString();
      const currentUserId = userId.toString();

      return {
        ...group,
        meLeader: currentLeaderId === currentUserId,
      };
    });

    return res.status(200).json({
      success: true,
      groups: groupsWithLeaderFlag,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao carregar os grupos",
      detail: err.message,
    });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { groupId } = req.params;

    const group = await Group.findById(groupId)
      .populate("leader", "username fullName avatar")
      .populate("members", "username fullName avatar");
    if (!group)
      return res.status(404).json({
        success: false,
        message: "Grupo não encontrado.",
      });

    const currentLeaderId = group.leader._id.toString();
    const currentUserId = userId.toString();

    const finalGroup = {
      ...group.toObject(),
      meLeader: group.leader._id.toString() === userId.toString(),

      members: group.members.map((member) => ({
        ...member.toObject(),
        isMe: member._id.toString() === userId.toString(),
      })),
    };

    console.log("Grupo: ", finalGroup);

    return res.status(200).json(finalGroup);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao carregar o grupo",
      detail: err.message,
    });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { groupId } = req.params;
    const { name, description, allowMembersToPost } = req.body;

    if (!name && !description && !allowMembersToPost) {
      return res.status(400).json({
        success: false,
        message: "Nenhum campo foi alterado para realizer a alteração.",
      });
    }

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Grupo não encontrado.",
      });
    }

    if (group.leader.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Apenas o líder do grupo pode editar os dados.",
      });
    }

    if (name && name !== group.name) {
      const existingGroup = await Group.findOne({
        name,
        _id: { $ne: groupId },
      });

      if (existingGroup) {
        return res.status(409).json({
          success: false,
          message: "Já existe um grupo com esse nome.",
        });
      }
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        name,
        description,
        allowMembersToPost,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Grupo atualizado com sucesso.",
      group: updatedGroup,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Houve um erro ao atualizar o grupo.",
      detail: err.message,
    });
  }
};
