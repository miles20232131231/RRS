const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('early')
        .setDescription('Sends the early access embed.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addStringOption(option =>
            option.setName('session-link')
                .setDescription('Link for the session so that EA people can join.')
                .setRequired(true)),
    async execute(interaction) {
        const sessionLink = interaction.options.getString('session-link');

        const embed = new EmbedBuilder()
            .setTitle('Early Access')
            .setDescription('Early Access is now Live! Nitro Boosters, members of the Emergency Services, and Content Creators can join the session by clicking the button below.\n\nPlease keep in mind that sharing the session link with anyone is strictly forbidden and may lead to penalties. We appreciate your cooperation in keeping our community secure and fair for everyone.')
            .setColor('#fa7878')
            .setFooter({
                text: 'Roblox Roleplay Section',
                iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
            });

        const eaButton = new ButtonBuilder()
            .setLabel('Early Access')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('ea');

        const howToGetEaButton = new ButtonBuilder()
            .setLabel('Get Early Access')
            .setStyle(ButtonStyle.Primary)
            .setCustomId('howToGetEa');

        const row = new ActionRowBuilder()
            .addComponents(eaButton, howToGetEaButton);

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Early Access")
            .setDescription(`<@${interaction.user.id}> released early access. The link is provided below\n\n**Link:** ${sessionLink}`)
            .setColor('#fa7878')
            .setFooter({
                text: 'Roblox Roleplay Section',
                iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
            });

        const targetChannel = await interaction.client.channels.fetch('1274438972650815723');
        await targetChannel.send({ embeds: [newEmbed] });

        await interaction.channel.send({ 
            content: '<@&1273706938550587444>, <@&1273704271698726942>, <@&1273704833517359134>', 
            embeds: [embed], 
            components: [row] 
        });

        await interaction.reply({ content: 'Early Access Sent.', ephemeral: true });

        const filter = i => i.customId === 'ea' || i.customId === 'howToGetEa';
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 9999999 });

        collector.on('collect', async i => {
            if (i.customId === 'ea') {
                if (i.member.roles.cache.has('1273706081226326117') || 
                    i.member.roles.cache.has('1273705711011889294') || 
                    i.member.roles.cache.has('1273705335265296435') ||
                    i.member.roles.cache.has('1273704271698726942') || 
                    i.member.roles.cache.has('1273705491452657674') || 
                    i.member.roles.cache.has('1273706938550587444')) { 
                    
                    await i.reply({ content: `**Link:** ${sessionLink}`, ephemeral: true });
                } else {
                    await i.reply({ 
                        content: 'You do not have this special role, given early access to some perks and content previews. If you wish to get this role, go to support ticket and follow the instructions. Start to enjoy all the benefits of being a holder of one of the special roles once you get the role!', 
                        ephemeral: true 
                    });
                }
            } else if (i.customId === 'howToGetEa') {
                const howToGetEaEmbed = new EmbedBuilder()
                    .setTitle('Get Early Access')
                    .setDescription('To get early access, you can become a Nitro Booster, join the Emergency Services, or become a Content Creator in our community. These roles offer various perks, including early access to sessions. If you are interested, please open a support ticket, and we will guide you through the process.')
                    .setColor('#fa7878')
                    .setFooter({
                        text: 'Roblox Roleplay Section',
                        iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
                    });

                await i.reply({ embeds: [howToGetEaEmbed], ephemeral: true });
            }
        });

        collector.on('end', async collected => {
            const logChannel = interaction.guild.channels.cache.get('1274438972650815723');
            if (logChannel) {
                await logChannel.send(`Collected ${collected.size} interactions.`);
            }
        });

        collector.on('error', async error => {
            const logChannel = interaction.guild.channels.cache.get('1274438972650815723');
            if (logChannel) {
                await logChannel.send(`Collector encountered an error: ${error}`);
            }
            console.error('Collector encountered an error:', error);
        });
    },
};
