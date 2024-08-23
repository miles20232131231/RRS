const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup-message-swfl')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Startup msg'),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const image = "https://cdn.discordapp.com/attachments/1194249419739103375/1275075889595416606/image.png?ex=66c49275&is=66c340f5&hm=2cdcdb0b86126d52faa058d24b8aa9658e56fbc04f407a05e779acc8f2c77336&";

        const embed1 = new EmbedBuilder()
            .setTitle('RRS | SWFL Startup')
            .setDescription("> Hey <@&1273706266924945409>, Welcome to <#1273709643574542391>, this is where our server staff's will host **[Southwest Florida Beta](https://rblx.games/5104202731)** Roleplay Sessions for you Civilians to enjoy. If you want to get notified for a session there is a red button named 'Session Ping' if you click it, it gives you a A role, which pings you everytime a session occurs.")
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
