const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('over')
        .setDescription('Purges messages from today between specified start and end times, excluding the first 2 messages.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('start-time')
                .setDescription('Start time in HH:MM format')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('end-time')
                .setDescription('End time in HH:MM format')
                .setRequired(true)),
    async execute(interaction) {
        const startTime = interaction.options.getString('start-time');
        const endTime = interaction.options.getString('end-time');

        const now = new Date();
        const start = new Date(now);
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);

        const end = new Date(now);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        end.setHours(endHours, endMinutes, 0, 0);

        if (start > end) {
            end.setDate(end.getDate() + 1); 
        }

        try {
            const messages = await interaction.channel.messages.fetch({ limit: 100 });
            const sortedMessages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);

            const messagesToDelete = sortedMessages.filter((msg, index) => {
                const msgDate = new Date(msg.createdTimestamp);
                return index >= 1 && msgDate >= start && msgDate <= end;
            });

            for (const msg of messagesToDelete.values()) {
                try {
                    await msg.delete();
                } catch (error) {
                    console.error(`Error deleting message with ID ${msg.id}:`, error);
                }
            }

            const embed = new EmbedBuilder()
                .setTitle('Session Over')
                .setDescription(`Thank you for joining the Roblox Roleplay Section session! We hope you had an enjoyable experience throughout the session.
                
                **__Session Details:__**
                
                Session Host: **<@${interaction.user.id}>**
                Start Time: **${startTime}** 
                End Time: **${endTime}** 
                `)
                .setColor('#fa7878')
                .setFooter({
                    text: 'Roblox Roleplay Section',
                    iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
                });

            const newEmbed = new EmbedBuilder()
                .setTitle("Session Over")
                .setDescription(`<@${interaction.user.id}> has ended their session. 
                    All information has been provided in the message and session has been logged in the channel this embed has been sent to.`)
                .setColor('#fa7878')
                .setFooter({
                    text: 'Roblox Roleplay Section',
                    iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
                });
    
            const targetChannel = await interaction.client.channels.fetch('1274438972650815723');
            if (targetChannel && targetChannel.isTextBased()) {
                await targetChannel.send({ embeds: [newEmbed] });
            } else {
                console.error('Target channel is not accessible or does not exist.');
            }

            await interaction.channel.send({ embeds: [embed] });
            await interaction.reply({ content: 'Command sent below.', ephemeral: true });
        } catch (error) {
            console.error('Error deleting messages or sending embeds:', error);
            await interaction.reply({ content: 'Failed to delete messages or send embeds. Please try again later.', ephemeral: true });
        }
    },
};
