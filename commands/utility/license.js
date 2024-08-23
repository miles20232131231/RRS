const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

const licensesDirPath = path.join(__dirname, '../../data/licenses');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('license')
        .setDescription('Set the license status for a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user whose license status you want to set')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The license status (valid or not)')
                .setRequired(true)
                .addChoices(
                    { name: 'Valid', value: 'valid' },
                    { name: 'Not Valid', value: 'not_valid' })),
        
    async execute(interaction) {
        // Check if the user has the FMPD role
        if (!interaction.member.roles.cache.has('1273705335265296435')) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const user = interaction.options.getUser('user');
        const status = interaction.options.getString('status');
        const userId = user.id;
        const filePath = path.join(licensesDirPath, `${userId}.json`);

        if (!fs.existsSync(licensesDirPath)) {
            fs.mkdirSync(licensesDirPath, { recursive: true });
        }

        // Save the license status
        const licenseData = { status, date: new Date() };
        fs.writeFileSync(filePath, JSON.stringify(licenseData, null, 2), 'utf8');

        await interaction.reply({ content: `License status for <@${userId}> has been set to ${status}.`, ephemeral: true });
    },
};
