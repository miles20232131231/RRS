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
            
            if (interaction.isStringSelectMenu() && interaction.customId === 'sp') {
                let embedResponses = [];
                let components = [];

                if (interaction.values && interaction.values[0]) {
                    switch (interaction.values[0]) {
                        case 'nb':
                            const nitrooneto3 = new EmbedBuilder()
                                .setTitle('1-3 boosting perks')
                                .setDescription(`<@&1273707007781900360>
                                    <@&1273706938550587444>
                                    <@&1273706844275212328>
                                    40k eco`)
                                .setColor('#1D4DDE');

                                const nitro4plus = new EmbedBuilder()
                                .setTitle('4+ boosting perks')
                                .setDescription(`All 3 perks
                                    <@&1273706584736010291>
                                    70K eco every week.`)
                                .setColor('#1D4DDE');

                            if (!interaction.replied && !interaction.deferred) {
                                await interaction.reply({
                                    embeds: [nitrooneto3, nitro4plus],
                                    ephemeral: true
                                });
                            }
                            return;

                        case 'rb':
                            const rb1 = new EmbedBuilder()
                                .setTitle('Robux Perks')
                                .setDescription(`BVE -400
                                    UBVE - 700
                                    Early Access - 800
                                    Paid Partnership - 650
                                    Image Permisson - 300
                                    250k ECO - 200
                                    500k ECO - 400`)
                                .setColor('#1D4DDE');

                            if (!interaction.replied && !interaction.deferred) {
                                await interaction.reply({
                                    embeds: [rb1],
                                    ephemeral: true
                                });
                            }
                            return;

                        default:
                            throw new Error(`Unexpected select menu value: ${interaction.values[0]}`);
                    }
                } else {
                    throw new Error('No value provided in select menu interaction.');
                }

                if (embedResponses.length > 0 && !interaction.replied && !interaction.deferred) {
                    await interaction.reply({
                        embeds: embedResponses,
                        components,
                        ephemeral: true
                    });
                }
            }
        } catch (error) {
            console.error(`Error handling interaction: ${error.message}`);
            if (!interaction.replied && !interaction.deferred) {
                try {
                    await interaction.reply({ content: 'An error occurred while handling your request.', ephemeral: true });
                } catch (replyError) {
                    console.error(`Failed to send error reply: ${replyError.message}`);
                }
            }
        }
    },
};
