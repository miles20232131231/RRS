const { SlashCommandBuilder, ChatInputCommandInteraction, Client, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, PermissionFlagsBits, TextInputBuilder, TextInputStyle, RoleSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-information')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Server Information'),
    async execute(interaction) {
        const image = new AttachmentBuilder('https://cdn.discordapp.com/attachments/1274435479831318692/1274613944765517844/image.png?ex=66c2e43d&is=66c192bd&hm=14043877f536bfec729bfb41cfdbd51550e73c9793b093d3f71d47025941813f&', { name: 'server-info.png' });

        const embed1 = new EmbedBuilder()
            .setTitle('Server Information')
            .setDescription('> Welcome to RRS (Roblox Roleplay Section), Read the rules below to get to know the server more well.')
            .setColor(0x5de0e6);

        const embed2 = new EmbedBuilder()
            .setTitle('Rule 1: No NSFW')
            .setDescription('> Sending any NSFW (Not Safe For Work) links or images around any channels in this server will lead to big consequences.')
            .setColor(0x5de0e6);
            
        const embed3 = new EmbedBuilder()
            .setTitle('Rule 2: Bad Source Of Language')
            .setDescription('> Any source of offensive language is prohibited from this server. If you see anyone saying racial slurs, bad words, etc., please report it to the staff team.')
            .setColor(0x5de0e6);
            
        const embed4 = new EmbedBuilder()
            .setTitle('Rule 3: No Spamming')
            .setDescription('> Spamming in this server will result in a 1-hour mute. If the spamming continues, it will lead to a 24-hour mute.')
            .setColor(0x5de0e6); 

        const embed5 = new EmbedBuilder()
            .setTitle('Rule 4: Respect Privacy')
            .setDescription('> Do not distribute private messages, personal information, or any other private content without permission. Always respect people\'s privacy.')
            .setColor(0x5de0e6);
        
        const embed6 = new EmbedBuilder()
            .setTitle('Rule 5: No Impersonation')
            .setDescription('> Impersonation of other members or the staff — deliberately using their names or avatars is strictly prohibited. Impersonation is deceitful and will be punished.')
            .setColor(0x5de0e6);
        
        const embed7 = new EmbedBuilder()
            .setTitle('Rule 6: Follow Discord Terms of Service')
            .setDescription('> All users must adhere to Discord\'s Terms of Service and Community Guidelines. Activities or behaviors that violate these terms are not allowed in this server.')
            .setColor(0x5de0e6);

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('information_select')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Session Guidelines')
                    .setDescription('Guidelines for the session.')
                    .setValue('sguild'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Discord Server Links')
                    .setDescription('Links that are linked to the RRS discord server.')
                    .setValue('links'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Session Ping')
                    .setDescription('Get pinged when a session starts/occurs.')
                    .setValue('sping')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

        async function sendEmbedMessages() {
            await interaction.channel.send({ embeds: [embed1, embed2, embed3, embed4, embed5, embed6, embed7], components: [row], files: [image] });
        }

        try {
            await sendEmbedMessages();
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
