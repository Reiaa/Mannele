import { CommandDescriptor } from "../CommandDescriptor";
import { CommandInteraction } from "discord.js";
import { BotServices } from "../BotServices";
import fs from "fs";

export default class CommandStationSchedule implements CommandDescriptor {
    commandName: string = "sources";
    subCommandName: string | null = null;

    async execute(
        interaction: CommandInteraction,
        services: BotServices
    ): Promise<void> {
        services.stats.increment("COMMAND(sources)", interaction.user.id);

        // Init from STARTUP_DATE env var
        let startupDateString = process.env.LAST_STOP_UPDATE;
        let message =
            "Application, produit ou service intégrant les informations ";
        message += "publiques d'horaires des lignes de bus et tramways ";
        message += "issues de l'API open data de la Compagnie des transports ";
        message += "Strasbourgeois (CTS).";
        message +=
            " Données d'addressage [produites par Etalab](https://adresse.data.gouv.fr/donnees-nationales) et obtenues depuis [l'API Adresses](https://geo.api.gouv.fr/adresse), ";
        message +=
            "elles sont publiées sous la [Licence Ouverte](https://www.etalab.gouv.fr/licence-ouverte-open-licence) et";
        message += `ont été mises à jour le ${startupDateString}.`;
        message +=
            "\n\n⚠️  **Exactitude des horaires et données non garantie ([en savoir plus](https://gist.github.com/PopFlamingo/74fe805c9017d81f5f8baa7a880003d0))**";
        message +=
            "\n\n⚠️  **Schedule and data accuracy not guaranteed ([see more info](https://gist.github.com/PopFlamingo/74fe805c9017d81f5f8baa7a880003d0))**";

        message +=
            "\n\nLes informations concernant les horaires sont récupérées en ";
        message += " depuis les serveurs de la CTS lors d'un appel à ";
        message += "une commande correspondante. Certaines données peuvent ";
        message += "correspondre à des horaires théoriques.\n\n";

        message +=
            "Les informations concernant les noms et références des stations ";
        message += `ont été mises à jour le : ${startupDateString}.`;

        await interaction.editReply({ content: message });
    }
}
