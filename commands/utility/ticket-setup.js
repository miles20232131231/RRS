const { Permissions, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-ticket22')
        .setDescription('Create a ticket')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
    async execute(interaction) {

        await interaction.reply({ content: 'Setting up ticket system...', ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1212943927737589780/1274781262615412797/image.png?ex=66c38011&is=66c22e91&hm=9f49ebf7f30086fcb4090cf78326d17896c15bcecb530cafc5c1eb46d7d35580&";

        const embed = new EmbedBuilder()
            .setTitle('RRS | Server Support')
            .setDescription(`First of all, choose the proper category from the dropdown below in order to open a support ticket. Please be patient as the support team may be solving other requests. Frivolous tickets will have disciplinary actions. Once opened, further instructions will be given regarding the ticket.
                
                **__Important Information:__**
                - Avoid Fake Tickets: Sending fake or useless tickets will result in a server mute and a strike.
                - Requesting Server Assets: Any requests for server assets will result in a warning, and your request will be denied immediately.`)
            .setColor(0x5de0e6)
            .setFooter({
                text: 'Roblox Roleplay Section',
                iconURL: 'https://cdn.discordapp.com/attachments/1274435479831318692/1274445649479340052/SF_2.png?ex=66c2f040&is=66c19ec0&hm=a92aafc03acc090f44c7a2b2658a131b3d63e820e0038d02dd9a39774055580f&'
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ticket_select')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Staff Report',
                    description: 'Report a staff member.',
                    value: 'staff_report',
                },
                {
                    label: 'Civilian Report',
                    description: 'Report a civilian.',
                    value: 'civ_report',
                },
                {
                    label: 'General Support',
                    description: 'Get general support.',
                    value: 'general_support',
                },
            ]);

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        await interaction.channel.send({ embeds: [embed], components: [row], files: [image] });

        await interaction.editReply({ content: 'Ticket system setup complete!', ephemeral: true });
    },
};
