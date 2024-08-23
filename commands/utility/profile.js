const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const path = require('path');
const fs = require('fs');

const dataDirPath = path.join(__dirname, '../../data/vehicleData');
const licensesDirPath = path.join(__dirname, '../../data/licenses');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Displays your or another user\'s profile.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user to view their profile. If not selected, shows your profile.')),

    async execute(interaction) {
        const selectedUser = interaction.options.getUser('user') || interaction.user;
        const userId = selectedUser.id;
        const userTag = selectedUser.tag;
        const userFilePath = path.join(dataDirPath, `${userId}.json`);
        const licenseFilePath = path.join(licensesDirPath, `${userId}.json`);

        let userVehicles = [];
        let licenseStatus = 'No license information available.';

        if (fs.existsSync(userFilePath)) {
            userVehicles = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
        }

        if (fs.existsSync(licenseFilePath)) {
            const licenseData = JSON.parse(fs.readFileSync(licenseFilePath, 'utf8'));
            licenseStatus = `Status: ${licenseData.status.charAt(0).toUpperCase() + licenseData.status.slice(1)}\nDate Set: ${new Date(licenseData.date).toLocaleString()}`;
        }

        const vehicleList = userVehicles.length > 0
            ? userVehicles.map((v, index) => 
                `**${index + 1}.** Year: ${v.year}, Make: ${v.make}, Model: ${v.model}, Color: ${v.color}, Number Plate: ${v.numberPlate}`).join('\n')
            : 'No vehicles registered.';

        const embed = new EmbedBuilder()
            .setDescription(`User: ${userTag}
                Registered Vehicles: **${userVehicles.length}**
                License Status:\n**${licenseStatus}**`)
            .setColor('#fa7878')
            .setThumbnail(selectedUser.displayAvatarURL());

        const viewButton = new ButtonBuilder()
            .setCustomId(`view_vehicles_${userId}`)
            .setLabel('View Vehicles')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(viewButton);

        const profileMessage = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        const filter = i => i.customId.startsWith('view_vehicles_') && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            const userId = i.customId.split('_')[2];
            if (i.customId === `view_vehicles_${userId}`) {
                const userVehiclesFilePath = path.join(dataDirPath, `${userId}.json`);
                let userVehiclesList = [];
                if (fs.existsSync(userVehiclesFilePath)) {
                    userVehiclesList = JSON.parse(fs.readFileSync(userVehiclesFilePath, 'utf8'));
                }

                const vehiclesList = userVehiclesList.length > 0
                    ? userVehiclesList.map((v, index) => 
                        `**${index + 1}.** Year: ${v.year}, Make: ${v.make}, Model: ${v.model}, Color: ${v.color}, Number Plate: ${v.numberPlate}`).join('\n')
                    : 'No vehicles registered.';

                const vehiclesEmbed = new EmbedBuilder()
                    .setTitle(`${selectedUser.tag}'s Registered Vehicles`)
                    .setDescription(vehiclesList)
                    .setColor('#fa7878');

                await i.reply({ embeds: [vehiclesEmbed], ephemeral: true });
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                interaction.editReply({ components: [] }).catch(console.error);
            }
        });
    },
};
