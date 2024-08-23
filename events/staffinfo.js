const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');

const transcriptDir = './transcripts';
if (!fs.existsSync(transcriptDir)) {
    fs.mkdirSync(transcriptDir, { recursive: true });
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        try {
            // Server Information Interaction
            if (interaction.isStringSelectMenu() && interaction.customId === 'sfembed') {
                let embedResponses = [];
                let components = [];

                switch (interaction.values[0]) {
                    case 'qouta':
                        const qouta = new EmbedBuilder()
                            .setDescription(`<@&1273700260283416619> & <@&1273699191671226481> : All Exempt
                                <@&1273703384054235207> : 5 points
                                <@&1273703788993319046>(low ranking): 8 points.
                                <@&1273703588664971275> 12 points. (cohosting)
                                
                                <@&1273703331625308180> and higher is only allowed to train <@&1273703588664971275>
                                
                                Moderator In Training, Each Session Hosted = 2 Points
                                Moderator In Training, Each Session Co-Hosted = 1 Point
                                
                                Moderator, Senior Moderator & Middle Ranking Team, Each Session Hosted = 3 Points.
                                Moderator, Senior Moderator & Middle Ranking Team, Each Session Co-Hosting = 2 Point`)
                                
                                .setColor(0x5de0e6);

                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.reply({
                                embeds: [qouta],
                                ephemeral: true
                            });
                        }
                        return;

                        case 'sf':
                            const sf = new EmbedBuilder()
                                .setDescription(`1.Always stay professional and kind and respectful at all costs and times at RRS. It does not matter if the member is not respecting you; you always be professional and kind to a user at all times.

                                    2.You CANNOT harass any member in RRS no matter who it is.

                                   3.You are NOT allowed to leak any staff information at all costs to anyone. No matter who. All the things in RRS STAFF stays private.

                                   4.When warning a user in-game you are required to kick them from the session.

                                   5.You are responsible to resolve certain situations. Not cause any or start any.

                                   6.You CANNOT harass any member in RRS no matter who it is.`)
                                .setColor('#fa7878');
                        
                            if (!interaction.replied && !interaction.deferred) {
                                await interaction.reply({
                                    embeds: [sf],
                                    ephemeral: true
                                });
                            }
                            return;


                    case 'sc':
                        const sc = new EmbedBuilder()
                            .setDescription(`/startup
                                /early
                                /over
                                /release`)
                                .setColor('#fa7878');

                        embedResponses.push(sc);
                        break;
                }

                if (embedResponses.length > 0 && !interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        embeds: embedResponses,
                        components,
                        ephemeral: true
                    });
                }
            }
            // Server Ping Button Interaction
            else if (interaction.isButton() && interaction.customId === 'toggle_ping') {
                const roleId1 = '1273706492968570932';
                const member = interaction.member;

                if (member.roles.cache.has(roleId1)) {
                    await member.roles.remove(roleId1);
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({
                            content: 'The <@&1273706492968570932> role has been removed from you.',
                            ephemeral: true
                        });
                    }
                } else {
                    await member.roles.add(roleId1);
                    if (!interaction.replied && !interaction.deferred) {
                        await interaction.reply({
                            content: 'You have been granted the <@&1273706492968570932> role.',
                            ephemeral: true
                        });
                    }
                }
            }
            // Ticketing System Interaction
            else if (interaction.isStringSelectMenu() && interaction.customId === 'ticket_select') {
                // Handle ticket creation
            } else if (interaction.isButton()) {
                // Handle ticket claiming, closing, reopening, etc.
            }
        } catch (error) {
            console.error(`Error handling interaction: ${error}`);
            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({ content: 'An error occurred while handling your request.', ephemeral: true });
                } catch (replyError) {
                    console.error(`Failed to send error reply: ${replyError}`);
                }
            }
        }
    },
};
