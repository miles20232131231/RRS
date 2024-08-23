const { SlashCommandBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settingup')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .setDescription('Gives setting up msg'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const message = "*Setting up! Staff, Boosters, Emergency Services & Content Creators may now join!*";

        await interaction.channel.send(message);

        await interaction.editReply({ content: 'Setting up message sent.' });
    },
};
