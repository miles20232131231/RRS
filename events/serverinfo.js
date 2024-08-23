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
            if (interaction.isStringSelectMenu() && interaction.customId === 'information_select') {
                let embedResponses = [];
                let components = [];

                switch (interaction.values[0]) {
                    case 'sguild':
                        const comingSoonEmbed = new EmbedBuilder()
                            .setDescription(` 
## Peacetime Rules:

**Peacetime Enabled:**
- FRP speed limited to 80 MPH
-  No crimes
- Do not evade Staff or the Police
- Do not run red lights

**Strict Peacetime:**
- FRP speed limited to 75 MPH
- No drifting
- No crimes
- Evading Staff or law enforcement is not allowed
- Running red lights is not allowed
- Off-roading is not allowed
- Drive responsibly

**Peacetime Off:**
- Speeds over 80 MPH are allowed
- Drifting is allowed
- Robberies are allowed
- Evasion of law enforcement is allowed

## Banned Roleplays

- Drug and alcohol-related roleplay
- Gang-related roleplay
- Suicide-related roleplay
- Public shooting roleplay`)
                                .setColor(0x5de0e6);

                        if (!interaction.replied && !interaction.deferred) {
                            await interaction.reply({
                                embeds: [comingSoonEmbed],
                                ephemeral: true
                            });
                        }
                        return;

                        case 'links':
                            const DiscordLinks = new EmbedBuilder()
                                .setTitle('Discord Links')
                                .setDescription(`Welcome to the discord links channel. This is where you would get links linked to our server.`)
                                .addFields(
                                    { name: 'Discord Server', value: 'https://discord.gg/dCgFM5rRdP', inline: true },
                                    { name: 'Youtube Channel', value: 'https://www.youtube.com/@rrs_swfl', inline: true },
                                    { name: 'EMS Server', value: '**Coming Soon**', inline: true },
                                    { name: 'Copy Right Handbook', value: 'https://docs.google.com/document/d/1B6Zb0BzTVUwfwE5JlLikbb4xQod6KvqPWyBgqouf6pc/edit?usp=sharing', inline: false }
                                )
                                .setColor(0x5de0e6);
                        
                            if (!interaction.replied && !interaction.deferred) {
                                await interaction.reply({
                                    embeds: [DiscordLinks],
                                    ephemeral: true
                                });
                            }
                            return;


                    case 'sping':
                        const sessionPingEmbed = new EmbedBuilder()
                            .setTitle('Session Ping')
                            .setDescription('Press the button below to receive the <@&1273706492968570932> role. When you have the  "Sessions" role it will ping you when a session starts/occurs.')
                            .setColor(0x5de0e6);

                        const pingButton = new ButtonBuilder()
                            .setCustomId('toggle_ping')
                            .setLabel('Session Ping')
                            .setStyle(ButtonStyle.Primary);

                        components.push(new ActionRowBuilder().addComponents(pingButton));
                        embedResponses.push(sessionPingEmbed);
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
