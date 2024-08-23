const { 
    SlashCommandBuilder, 
    ChatInputCommandInteraction, 
    Client, 
    ActionRowBuilder, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder,  // Add this import
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    ModalBuilder, 
    PermissionFlagsBits, 
    TextInputBuilder, 
    TextInputStyle, 
    RoleSelectMenuBuilder, 
    ChannelSelectMenuBuilder, 
    ChannelType, 
    PermissionsBitField 
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staffinfo')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Staff Information'),
    async execute(interaction) {

        const embed1 = new EmbedBuilder()
            .setTitle('Staff Information')
            .setDescription(`> Welcome to RRS Staff Team. This channel will provide all the information you will need to understand about hosting, commands and more.
                
                in <#1274438211149500517> you must click on the dropdown below and read all of the information provided.`)
                .setColor('#fa7878');

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('sfembed')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Qouta')
                    .setDescription('Qouta')
                    .setValue('qouta'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Information')
                    .setDescription('Information for the staff.')
                    .setValue('sf'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Commands')
                    .setDescription('Session Commands')
                    .setValue('sc')
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({ content: 'Command Sent Below.', ephemeral: true });

        async function sendEmbedMessages() {
            await interaction.channel.send({ embeds: [embed1], components: [row] });
        }

        try {
            await sendEmbedMessages();
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
