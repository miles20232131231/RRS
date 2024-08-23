const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim a ticket.'),
  async execute(interaction) {
    const { user, channel } = interaction;

    const embed = new EmbedBuilder()
      .setTitle('Ticket Claimed')
      .setDescription(`Please describe why you have opened this ticket and add any details that will help us process your issue efficiently.\n\n<@${user.id}> will review your doubt/information and help you at the earliest possible.`)
      .setColor(0x2B2D31) 
      .setTimestamp();

    await interaction.reply({ content: 'Claiming Ticket...', ephemeral: true });

    await channel.send({ content: `<@${user.id}>`, embeds: [embed] });

    await interaction.editReply({ content: 'Ticket Claimed!', ephemeral: true });
  },
};
