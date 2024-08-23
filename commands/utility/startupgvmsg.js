const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup-message-gv')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Startup msg'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1194249419739103375/1275075684284235878/image.png?ex=66c49244&is=66c340c4&hm=07b9b4289ed304ff418017d4435fa2d0857fab1a908ed233feb9f04b62ad83c7&";

        const embed1 = new EmbedBuilder()
            .setTitle('RRS | GV Startup')
            .setDescription("> Hey <@&1273706266924945409>, Welcome to <#1274436382542004407>, this is where our server staff's will host **[Greenville](https://rblx.games/891852901)** Roleplay Sessions for you Civilians to enjoy. If you want to get notified for a session there is a red button named 'Session Ping' if you click it, it gives you a A role, which pings you everytime a session occurs.")
            .setThumbnail("https://cdn.discordapp.com/attachments/1274435479831318692/1274445649479340052/SF_2.png?ex=66c2f040&is=66c19ec0&hm=a92aafc03acc090f44c7a2b2658a131b3d63e820e0038d02dd9a39774055580f&")
            .setColor(0x5de0e6);

        const embed2 = new EmbedBuilder()
            .setTitle('Startup Information')
            .setDescription(`
                - You will be notified here when a session starts! Please do not ask for sessions or re-invites.
                - DO NOT ask for sessions or start times. You will be pinged with the role Sessions when a session starts or in case of any re-invites. Asking will result in a mute.`)
            .setColor(0x5de0e6)
            .setFooter({
                text: 'Roblox Roleplay Section',
                iconURL: 'https://cdn.discordapp.com/attachments/1274435479831318692/1274445649479340052/SF_2.png?ex=66c2f040&is=66c19ec0&hm=a92aafc03acc090f44c7a2b2658a131b3d63e820e0038d02dd9a39774055580f&'
            });
        
        const button1 = new ButtonBuilder()
            .setCustomId('toggle_ping')
            .setLabel('Session Ping')
            .setStyle(ButtonStyle.Primary);

        const button3 = new ButtonBuilder()
            .setLabel('Information')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/channels/1273637767368147024/1273637976672440374');

        const row = new ActionRowBuilder()
            .addComponents(button1, button3);

        await interaction.channel.send({ files: [image], embeds: [embed1, embed2], components: [row] });

        await interaction.editReply({ content: 'Startup message sent.' });
    },
};
