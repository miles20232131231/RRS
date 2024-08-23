const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startup')
        .setDescription('Sends a startup embed')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.MuteMembers)
        .addIntegerOption(option =>
            option.setName('reactions')
                .setDescription('Amount of reactions for the session to occur')
                .setRequired(true)),
    async execute(interaction) {
        const reactions = interaction.options.getInteger('reactions');
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle('Session Startup')
            .setDescription(` <@${interaction.user.id}> started a session. Before the session starts, make sure you have read the server information at <#1273637976672440374>.
                
                To get more information about Early Access, press the button below. To register your vehicle you can go to <#1274438046783377512> and excute the command named /register.
                
                In order for this session to commence this message needs **${reactions}**+.`)
            .setColor('#fa7878')
            .setFooter({
                text: 'Roblox Roleplay Section',
                iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
            });

        const earlyAccessButton = new ButtonBuilder()
            .setCustomId('learn_early_access')
            .setLabel('Learn about Early Access')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(earlyAccessButton);

        const message = await interaction.channel.send({
            content: '<@1114487029925937232>',
            embeds: [embed],
            components: [row]
        });

        await message.react('✅');

        const newEmbed = new EmbedBuilder()
            .setTitle("Session Startup")
            .setDescription(`<@${interaction.user.id}> has started up a session. The reaction count for the session has been set to ${reactions}+`)
            .setColor('#fa7878')
            .setFooter({
                text: 'Roblox Roleplay Section',
                iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
            });

        const targetChannel = await interaction.client.channels.fetch('1274438972650815723');
        await targetChannel.send({ embeds: [newEmbed] });

        const filter = (reaction, user) => reaction.emoji.name === '✅';

        const collector = message.createReactionCollector({ filter, time: 86400000 });

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.count} reactions`);
            if (reaction.count >= reactions) {
                const settingUpEmbed = new EmbedBuilder()
                    .setDescription('Setting up!')
                    .setColor('#fa7878')
                    .setFooter({
                        text: 'Roblox Roleplay Section',
                        iconURL: 'https://cdn.discordapp.com/icons/1273637767368147024/6dd8c3e31233f4b14e4f96a99110d1b1.png?size=4096'
                    });

                interaction.channel.send({ embeds: [settingUpEmbed] });
                collector.stop();
            }
        });

        collector.on('end', collected => {
            console.log(`Collector ended. Total reactions: ${collected.size}`);
        });


        const buttonFilter = i => i.customId === 'learn_early_access' && i.user.id === user.id;
        const buttonCollector = message.createMessageComponentCollector({ buttonFilter, time: 60000 });

        buttonCollector.on('collect', async i => {
            if (i.customId === 'learn_early_access') {
                const hiEmbed = new EmbedBuilder()
                    .setTitle('Learn about Early Access')
                    .setDescription('Early Access is a special permisson(or role) that allows you to join the session early before anyone else. If you would like to buy Early Access you can head over to <#1274438059810754623> click on a dropdown about what can get you early access and many more roles.')
                    .setColor('#1D4DDE');

                await i.reply({ embeds: [hiEmbed], ephemeral: true });
            }
        });

        await interaction.reply({ content: `You Have Initiated A Session Successfully.`, ephemeral: true });
    },
};
