const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverperks')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Server Perks command.'),
    async execute(interaction) {

        const embed1 = new EmbedBuilder()
            .setTitle('Server Perks')
            .setDescription(`Welcome to the server perks channel. This is where you would get information about getting EA,UBVE,BVE and more. Just know to get these you can boost the server or buy the pass on [Roblox](https://www.roblox.com/home). If you have anything to ask about the server perks or would like to buy it. You can head over to <#1274438059810754623> to get your roles after buying.`)
            .setColor('#1D4DDE');
            
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('sp')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Nitro Boosting')
                    .setDescription('What you get from Nitro Boosting')
                    .setValue('nb'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Robux')
                    .setDescription('What you get from buying our passes off roblox.')
                    .setValue('rb'),
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
