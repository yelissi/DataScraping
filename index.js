'use strict';

const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const {
    minInt,
    minDec,
    maxDec
} = require('number-digit');
const fs = require('fs');
const $ = cheerio.load(`<!doctype html>\r\n<html>\r\n

<head> \r\n
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"> \r\n <title>Confirmation de votre commande
    </title> \r\n </head> \r\n

<body style=\"font-family:Arial, Helvetica, sans-serif;margin:0;padding:0;background-color:#dcddd8;\"> \r\n <div
        id=\"mail-background\" style=\"font-family:Arial, Helvetica,
        sans-serif;margin:0;padding:0;background-color:#dcddd8;\"> \r\n <table border=\"0\" cellspacing=\"0\"
            cellpadding=\"0\" id=\"block-header\" style=\"font-family:Arial, Helvetica,
            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td> <img
                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/header-vsc-mail.png\"
                            alt=\"Voyages-SNCF.com\" width=\"980\" height=\"111\"> </td> \r\n </tr> \r\n </tbody>\r\n
        </table> \r\n <br> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"font-family:Arial,
            Helvetica, sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td id=\"main-column\"
                        width=\"620\" valign=\"top\" style=\"padding:0 0 0 20px;\"> \r\n <table border=\"0\"
                            cellspacing=\"0\" cellpadding=\"0\" width=\"620\" id=\"block-command\" class=\"digital-box\"
                            style=\"font-family:Arial, Helvetica,
                            sans-serif;font-size:11px;color:#000000;background-color:#ffffff;border-radius:3px;box-shadow:0
                            2px 8px rgba(0, 0, 0, 0.6);\"> \r\n <tbody>\r\n <tr> \r\n <td class=\"digital-box-cell\"
                                        style=\"padding:20px;\"> \r\n <table border=\"0\" cellspacing=\"0\"
                                            cellpadding=\"0\" width=\"100%\" id=\"intro\" style=\"font-family:Arial,
                                            Helvetica, sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr>
                                                    \r\n <td>
                                                        <h1 id=\"intro-title\"
                                                            style=\"font-size:16px;text-transform:uppercase;border-bottom:1px
                                                            solid #ecedeb;padding-bottom:4px;\">Confirmation de votre
                                                            commande</h1>
                                                    </td> \r\n </tr> \r\n <tr> \r\n <td id=\"social-sharing\"
                                                        style=\"padding-top:5px;\"> \r\n <table border=\"0\"
                                                            cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                            style=\"font-family:Arial, Helvetica,
                                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n
                                                                <tr> \r\n </tr> \r\n </tbody>\r\n </table>
                                                    </td> \r\n </tr> \r\n <tr> \r\n <td height=\"20\"></td> \r\n </tr>
                                                \r\n <tr> \r\n <td id=\"intro-hello\"
                                                        style=\"color:#e05206;font-weight:bold;padding:2px 0;\"> Bonjour
                                                        Madame dupont MARJOLAINE </td> \r\n </tr> \r\n <tr> \r\n <td>
                                                        Vous avez effectué une commande sur notre site le
                                                        23/06/2016&nbsp;à 11h43 et nous vous en remercions. Vous
                                                        trouverez ci-dessous le détail de votre commande ainsi que la
                                                        démarche à suivre pour la suite de votre voyage. </td> \r\n
                                                </tr> \r\n </tbody>\r\n </table> <br> <br> \r\n <table border=\"0\"
                                            cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" class=\"product-header\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;font-weight:bold;background-color:#e05206;color:#000000;\">
                                            \r\n <tbody>\r\n <tr> \r\n <td width=\"50\" align=\"center\"
                                                        class=\"product-type\" style=\"color:#ffffff;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/icon-train.png\"
                                                            alt=\"Train Aller-retour\"> </td> \r\n <td width=\"5\"
                                                        style=\"color:#ffffff;\"><img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/separateur.png\"
                                                            alt=\" | \"></td> \r\n <td class=\"cell\"
                                                        style=\"color:#ffffff;padding:1px 8px;\">
                                                        <p class=\"od\" style=\"margin:4px 0;padding:0;\">PARIS <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/journey-roundtrip.png\"
                                                                alt=\"<=>\"> LYON</p>
                                                    </td> \r\n <td width=\"5\" style=\"color:#ffffff;\"><img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/separateur.png\"
                                                            alt=\" | \"></td> \r\n <td width=\"100\" align=\"center\"
                                                        style=\"color:#ffffff;\"> 4 passagers </td> \r\n <td width=\"5\"
                                                        style=\"color:#ffffff;\"><img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/separateur.png\"
                                                            alt=\" | \"></td> \r\n <td width=\"85\" align=\"right\"
                                                        class=\"cell\" style=\"color:#ffffff;padding:1px 8px;\"> 315,50
                                                        € </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table
                                            border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td
                                                        class=\"product-travel-date\" style=\"font-family:Arial,
                                                        Helvetica,
                                                        sans-serif;font-size:12px;color:#e05206;font-weight:bold;padding:10px
                                                        0 2px 0;\"> Vendredi 2 Septembre </td> \r\n </tr> \r\n </tbody>
                                            \r\n </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                            width=\"100%\" class=\"product-details\" style=\"font-family:Arial,
                                            Helvetica, sans-serif;font-size:11px;color:#000000;border:1px solid
                                            #4d4f53;\"> \r\n <tbody>\r\n <tr> \r\n <td width=\"55\" align=\"center\"
                                                        rowspan=\"2\" class=\"travel-way\" style=\"font-weight:bold;\">
                                                        Aller </td> \r\n <td width=\"45\"
                                                        class=\"origin-destination-hour segment-departure\"
                                                        style=\"font-weight:bold;font-size:12px;color:#e05206;padding-top:5px;padding-bottom:2px;\">
                                                        16h57 </td> \r\n <td width=\"245\"
                                                        class=\"origin-destination-station segment-departure\"
                                                        style=\"font-weight:bold;padding-top:5px;padding-bottom:2px;\">
                                                        PARIS GARE DE LYON </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\" class=\"segment\" style=\"padding:0 3px;\"> TGV
                                                    </td> \r\n <td align=\"center\" rowspan=\"2\" class=\"segment\"
                                                        style=\"padding:0 3px;\"> 6687 </td> \r\n <td width=\"115\"
                                                        align=\"center\" rowspan=\"2\" class=\"segment
                                                        segment-departure\" style=\"padding:0
                                                        3px;padding-top:5px;padding-bottom:2px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/HAN.gif\"
                                                            alt=\"\">&nbsp;<img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/BAR.gif\"
                                                            alt=\"\">&nbsp; </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\"> 1e classe </td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"45\" class=\"origin-destination-border
                                                        origin-destination-hour segment-arrival\" style=\"border-top:1px
                                                        solid
                                                        #4d4f53;font-weight:bold;font-size:12px;color:#e05206;padding-top:2px;padding-bottom:5px;\">
                                                        18h56 </td> \r\n <td class=\"origin-destination-border
                                                        origin-destination-station segment-arrival\"
                                                        style=\"border-top:1px solid
                                                        #4d4f53;font-weight:bold;padding-top:2px;padding-bottom:5px;\">
                                                        LYON PART DIEU </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n
                                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"passengers\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;color:#000000;background-color:#e0e1dd;font-size:11px;\"> \r\n
                                            <tbody>\r\n <tr> \r\n <td colspan=\"5\" class=\"spacer\"
                                                        style=\"border-top:2px solid #ffffff;\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td width=\"10\" align=\"center\" valign=\"top\"
                                                        class=\"arrow\" style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>1e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 034 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>2e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 035 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>3e&nbsp;passager</strong> <br>(4 à 11 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 036 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>4e&nbsp;passager</strong> <br>(0 à 3 ans) </td> \r\n <td
                                                        valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">Billet
                                                            Bambin enfant - de 4 ans</span> : Etre âgé de 0 à moins de 4
                                                        ans le jour du départ. Billet échangeable et remboursable sans
                                                        frais avant le départ. Billet non échangeable et non
                                                        remboursable après le départ. </td> \r\n <td width=\"125\"
                                                        valign=\"top\" class=\"placement \" style=\"padding:5px 0;\">
                                                        <img src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 033 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td
                                                        class=\"product-travel-date\" style=\"font-family:Arial,
                                                        Helvetica,
                                                        sans-serif;font-size:12px;color:#e05206;font-weight:bold;padding:10px
                                                        0 2px 0;\"> Dimanche 4 Septembre </td> \r\n </tr> \r\n </tbody>
                                            \r\n </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                            width=\"100%\" class=\"product-details\" style=\"font-family:Arial,
                                            Helvetica, sans-serif;font-size:11px;color:#000000;border:1px solid
                                            #4d4f53;\"> \r\n <tbody>\r\n <tr> \r\n <td width=\"55\" align=\"center\"
                                                        rowspan=\"2\" class=\"travel-way\" style=\"font-weight:bold;\">
                                                        Retour </td> \r\n <td width=\"45\"
                                                        class=\"origin-destination-hour segment-departure\"
                                                        style=\"font-weight:bold;font-size:12px;color:#e05206;padding-top:5px;padding-bottom:2px;\">
                                                        13h05 </td> \r\n <td width=\"245\"
                                                        class=\"origin-destination-station segment-departure\"
                                                        style=\"font-weight:bold;padding-top:5px;padding-bottom:2px;\">
                                                        LYON PART DIEU </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\" class=\"segment\" style=\"padding:0 3px;\"> TGV
                                                    </td> \r\n <td align=\"center\" rowspan=\"2\" class=\"segment\"
                                                        style=\"padding:0 3px;\"> 6618 </td> \r\n <td width=\"115\"
                                                        align=\"center\" rowspan=\"2\" class=\"segment
                                                        segment-departure\" style=\"padding:0
                                                        3px;padding-top:5px;padding-bottom:2px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/HAN.gif\"
                                                            alt=\"\">&nbsp;<img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/BAR.gif\"
                                                            alt=\"\">&nbsp; </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\"> 1e classe </td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"45\" class=\"origin-destination-border
                                                        origin-destination-hour segment-arrival\" style=\"border-top:1px
                                                        solid
                                                        #4d4f53;font-weight:bold;font-size:12px;color:#e05206;padding-top:2px;padding-bottom:5px;\">
                                                        15h01 </td> \r\n <td class=\"origin-destination-border
                                                        origin-destination-station segment-arrival\"
                                                        style=\"border-top:1px solid
                                                        #4d4f53;font-weight:bold;padding-top:2px;padding-bottom:5px;\">
                                                        PARIS GARE DE LYON </td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"passengers\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;color:#000000;background-color:#e0e1dd;font-size:11px;\"> \r\n
                                            <tbody>\r\n <tr> \r\n <td colspan=\"5\" class=\"spacer\"
                                                        style=\"border-top:2px solid #ffffff;\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td width=\"10\" align=\"center\" valign=\"top\"
                                                        class=\"arrow\" style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>1e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. <br><br>
                                                        <img src=\"http://www.voyages-sncf.com/imgs/emails/avantage-inclus-ico.png\"
                                                            alt=\"\">&nbsp;<strong>Fidélité Voyageur</strong> : vous
                                                        cumulez des avantages sur votre aller-retour (2) </td> \r\n <td
                                                        width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 034 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>2e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 035 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>3e&nbsp;passager</strong> <br>(4 à 11 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 036 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>4e&nbsp;passager</strong> <br>(0 à 3 ans) </td> \r\n <td
                                                        valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">Billet
                                                            Bambin enfant - de 4 ans</span> : Etre âgé de 0 à moins de 4
                                                        ans le jour du départ. Billet échangeable et remboursable sans
                                                        frais avant le départ. Billet non échangeable et non
                                                        remboursable après le départ. </td> \r\n <td width=\"125\"
                                                        valign=\"top\" class=\"placement \" style=\"padding:5px 0;\">
                                                        <img src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 033 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        <p class=\"product-spacer\" style=\"margin:20px
                                            210px;padding:0;width:160px;line-height:1px;border-top:2px dotted
                                            #9a9b9c;\"><img src=\"http://www.voyages-sncf.com/imgs/emails/b.gif\"
                                                alt=\"\" height=\"1\" width=\"1\"></p> \r\n <table border=\"0\"
                                            cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" class=\"product-header\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;font-weight:bold;background-color:#e05206;color:#000000;\">
                                            \r\n <tbody>\r\n <tr> \r\n <td width=\"50\" align=\"center\"
                                                        class=\"product-type\" style=\"color:#ffffff;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/icon-train.png\"
                                                            alt=\"Train Aller-retour\"> </td> \r\n <td width=\"5\"
                                                        style=\"color:#ffffff;\"><img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/separateur.png\"
                                                            alt=\" | \"></td> \r\n <td class=\"cell\"
                                                        style=\"color:#ffffff;padding:1px 8px;\">
                                                        <p class=\"od\" style=\"margin:4px 0;padding:0;\">PARIS <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/journey-roundtrip.png\"
                                                                alt=\"<=>\"> AVIGNON</p>
                                                    </td> \r\n <td width=\"5\" style=\"color:#ffffff;\"><img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/separateur.png\"
                                                            alt=\" | \"></td> \r\n <td width=\"100\" align=\"center\"
                                                        style=\"color:#ffffff;\"> 4 passagers </td> \r\n <td width=\"5\"
                                                        style=\"color:#ffffff;\"><img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/separateur.png\"
                                                            alt=\" | \"></td> \r\n <td width=\"85\" align=\"right\"
                                                        class=\"cell\" style=\"color:#ffffff;padding:1px 8px;\"> 378,00
                                                        € </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table
                                            border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td
                                                        class=\"product-travel-date\" style=\"font-family:Arial,
                                                        Helvetica,
                                                        sans-serif;font-size:12px;color:#e05206;font-weight:bold;padding:10px
                                                        0 2px 0;\"> Jeudi 15 Septembre </td> \r\n </tr> \r\n </tbody>
                                            \r\n </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                            width=\"100%\" class=\"product-details\" style=\"font-family:Arial,
                                            Helvetica, sans-serif;font-size:11px;color:#000000;border:1px solid
                                            #4d4f53;\"> \r\n <tbody>\r\n <tr> \r\n <td width=\"55\" align=\"center\"
                                                        rowspan=\"2\" class=\"travel-way\" style=\"font-weight:bold;\">
                                                        Aller </td> \r\n <td width=\"45\"
                                                        class=\"origin-destination-hour segment-departure\"
                                                        style=\"font-weight:bold;font-size:12px;color:#e05206;padding-top:5px;padding-bottom:2px;\">
                                                        16h37 </td> \r\n <td width=\"245\"
                                                        class=\"origin-destination-station segment-departure\"
                                                        style=\"font-weight:bold;padding-top:5px;padding-bottom:2px;\">
                                                        PARIS GARE DE LYON </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\" class=\"segment\" style=\"padding:0 3px;\"> TGV
                                                    </td> \r\n <td align=\"center\" rowspan=\"2\" class=\"segment\"
                                                        style=\"padding:0 3px;\"> 6121 </td> \r\n <td width=\"115\"
                                                        align=\"center\" rowspan=\"2\" class=\"segment
                                                        segment-departure\" style=\"padding:0
                                                        3px;padding-top:5px;padding-bottom:2px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/HAN.gif\"
                                                            alt=\"\">&nbsp;<img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/BAR.gif\"
                                                            alt=\"\">&nbsp; </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\"> 1e classe </td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"45\" class=\"origin-destination-border
                                                        origin-destination-hour segment-arrival\" style=\"border-top:1px
                                                        solid
                                                        #4d4f53;font-weight:bold;font-size:12px;color:#e05206;padding-top:2px;padding-bottom:5px;\">
                                                        19h17 </td> \r\n <td class=\"origin-destination-border
                                                        origin-destination-station segment-arrival\"
                                                        style=\"border-top:1px solid
                                                        #4d4f53;font-weight:bold;padding-top:2px;padding-bottom:5px;\">
                                                        AVIGNON TGV </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n
                                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"passengers\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;color:#000000;background-color:#e0e1dd;font-size:11px;\"> \r\n
                                            <tbody>\r\n <tr> \r\n <td colspan=\"5\" class=\"spacer\"
                                                        style=\"border-top:2px solid #ffffff;\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td width=\"10\" align=\"center\" valign=\"top\"
                                                        class=\"arrow\" style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>1e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 002 - Place 024 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>2e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 002 - Place 025 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>3e&nbsp;passager</strong> <br>(4 à 11 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 002 - Place 026 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>4e&nbsp;passager</strong> <br>(0 à 3 ans) </td> \r\n <td
                                                        valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">Billet
                                                            Bambin enfant - de 4 ans</span> : Etre âgé de 0 à moins de 4
                                                        ans le jour du départ. Billet échangeable et remboursable sans
                                                        frais avant le départ. Billet non échangeable et non
                                                        remboursable après le départ. </td> \r\n <td width=\"125\"
                                                        valign=\"top\" class=\"placement \" style=\"padding:5px 0;\">
                                                        <img src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 002 - Place 023 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td
                                                        class=\"product-travel-date\" style=\"font-family:Arial,
                                                        Helvetica,
                                                        sans-serif;font-size:12px;color:#e05206;font-weight:bold;padding:10px
                                                        0 2px 0;\"> Dimanche 18 Septembre </td> \r\n </tr> \r\n </tbody>
                                            \r\n </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                            width=\"100%\" class=\"product-details\" style=\"font-family:Arial,
                                            Helvetica, sans-serif;font-size:11px;color:#000000;border:1px solid
                                            #4d4f53;\"> \r\n <tbody>\r\n <tr> \r\n <td width=\"55\" align=\"center\"
                                                        rowspan=\"2\" class=\"travel-way\" style=\"font-weight:bold;\">
                                                        Retour </td> \r\n <td width=\"45\"
                                                        class=\"origin-destination-hour segment-departure\"
                                                        style=\"font-weight:bold;font-size:12px;color:#e05206;padding-top:5px;padding-bottom:2px;\">
                                                        15h42 </td> \r\n <td width=\"245\"
                                                        class=\"origin-destination-station segment-departure\"
                                                        style=\"font-weight:bold;padding-top:5px;padding-bottom:2px;\">
                                                        AVIGNON TGV </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\" class=\"segment\" style=\"padding:0 3px;\"> TGV
                                                    </td> \r\n <td align=\"center\" rowspan=\"2\" class=\"segment\"
                                                        style=\"padding:0 3px;\"> 6122 </td> \r\n <td width=\"115\"
                                                        align=\"center\" rowspan=\"2\" class=\"segment
                                                        segment-departure\" style=\"padding:0
                                                        3px;padding-top:5px;padding-bottom:2px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/HAN.gif\"
                                                            alt=\"\">&nbsp;<img
                                                            src=\"http://www.voyages-sncf.com/imgs/services/BAR.gif\"
                                                            alt=\"\">&nbsp; </td> \r\n <td width=\"70\" align=\"center\"
                                                        rowspan=\"2\"> 1e classe </td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"45\" class=\"origin-destination-border
                                                        origin-destination-hour segment-arrival\" style=\"border-top:1px
                                                        solid
                                                        #4d4f53;font-weight:bold;font-size:12px;color:#e05206;padding-top:2px;padding-bottom:5px;\">
                                                        18h30 </td> \r\n <td class=\"origin-destination-border
                                                        origin-destination-station segment-arrival\"
                                                        style=\"border-top:1px solid
                                                        #4d4f53;font-weight:bold;padding-top:2px;padding-bottom:5px;\">
                                                        PARIS GARE DE LYON </td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"passengers\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;color:#000000;background-color:#e0e1dd;font-size:11px;\"> \r\n
                                            <tbody>\r\n <tr> \r\n <td colspan=\"5\" class=\"spacer\"
                                                        style=\"border-top:2px solid #ffffff;\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td width=\"10\" align=\"center\" valign=\"top\"
                                                        class=\"arrow\" style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>1e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. <br><br>
                                                        <img src=\"http://www.voyages-sncf.com/imgs/emails/avantage-inclus-ico.png\"
                                                            alt=\"\">&nbsp;<strong>Fidélité Voyageur</strong> : vous
                                                        cumulez des avantages sur votre aller-retour (2) </td> \r\n <td
                                                        width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 034 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>2e&nbsp;passager</strong> <br>(26 à 59 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 035 <br> <br> Salle basse - Fenêtre -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>3e&nbsp;passager</strong> <br>(4 à 11 ans) </td> \r\n
                                                    <td valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">BILLET
                                                            CARTE ENFANT+</span> : Carte Enfant+ en cours de validité à
                                                        présenter à bord du train. Billet échangeable et remboursable
                                                        sans frais à l'émission du billet puis avec des frais de 5 € la
                                                        veille et le jour du départ. A ces frais s'ajoute l'éventuelle
                                                        différence de prix entre l'ancien et le nouveau billet. Billet
                                                        non échangeable et non remboursable après le départ. </td> \r\n
                                                    <td width=\"125\" valign=\"top\" class=\"placement \"
                                                        style=\"padding:5px 0;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 036 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                        width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                        style=\"padding:5px;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                            alt=\"\"> </td> \r\n <td width=\"75\" valign=\"top\"
                                                        class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                        <strong>4e&nbsp;passager</strong> <br>(0 à 3 ans) </td> \r\n <td
                                                        valign=\"top\" class=\"fare-details \" style=\"padding:5px 15px
                                                        5px 5px;\"> <span class=\"fare-name\"
                                                            style=\"font-size:11px;font-weight:bold;text-transform:uppercase;\">Billet
                                                            Bambin enfant - de 4 ans</span> : Etre âgé de 0 à moins de 4
                                                        ans le jour du départ. Billet échangeable et remboursable sans
                                                        frais avant le départ. Billet non échangeable et non
                                                        remboursable après le départ. </td> \r\n <td width=\"125\"
                                                        valign=\"top\" class=\"placement \" style=\"padding:5px 0;\">
                                                        <img src=\"http://www.voyages-sncf.com/imgs/emails/fr/placement/placement-place-assise.png\"
                                                            alt=\"Place assise\"> \r\n
                                                        <hr> Voiture 001 - Place 033 <br> <br> Salle basse - Couloir -
                                                        Club quatre </td> \r\n <td width=\"10\"></td> \r\n </tr> \r\n
                                                <tr> \r\n <td colspan=\"5\" class=\"spacer\" style=\"border-top:2px
                                                        solid #ffffff;\"></td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        <br> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"push with-picto\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;border:1px solid #e0e1dd;\"> \r\n
                                            <tbody>\r\n <tr> \r\n <td class=\"picto\" width=\"125\"
                                                        style=\"padding:0;text-align:center;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/ftl/push-garantie-voyage.png\"
                                                            alt=\"La Garantie Voyage ®\"> </td> \r\n <td
                                                        class=\"message\" style=\"padding:10px;padding-left:0;\"> Pour
                                                        vos parcours avec TGV ou INTERCITES en France, vous bénéficiez
                                                        de LA GARANTIE VOYAGE. \r\n <div class=\"more-info-container\"
                                                            style=\"text-align:right;\"> \r\n <a
                                                                href=\"http://www.voyages-sncf.com/ext/editorial/guide-voyageur/garantie-voyage.pdf?rfrr=VscMailConf_Command_Push\"
                                                                class=\"more-info\"
                                                                style=\"color:#0088ce;text-decoration:underline;\">En
                                                                savoir +</a> \r\n </div>
                                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <div id=\"cards\">
                                            \r\n <div id=\"bloc-card-product\"> \r\n <table class=\"simple-space\"
                                                    height=\"5\" style=\"font-family:Arial, Helvetica,
                                                    sans-serif;font-size:11px;color:#000000;padding-top:10px;\"></table>
                                                \r\n
                                                <!-- Entete de la carte --> \r\n <table border=\"0\" cellspacing=\"0\"
                                                    cellpadding=\"0\" width=\"100%\" style=\"font-family:Arial,
                                                    Helvetica, sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>
                                                        \r\n <tr class=\"product-header\" style=\"font-family:Arial,
                                                            Helvetica,
                                                            sans-serif;font-size:12px;font-weight:bold;background-color:#e05206;color:#ffffff;\">
                                                            \r\n <td valign=\"middle\" align=\"center\" height=\"15\"
                                                                width=\"31\" style=\"color:#ffffff;\"> <img
                                                                    src=\"http://www.voyages-sncf.com/imgs/emails/commons/css/img/ico_subscribe.png\"
                                                                    alt> </td> \r\n <td class=\"card-name\"
                                                                align=\"left\" height=\"15\" width=\"370\"
                                                                style=\"color:#ffffff;padding-left:20px;font-size:12px;font-weight:bold;\">
                                                                Carte Enfant+ </td> \r\n <td class=\"amount\"
                                                                valign=\"middle\" align=\"right\" height=\"15\"
                                                                width=\"100\" style=\"color:#ffffff;\"> 75,00
                                                                €&nbsp;&nbsp; </td> \r\n </tr> \r\n </tbody>\r\n
                                                </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                                    class=\"card-details\" style=\"font-family:Arial, Helvetica,
                                                    sans-serif;font-size:11px;color:#4d4f53;border:1px solid
                                                    #4d4f53;font-weight:bold;width:100%;\"> \r\n <tbody>\r\n <tr> \r\n
                                                            <td rowspan=\"2\" align=\"right\" width=\"55\"> Au nom
                                                                de&nbsp;:&nbsp; </td> \r\n <td class=\"classe\"
                                                                rowspan=\"2\" align=\"left\" width=\"30%\"
                                                                style=\"padding-left:5px;color:#e05206;font-weight:bold;font-family:Arial,
                                                                Helvetica, sans-serif;font-size:12px;\"> THEO dupont
                                                            </td> \r\n <td class=\"date-validity\" align=\"right\"
                                                                width=\"110\" height=\"20\"> Valable du&nbsp;:&nbsp;
                                                            </td> \r\n <td class=\"date-validity-content\"
                                                                align=\"right\" width=\"85\" height=\"20\"
                                                                style=\"color:#e05206;font-weight:bold;font-family:Arial,
                                                                Helvetica, sans-serif;font-size:12px;\"> 02 septembre
                                                                2016 </td> \r\n <td style=\"padding-right:1em;\"
                                                                rowspan=\"2\" align=\"center\" width=\"2\">&nbsp;</td>
                                                            \r\n </tr> \r\n <tr> \r\n <td class=\"owner\"
                                                                align=\"right\" height=\"20\" width=\"100\"
                                                                style=\"border-top:1px solid #4d4f53;\"> au&nbsp;:&nbsp;
                                                            </td> \r\n <td class=\"owner-content\" align=\"right\"
                                                                width=\"45\" height=\"20\"
                                                                style=\"color:#e05206;border-top:1px solid
                                                                #4d4f53;font-weight:bold;font-family:Arial, Helvetica,
                                                                sans-serif;font-size:12px;\"> 01 septembre 2017 </td>
                                                            \r\n </tr> \r\n </tbody>\r\n </table> \r\n </div> \r\n
                                        </div>
                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> <br><br> \r\n <table border=\"0\"
                            cellspacing=\"0\" cellpadding=\"0\" width=\"620\" id=\"block-travel\" class=\"digital-box\"
                            style=\"font-family:Arial, Helvetica,
                            sans-serif;font-size:11px;color:#000000;background-color:#ffffff;border-radius:3px;box-shadow:0
                            2px 8px rgba(0, 0, 0, 0.6);\"> \r\n <tbody>\r\n <tr> \r\n <td class=\"digital-box-cell\"
                                        style=\"padding:20px;\"> \r\n <div id=\"travel-0\" class=\"TKD_WEB\"> \r\n
                                            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                style=\"font-family:Arial, Helvetica,
                                                sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n
                                                        <td class=\"h2-background\" style=\"background-color:#4d4f53;\">
                                                            <h2 style=\"font-family:Arial, Helvetica,
                                                                sans-serif;color:#ffffff;font-size:14px;font-weight:bold;padding:0;margin:3px
                                                                5px;\">Votre voyage</h2>
                                                        </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table
                                                border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                class=\"block-pnr\" style=\"font-family:Arial, Helvetica,
                                                sans-serif;font-size:11px;color:#000000;font-weight:bold;background-color:#ecedeb;\">
                                                \r\n <tbody>\r\n <tr> \r\n <td colspan=\"2\" class=\"pnr-summary\"
                                                            style=\"padding:7px 0 0
                                                            20px;color:#e05206;font-size:14px;\"> PARIS
                                                            &nbsp;&lt;&gt;&nbsp; LYON &nbsp;-&nbsp; les&nbsp;02/09/2016
                                                            et&nbsp;04/09/2016 </td> \r\n </tr> \r\n <tr> \r\n <td
                                                            class=\"pnr-ref\" style=\"padding:10px 0 10px 20px;\">
                                                            Référence&nbsp;de&nbsp;dossier&nbsp;: <span
                                                                class=\"pnr-info\"
                                                                style=\"color:#0088ce;font-size:14px;text-transform:uppercase;\">
                                                                SOQUUL&nbsp;|&nbsp;SOQUYW </span> </td> \r\n <td
                                                            class=\"pnr-name\" style=\"padding:10px 20px;\">
                                                            Nom&nbsp;associé&nbsp;: <span class=\"pnr-info\"
                                                                style=\"color:#0088ce;font-size:14px;text-transform:uppercase;\">
                                                                dupont </span> </td> \r\n </tr> \r\n </tbody>\r\n
                                            </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                                width=\"100%\" class=\"delivery-mode\" style=\"font-family:Arial,
                                                Helvetica, sans-serif;font-size:11px;color:#000000;padding-top:15px;\">
                                                \r\n <tbody>\r\n <tr> \r\n <td width=\"65\" valign=\"top\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/deliveryMode/dm_demat_off.png\"
                                                                alt=\"\"> </td> \r\n <td valign=\"top\"> \r\n <table
                                                                border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                                                width=\"100%\" class=\"delivery-mode-name\"
                                                                style=\"font-family:Arial, Helvetica,
                                                                sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>
                                                                    \r\n <tr> \r\n <td> Vous avez choisi : &nbsp; <span
                                                                                class=\"label\"
                                                                                style=\"color:#0088ce;font-size:14px;font-weight:bold;\">le
                                                                                e-billet</span> </td> \r\n <td
                                                                            width=\"100\"
                                                                            class=\"primary-link-container\"
                                                                            style=\"background-color:#0088ce;border-width:1px;border-style:solid;border-color:#304ea6
                                                                            #304ea6 #065680
                                                                            #065680;text-align:center;border-radius:3px;margin:5px
                                                                            0;height:25px;\"> <a
                                                                                href=\"http://www.voyages-sncf.com/services-train/suivi-commande?ownerName=dupont&amp;pnrRef=SNIKXP&amp;rfrr=VscMailConf_Travel_ButtonPrintTicket\"
                                                                                class=\"primary-link\"
                                                                                style=\"color:#ffffff;font-size:13px;font-weight:bold;text-decoration:none;padding:5px
                                                                                0;\"> &nbsp; &nbsp; Imprimer &nbsp;
                                                                                &nbsp; </a> </td> \r\n </tr> \r\n
                                                                </tbody>\r\n </table> \r\n <table border=\"0\"
                                                                cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                                style=\"font-family:Arial, Helvetica,
                                                                sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>
                                                                    \r\n <tr> \r\n <td>
                                                                            <p style=\"margin:12px 0;padding:0;\">
                                                                                <strong>Besoin d'un justificatif
                                                                                    ?</strong> Inscrivez-vous pour le
                                                                                recevoir par mail (envoi 48h après
                                                                                l'arrivée de votre dernier trajet) <a
                                                                                    class=\"more-info\"
                                                                                    href=\"http://aide.voyages-sncf.com/toute-laide-train/suite-mon-achat/suivi-de-votre-commande/vos-justificatifs-de-voyage?rfrr=VscMailConf_Travel_TKD_TravelProof\"
                                                                                    style=\"color:#0088ce;text-decoration:underline;\">
                                                                                    En savoir plus </a> </p>
                                                                        </td> \r\n </tr> \r\n </tbody>\r\n </table>
                                                        </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table
                                                border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                class=\"passengers\" style=\"font-family:Arial, Helvetica,
                                                sans-serif;color:#000000;background-color:#ecedeb;font-size:11px;\">
                                                \r\n <tbody>\r\n <tr> \r\n <td colspan=\"3\" class=\"spacer\"
                                                            style=\"border-top:2px solid #ffffff;\"></td> \r\n </tr>
                                                    \r\n <tr> \r\n <td width=\"10\" align=\"center\" valign=\"top\"
                                                            class=\"arrow\" style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>1e passager</strong><br> (26 à 59 ans) </td> \r\n
                                                        <td valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\">
                                                                    MARJOLAINE dupont </span> </span> <br> Votre
                                                            e-billet est enregistré directement dans votre carte de
                                                            fidélité.<br>Astuce : téléchargez le code-barres de votre
                                                            carte dans la rubrique \"Mon Compte\" de notre application.
                                                            <br>Lors du contrôle, présentez au choix votre carte de
                                                            fidélité ou son code-barres dans votre mobile. <br> Un SMS
                                                            de rappel de ce voyage vous sera adressé la veille de votre
                                                            voyage au 0661425716. </td> \r\n </tr> \r\n <tr> \r\n <td
                                                            colspan=\"3\" class=\"spacer\" style=\"border-top:2px solid
                                                            #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td width=\"10\"
                                                            align=\"center\" valign=\"top\" class=\"arrow\"
                                                            style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>2e passager</strong><br> (26 à 59 ans) </td> \r\n
                                                        <td valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\"> PHILIPPE
                                                                    dupont </span> </span> <br> Imprimez votre e-billet
                                                            depuis chez vous (papier A4 blanc) ou enregistrez-le
                                                            directement dans votre mobile depuis notre
                                                            application.<br>Le jour du voyage, pas besoin de composter
                                                            votre billet, prenez place directement dans le train.<br>En
                                                            cas d'oubli ou de problème d'impression vous pouvez retirer
                                                            votre billet en Borne Libre Service. </td> \r\n </tr> \r\n
                                                    <tr> \r\n <td colspan=\"3\" class=\"spacer\" style=\"border-top:2px
                                                            solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                            width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                            style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>3e passager</strong><br> (4 à 11 ans) </td> \r\n <td
                                                            valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\"> THEO
                                                                    dupont </span> </span> <br> Imprimez votre e-billet
                                                            depuis chez vous (papier A4 blanc) ou enregistrez-le
                                                            directement dans votre mobile depuis notre
                                                            application.<br>Le jour du voyage, pas besoin de composter
                                                            votre billet, prenez place directement dans le train.<br>En
                                                            cas d'oubli ou de problème d'impression vous pouvez retirer
                                                            votre billet en Borne Libre Service. </td> \r\n </tr> \r\n
                                                    <tr> \r\n <td colspan=\"3\" class=\"spacer\" style=\"border-top:2px
                                                            solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                            width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                            style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>4e passager</strong><br> (0 à 3 ans) </td> \r\n <td
                                                            valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\"> ARTHUR
                                                                    dupont </span> </span> <br> Imprimez votre e-billet
                                                            depuis chez vous (papier A4 blanc) ou enregistrez-le
                                                            directement dans votre mobile depuis notre
                                                            application.<br>Le jour du voyage, pas besoin de composter
                                                            votre billet, prenez place directement dans le train.<br>En
                                                            cas d'oubli ou de problème d'impression vous pouvez retirer
                                                            votre billet en Borne Libre Service. </td> \r\n </tr> \r\n
                                                </tbody>\r\n </table> \r\n <br> \r\n <div
                                                class=\"delivery-mode-complement TKD_WEB\" style=\"font-family:Arial,
                                                Helvetica, sans-serif;font-size:11px;\"> \r\n <p style=\"margin:12px
                                                    0;padding:0;\">Pour assurer le départ à l'heure des TGV, tout
                                                    voyageur doit impérativement monter à bord au plus tard 2 minutes
                                                    avant l'heure de départ. Au-delà de ce délai, l'accès au train n'est
                                                    plus garanti</p> \r\n <p style=\"margin:12px 0;padding:0;\">Vos
                                                    bagages doivent être chacun munis d'une étiquette mentionnant vos
                                                    nom, prénom et adresse.</p> \r\n <p class=\"demat-control-link\"
                                                    style=\"margin:12px 0;padding:0;text-align:right;\"> <a
                                                        href=\"http://www.voyages-sncf.com/services/controle-billets?rfrr=VscMailConf_Travel_TKD_DematControl\"
                                                        style=\"color:#0088ce;\"> En savoir plus </a> </p> \r\n </div>
                                            \r\n <br> \r\n </div> \r\n <div id=\"travel-1\" class=\"TKD_WEB\"> \r\n
                                            <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                style=\"font-family:Arial, Helvetica,
                                                sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n
                                                        <td class=\"h2-background\" style=\"background-color:#4d4f53;\">
                                                            <h2 style=\"font-family:Arial, Helvetica,
                                                                sans-serif;color:#ffffff;font-size:14px;font-weight:bold;padding:0;margin:3px
                                                                5px;\">Votre voyage</h2>
                                                        </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table
                                                border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                class=\"block-pnr\" style=\"font-family:Arial, Helvetica,
                                                sans-serif;font-size:11px;color:#000000;font-weight:bold;background-color:#ecedeb;\">
                                                \r\n <tbody>\r\n <tr> \r\n <td colspan=\"2\" class=\"pnr-summary\"
                                                            style=\"padding:7px 0 0
                                                            20px;color:#e05206;font-size:14px;\"> PARIS
                                                            &nbsp;&lt;&gt;&nbsp; AVIGNON &nbsp;-&nbsp;
                                                            les&nbsp;15/09/2016 et&nbsp;18/09/2016 </td> \r\n </tr> \r\n
                                                    <tr> \r\n <td class=\"pnr-ref\" style=\"padding:10px 0 10px 20px;\">
                                                            Référence&nbsp;de&nbsp;dossier&nbsp;: <span
                                                                class=\"pnr-info\"
                                                                style=\"color:#0088ce;font-size:14px;text-transform:uppercase;\">
                                                                SOUHHS&nbsp;|&nbsp;SOUHKI </span> </td> \r\n <td
                                                            class=\"pnr-name\" style=\"padding:10px 20px;\">
                                                            Nom&nbsp;associé&nbsp;: <span class=\"pnr-info\"
                                                                style=\"color:#0088ce;font-size:14px;text-transform:uppercase;\">
                                                                dupont </span> </td> \r\n </tr> \r\n </tbody>\r\n
                                            </table> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                                width=\"100%\" class=\"delivery-mode\" style=\"font-family:Arial,
                                                Helvetica, sans-serif;font-size:11px;color:#000000;padding-top:15px;\">
                                                \r\n <tbody>\r\n <tr> \r\n <td width=\"65\" valign=\"top\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/deliveryMode/dm_demat_off.png\"
                                                                alt=\"\"> </td> \r\n <td valign=\"top\"> \r\n <table
                                                                border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                                                width=\"100%\" class=\"delivery-mode-name\"
                                                                style=\"font-family:Arial, Helvetica,
                                                                sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>
                                                                    \r\n <tr> \r\n <td> Vous avez choisi : &nbsp; <span
                                                                                class=\"label\"
                                                                                style=\"color:#0088ce;font-size:14px;font-weight:bold;\">le
                                                                                e-billet</span> </td> \r\n <td
                                                                            width=\"100\"
                                                                            class=\"primary-link-container\"
                                                                            style=\"background-color:#0088ce;border-width:1px;border-style:solid;border-color:#304ea6
                                                                            #304ea6 #065680
                                                                            #065680;text-align:center;border-radius:3px;margin:5px
                                                                            0;height:25px;\"> <a
                                                                                href=\"http://www.voyages-sncf.com/services-train/suivi-commande?ownerName=dupont&amp;pnrRef=SNIKXP&amp;rfrr=VscMailConf_Travel_ButtonPrintTicket\"
                                                                                class=\"primary-link\"
                                                                                style=\"color:#ffffff;font-size:13px;font-weight:bold;text-decoration:none;padding:5px
                                                                                0;\"> &nbsp; &nbsp; Imprimer &nbsp;
                                                                                &nbsp; </a> </td> \r\n </tr> \r\n
                                                                </tbody>\r\n </table> \r\n <table border=\"0\"
                                                                cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                                style=\"font-family:Arial, Helvetica,
                                                                sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>
                                                                    \r\n <tr> \r\n <td>
                                                                            <p style=\"margin:12px 0;padding:0;\">
                                                                                <strong>Besoin d'un justificatif
                                                                                    ?</strong> Inscrivez-vous pour le
                                                                                recevoir par mail (envoi 48h après
                                                                                l'arrivée de votre dernier trajet) <a
                                                                                    class=\"more-info\"
                                                                                    href=\"http://aide.voyages-sncf.com/toute-laide-train/suite-mon-achat/suivi-de-votre-commande/vos-justificatifs-de-voyage?rfrr=VscMailConf_Travel_TKD_TravelProof\"
                                                                                    style=\"color:#0088ce;text-decoration:underline;\">
                                                                                    En savoir plus </a> </p>
                                                                        </td> \r\n </tr> \r\n </tbody>\r\n </table>
                                                        </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table
                                                border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                                class=\"passengers\" style=\"font-family:Arial, Helvetica,
                                                sans-serif;color:#000000;background-color:#ecedeb;font-size:11px;\">
                                                \r\n <tbody>\r\n <tr> \r\n <td colspan=\"3\" class=\"spacer\"
                                                            style=\"border-top:2px solid #ffffff;\"></td> \r\n </tr>
                                                    \r\n <tr> \r\n <td width=\"10\" align=\"center\" valign=\"top\"
                                                            class=\"arrow\" style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>1e passager</strong><br> (26 à 59 ans) </td> \r\n
                                                        <td valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\">
                                                                    MARJOLAINE dupont </span> </span> <br> Votre
                                                            e-billet est enregistré directement dans votre carte de
                                                            fidélité.<br>Astuce : téléchargez le code-barres de votre
                                                            carte dans la rubrique \"Mon Compte\" de notre application.
                                                            <br>Lors du contrôle, présentez au choix votre carte de
                                                            fidélité ou son code-barres dans votre mobile. <br> Un SMS
                                                            de rappel de ce voyage vous sera adressé la veille de votre
                                                            voyage au 0661425716. </td> \r\n </tr> \r\n <tr> \r\n <td
                                                            colspan=\"3\" class=\"spacer\" style=\"border-top:2px solid
                                                            #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td width=\"10\"
                                                            align=\"center\" valign=\"top\" class=\"arrow\"
                                                            style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>2e passager</strong><br> (26 à 59 ans) </td> \r\n
                                                        <td valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\"> PHILIPPE
                                                                    dupont </span> </span> <br> Imprimez votre e-billet
                                                            depuis chez vous (papier A4 blanc) ou enregistrez-le
                                                            directement dans votre mobile depuis notre
                                                            application.<br>Le jour du voyage, pas besoin de composter
                                                            votre billet, prenez place directement dans le train.<br>En
                                                            cas d'oubli ou de problème d'impression vous pouvez retirer
                                                            votre billet en Borne Libre Service. </td> \r\n </tr> \r\n
                                                    <tr> \r\n <td colspan=\"3\" class=\"spacer\" style=\"border-top:2px
                                                            solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                            width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                            style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>3e passager</strong><br> (4 à 11 ans) </td> \r\n <td
                                                            valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\"> THEO
                                                                    dupont </span> </span> <br> Imprimez votre e-billet
                                                            depuis chez vous (papier A4 blanc) ou enregistrez-le
                                                            directement dans votre mobile depuis notre
                                                            application.<br>Le jour du voyage, pas besoin de composter
                                                            votre billet, prenez place directement dans le train.<br>En
                                                            cas d'oubli ou de problème d'impression vous pouvez retirer
                                                            votre billet en Borne Libre Service. </td> \r\n </tr> \r\n
                                                    <tr> \r\n <td colspan=\"3\" class=\"spacer\" style=\"border-top:2px
                                                            solid #ffffff;\"></td> \r\n </tr> \r\n <tr> \r\n <td
                                                            width=\"10\" align=\"center\" valign=\"top\" class=\"arrow\"
                                                            style=\"padding:5px;\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-blue.png\"
                                                                alt=\"\"> </td> \r\n <td width=\"100\" valign=\"top\"
                                                            class=\"typology\" style=\"font-size:11px;padding:5px 0;\">
                                                            <strong>4e passager</strong><br> (0 à 3 ans) </td> \r\n <td
                                                            valign=\"top\" class=\"fare-details\" style=\"padding:5px
                                                            15px 5px 5px;\"> <span class=\"passenger\"
                                                                style=\"font-size:12px;line-height:18px;\"> Monsieur
                                                                <span class=\"name\"
                                                                    style=\"font-weight:bold;color:#0088ce;\"> ARTHUR
                                                                    dupont </span> </span> <br> Imprimez votre e-billet
                                                            depuis chez vous (papier A4 blanc) ou enregistrez-le
                                                            directement dans votre mobile depuis notre
                                                            application.<br>Le jour du voyage, pas besoin de composter
                                                            votre billet, prenez place directement dans le train.<br>En
                                                            cas d'oubli ou de problème d'impression vous pouvez retirer
                                                            votre billet en Borne Libre Service. </td> \r\n </tr> \r\n
                                                </tbody>\r\n </table> \r\n <br> \r\n <div
                                                class=\"delivery-mode-complement TKD_WEB\" style=\"font-family:Arial,
                                                Helvetica, sans-serif;font-size:11px;\"> \r\n <p style=\"margin:12px
                                                    0;padding:0;\">Pour assurer le départ à l'heure des TGV, tout
                                                    voyageur doit impérativement monter à bord au plus tard 2 minutes
                                                    avant l'heure de départ. Au-delà de ce délai, l'accès au train n'est
                                                    plus garanti</p> \r\n <p style=\"margin:12px 0;padding:0;\">Vos
                                                    bagages doivent être chacun munis d'une étiquette mentionnant vos
                                                    nom, prénom et adresse.</p> \r\n <p class=\"demat-control-link\"
                                                    style=\"margin:12px 0;padding:0;text-align:right;\"> <a
                                                        href=\"http://www.voyages-sncf.com/services/controle-billets?rfrr=VscMailConf_Travel_TKD_DematControl\"
                                                        style=\"color:#0088ce;\"> En savoir plus </a> </p> \r\n </div>
                                            \r\n </div> \r\n <table class=\"horizontal-separator\" cellspacing=\"0\"
                                            width=\"100%\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;padding:10px 0px 10px
                                            0px;border-top:1px solid #e0e1dd;\"></table> \r\n <table border=\"0\"
                                            cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td
                                                        class=\"h2-background\" style=\"background-color:#4d4f53;\">
                                                        <h2 style=\"font-family:Arial, Helvetica,
                                                            sans-serif;color:#ffffff;font-size:14px;font-weight:bold;padding:0;margin:3px
                                                            5px;\">Votre Carte de réduction</h2>
                                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table border=\"0\"
                                            cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" class=\"block-pnr\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;font-weight:bold;background-color:#ecedeb;\">
                                            \r\n <tbody>\r\n <tr> \r\n <td class=\"pnr-ref\" style=\"padding:10px 0 10px
                                                        20px;\"> Référence&nbsp;de&nbsp;dossier&nbsp;: <span
                                                            class=\"pnr-info\"
                                                            style=\"color:#0088ce;font-size:14px;text-transform:uppercase;\">
                                                            SNIKXP </span> </td> \r\n <td class=\"pnr-name\"
                                                        style=\"padding:10px 20px;\"> Nom&nbsp;associé&nbsp;: <span
                                                            class=\"pnr-info\"
                                                            style=\"color:#0088ce;font-size:14px;text-transform:uppercase;\">
                                                            dupont </span> </td> \r\n </tr> \r\n </tbody>\r\n </table>
                                        \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"delivery-mode\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;padding-top:15px;\"> \r\n <tbody>
                                                \r\n <tr> \r\n <td width=\"65\" valign=\"top\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/deliveryMode/dm_bls.png\"
                                                            alt=\"\"> </td> \r\n <td valign=\"top\"> \r\n <table
                                                            border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                                            width=\"100%\" class=\"delivery-mode-name\"
                                                            style=\"font-family:Arial, Helvetica,
                                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n
                                                                <tr> \r\n <td> Vous avez choisi : &nbsp; <span
                                                                            class=\"label\"
                                                                            style=\"color:#0088ce;font-size:14px;font-weight:bold;\">le
                                                                            retrait en Borne Libre Service</span> </td>
                                                                    \r\n <td>&nbsp;</td> \r\n </tr> \r\n </tbody>\r\n
                                                        </table>
                                                        <p style=\"margin:12px 0;padding:0;\"> Pour retirer votre
                                                            commande, vous devez vous <span class=\"important\"
                                                                style=\"color:#e05206;font-weight:bold;\">munir de votre
                                                                référence dossier mentionnée ci-dessus.</span> </p>
                                                        <p style=\"margin:12px 0;padding:0;\"> Vous devrez présenter
                                                            <span class=\"important\"
                                                                style=\"color:#e05206;font-weight:bold;\">la carte
                                                                bancaire utilisée lors du paiement</span> (carte en
                                                            cours de validité). Votre code confidentiel sera également
                                                            demandé, vous ne serez pas débité. </p>
                                                        <p style=\"margin:12px 0;padding:0;\"> Remarque : pour tout
                                                            retrait de billet en boutique Rail Europe hors de France,
                                                            des frais supplémentaires d'un montant de 10€ (CHF 15.- en
                                                            Suisse) vous seront demandés sur place. </p>
                                                        <p style=\"margin:12px 0;padding:0;\"> Les cartes bancaires
                                                            étrangères à piste magnétique et la carte American Express
                                                            ne peuvent pas être utilisées pour un retrait en Bornes
                                                            libres services. </p>
                                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> <br> \r\n <table
                                            border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            id=\"aftersale-info\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;padding-top:15px;border-top:1px
                                            solid #e0e1dd;\"> \r\n <tbody>\r\n <tr> \r\n <td width=\"65\"
                                                        class=\"picto\" style=\"vertical-align:top;\"> <img
                                                            src=\"http://www.voyages-sncf.com/imgs/emails/picto_echange.jpg\"
                                                            alt=\"\"> </td> \r\n <td class=\"message\"
                                                        style=\"vertical-align:top;padding-right:10px;\"> <span
                                                            style=\"font-weight:bold;color:#0088ce;\">Consulter,
                                                            échanger ou annuler vos commandes :</span><br> Echangez ou
                                                        annulez vos commandes à tout moment en ligne ou depuis votre
                                                        application mobile </td> \r\n <td width=\"115\" class=\"link
                                                        aftersale-web\" style=\"text-align:center;padding:5px
                                                        0;background-color:#e0e1dd;\"> <a
                                                            href=\"http://www.voyages-sncf.com/services-train/suivi-commande?ownerName=dupont&amp;pnrRef=SNIKXP&amp;rfrr=VscMailConf_Travel_AftersaleWeb\"
                                                            class=\"more-info\" title=\"Mes commandes (web)\"
                                                            style=\"color:#0088ce;text-decoration:underline;font-weight:bold;\">
                                                            <img src=\"http://www.voyages-sncf.com/imgs/emails/ftl/aftersale-web.png\"
                                                                alt=\"\" style=\"border:0 none;\"><br> Mes commandes
                                                        </a> </td> \r\n <td width=\"100\" class=\"link
                                                        aftersale-mobile\" style=\"text-align:center;padding:5px
                                                        0;background-color:#e0e1dd;\"> <a
                                                            href=\"http://www.voyages-sncf.com/train/service-apres-vente-mobile?rfrr=VscMailConf_Travel_AftersaleMobile\"
                                                            class=\"more-info\" title=\"Mes billets (mobile)\"
                                                            style=\"color:#0088ce;text-decoration:underline;font-weight:bold;\">
                                                            <img src=\"http://www.voyages-sncf.com/imgs/emails/ftl/aftersale-mobile.png\"
                                                                alt=\"\" style=\"border:0 none;\"><br> Mes billets </a>
                                                    </td> \r\n </tr> \r\n </tbody>\r\n </table>
                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> <br><br> \r\n <table border=\"0\"
                            cellspacing=\"0\" cellpadding=\"0\" width=\"620\" id=\"block-payment\" class=\"digital-box\"
                            style=\"font-family:Arial, Helvetica,
                            sans-serif;font-size:11px;color:#000000;background-color:#ffffff;border-radius:3px;box-shadow:0
                            2px 8px rgba(0, 0, 0, 0.6);\"> \r\n <tbody>\r\n <tr> \r\n <td class=\"digital-box-cell\"
                                        style=\"padding:20px;\"> \r\n
                                        <!--pseudoExchange--> \r\n <table border=\"0\" cellspacing=\"0\"
                                            cellpadding=\"0\" width=\"100%\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:11px;color:#000000;\"> \r\n <tbody>\r\n <tr> \r\n <td
                                                        class=\"h2-background\" style=\"background-color:#4d4f53;\">
                                                        <h2 style=\"font-family:Arial, Helvetica,
                                                            sans-serif;color:#ffffff;font-size:14px;font-weight:bold;padding:0;margin:3px
                                                            5px;\">Récapitulatif de votre commande</h2>
                                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <table border=\"0\"
                                            cellspacing=\"0\" cellpadding=\"10\" width=\"100%\" class=\"content\"
                                            style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:12px;color:#4d4f53;border:1px solid #4d4f53;\"> \r\n
                                            <!--pseudoExchange--> \r\n <tbody>\r\n <tr> \r\n <td class=\"transactions\"
                                                        style=\"color:#000000;\"> Paiement CB accepté pour la carte de
                                                        paiement &nbsp;######000054015# <br><br> \r\n <table
                                                            border=\"0\" cellspacing=\"0\" cellpadding=\"2\"
                                                            width=\"100%\" class=\"transaction-details\"
                                                            style=\"font-family:Arial, Helvetica,
                                                            sans-serif;font-size:12px;color:#4d4f53;\"> \r\n <tbody>\r\n
                                                                <tr> \r\n <td colspan=\"2\" width=\"220\"
                                                                        class=\"important\" style=\"font-weight:bold;\">
                                                                        Transaction n° 129328 (SNCF) </td> \r\n <td
                                                                        align=\"right\" class=\"important\"
                                                                        style=\"font-weight:bold;\"> 768,50 € </td> \r\n
                                                                </tr> \r\n <tr> \r\n <td> Identifiant commerçant </td>
                                                                    \r\n <td> SNCF &nbsp; 055204944722232 </td> \r\n
                                                                    <td></td> \r\n </tr> \r\n <tr> \r\n <td> Date de la
                                                                        transaction </td> \r\n <td> 23 juin 2016
                                                                        11:43:38 (Heure de Paris) </td> \r\n <td></td>
                                                                    \r\n </tr> \r\n <tr> \r\n <td> Autorisation </td>
                                                                    \r\n <td> 520149 </td> \r\n <td></td> \r\n </tr>
                                                                \r\n </tbody>\r\n </table>
                                                    </td> \r\n </tr> \r\n </tbody>\r\n </table> <br> \r\n <table
                                            border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"
                                            class=\"total-amount\" style=\"font-family:Arial, Helvetica,
                                            sans-serif;font-size:14px;color:#565654;padding:5px;background-color:#ecedeb;text-align:right;\">
                                            \r\n <tbody>\r\n <tr> \r\n <td width=\"70%\" class=\"total important\"
                                                        style=\"color:#000000;font-weight:bold;\"> TOTAL payé en ligne :
                                                    </td> \r\n <td align=\"right\" class=\"very-important\"
                                                        style=\"font-weight:bold;color:#e05206;\"> 768,50 € </td> \r\n
                                                </tr> \r\n </tbody>\r\n </table>
                                    </td> \r\n </tr> \r\n </tbody>\r\n </table>
                    </td> \r\n <td id=\"right-column\" width=\"300\" valign=\"top\" style=\"padding:0 0 0 20px;\"> \r\n
                        <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"300\" id=\"block-advertising\"
                            class=\"digital-box\" style=\"font-family:Arial, Helvetica,
                            sans-serif;font-size:11px;color:#000000;background-color:#ffffff;border-radius:3px;box-shadow:0
                            2px 8px rgba(0, 0, 0, 0.6);\"> \r\n <tbody>\r\n <tr> \r\n <td>
                                        <h2 style=\"font-family:Arial, Helvetica,
                                            sans-serif;color:#ffffff;font-size:10px;font-weight:normal;padding:0;margin:0;background-color:#4d4f53;text-transform:uppercase;text-align:center;\">
                                            Publicité</h2>
                                    </td> \r\n </tr> \r\n <tr> \r\n <td> <a
                                            href=\"http://pubads.g.doubleclick.net/gampad/jump?iu=5813/vsc-frfr-mail/confirmation&amp;sz=300x250&amp;c=227934024\">
                                            <img
                                            src=\"http://pubads.g.doubleclick.net/gampad/ad?iu=5813/vsc-frfr-mail/confirmation&amp;sz=300x250&amp;c=227934024\"
                                            alt=\"Publicité\" height=\"250\" width=\"300\" border=\"0\" style=\"border:0
                                            none;\"> </a> </td> \r\n </tr> \r\n </tbody>\r\n </table> <br><br> \r\n <div
                            id=\"block-partners\"> \r\n <table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"
                                width=\"300\" class=\"digital-box\" id=\"block-partners-mobile\"
                                style=\"font-family:Arial, Helvetica,
                                sans-serif;font-size:12px;color:#4d4f53;background-color:#ffffff;border-radius:3px;box-shadow:0
                                2px 8px rgba(0, 0, 0, 0.6);\"> \r\n <tbody>\r\n <tr> \r\n <th class=\"digital-box-cell\"
                                            style=\"padding:10px;border-bottom:1px solid #e0e1dd;text-align:left;\">
                                            <h2 style=\"font-family:Arial, Helvetica,
                                                sans-serif;color:#cb0044;font-size:16px;font-weight:bold;padding:0;margin:0;text-transform:uppercase;\">
                                                Réservez avec votre mobile</h2>
                                        </th> \r\n </tr> \r\n <tr> \r\n <td class=\"digital-box-cell\"
                                            style=\"padding:10px;\"> \r\n <table border=\"0\" cellspacing=\"0\"
                                                cellpadding=\"0\" width=\"100%\" style=\"font-family:Arial, Helvetica,
                                                sans-serif;font-size:12px;color:#4d4f53;\"> \r\n <tbody>\r\n <tr> \r\n
                                                        <td width=\"45\" class=\"picto\"> <img
                                                                src=\"http://www.voyages-sncf.com/imgs/emails/picto_phone.png\"
                                                                alt=\"\" width=\"33\" height=\"49\"> </td> \r\n <td
                                                            class=\"message\" style=\"padding-bottom:10px;\"> Votre
                                                            voyage à portée de main : découvrez nos applications mobiles
                                                            pour réserver, commander et échanger vos billets de train !
                                                        </td> \r\n </tr> \r\n <tr> \r\n <td colspan=\"2\"
                                                            align=\"right\"> <a
                                                                href=\"http://mobile.voyages-sncf.com/?autp=APmobilemai11&amp;rfrr=VscMailConf_Partners_PushMobile\"
                                                                class=\"action\"
                                                                style=\"color:#cb0044;font-weight:bold;\"> Cliquez
                                                                ici<img
                                                                    src=\"http://www.voyages-sncf.com/imgs/emails/ftl/arrow-red.png\"
                                                                    alt=\"\" width=\"8\" height=\"10\" style=\"border:0
                                                                    none;padding-left:5px;\"> </a> </td> \r\n </tr> \r\n
                                                </tbody>\r\n </table>
                                        </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <br>\r\n <br>\r\n </div>
                    </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <br>\r\n <br> \r\n <table border=\"0\"
            cellspacing=\"0\" cellpadding=\"0\" width=\"960\" id=\"block-footer\" style=\"font-family:Arial, Helvetica,
            sans-serif;font-size:11px;color:#000000;padding:0 0 0 20px;\"> \r\n <tbody>\r\n <tr> \r\n <td>
                        <p style=\"margin:12px 0;padding:0;\"> Nous vous remercions de votre confiance et vous
                            souhaitons bon voyage. </p>
                        <p style=\"margin:12px 0;padding:0;\"><strong> A très bientôt sur notre site !<br> L'équipe
                                Voyages-sncf.com </strong></p>
                        <p style=\"margin:12px 0;padding:0;\"> Nous vous conseillons d'imprimer cette page afin de
                            conserver les différentes références de votre commande. Ce mail ne peut en aucun cas
                            remplacer un titre de transport.<br> Merci de ne pas répondre directement à ce mail de
                            confirmation, votre message ne serait pas traité. </p>
                        <p style=\"margin:12px 0;padding:0;\"> Vous pouvez consulter les <a
                                href=\"http://www.voyages-sncf.com/ext/editorial/pdf/cgv/dispositions-generales-sncf.pdf?rfrr=VscMailConf_Footer_LegalSNCF\"
                                style=\"color:#4d4f53;\">Conditions Générales de Vente SNCF</a> ainsi que les <a
                                href=\"http://www.voyages-sncf.com/popup/conditions-generales-de-vente-et-utilisation?rfrr=VscMailConf_Footer_LegalVSC\"
                                style=\"color:#4d4f53;\">Conditions Générales de Vente et d'Utilisation du site
                                voyages-sncf.com</a>. </p>
                        <p class=\"xsell-mentions\" style=\"margin:12px 0;padding:0;font-size:10px;\"> * Hôtel : prix
                            TTC à partir de, sur la base d'une nuit en chambre double ( hors frais de séjour à régler
                            sur place )<br> Voiture : prix par jour, TTC, pour une voiture de catégorie A.<br> Offres
                            valables sous réserve de disponibilité </p>
                        <p class=\"xsell-mentions\" style=\"margin:12px 0;padding:0;font-size:10px;\"> (1) Nombre de
                            points donné à titre indicatif; valable sur votre voyage aller-retour ou aller simple hors
                            trajet IDTGV, TER, Transilien; lié au statut fidélité Voyageur. N'inclut pas les éventuels
                            bonus liés à des promotions. <br> (2) Au moins 1 de vos trajets vous permet de cumuler des
                            avantages fidélité; lié au statut déclaré. N'inclut pas les éventuels bonus liés à des
                            promotions. </p>
                        <p class=\"legal-info\" style=\"margin:12px
                            0;padding:0;font-size:10px;padding-top:10px;border-top:1px solid #b2b4b3;\">
                            VOYAGES-SNCF.COM - S.A. au capital de 10.672.000 euros - RCS Nanterre B 431 810 621 -
                            Licence d'agence de voyages n° LI 092 01 0002 - Garantie financière : APS - R.C. : AXA -
                            Récépissé CNIL n° 745549 </p>
                    </td> \r\n </tr> \r\n </tbody>\r\n </table> \r\n <br> \r\n </div> \r\n <div class=\"hidden\" \"
        style=\"display:none;\"> \r\n <img width=\"1\" height=\"1\" border=\"0\" alt=\"\"
            name=\"s_i_voyagessncfcommailprod\"
            src=\"http://stats.voyages-sncf.com/b/ss/voyagessncfcommailprod/1/H.21--NS/s45440070862693?%5BAQB%5D&amp;ndh=1&amp;ns=voyagessncf&amp;pageName=MailConfLoisir&amp;cc=EUR&amp;ch=Loisir&amp;c1=Train&amp;c2=VenteTrain&amp;c3=Mail&amp;c4=Train%3AMail&amp;c5=Train&amp;c6=Train%3AMail&amp;h1=VSC%2CLoisir%2CTrain%2CVenteTrain%2CMailConfLoisir\">
            \r\n </div> \r\n </body>\r\n </html>`);

// main variables

let testResult = {};
let result = {};
let trips = [];
let custom = {};
let objectTrips = {};
trips[0] = objectTrips;

// function that formates the date

let formateDate = objectDate => {
    let myDate = new Date(objectDate);

    let month = minInt(myDate.getMonth() + 1, 2);
    let days = minInt(myDate.getDate(), 2);
    let hours = minInt(myDate.getHours(), 2);
    let minutes = minInt(myDate.getMinutes(), 2);
    let seconds = minInt(myDate.getSeconds(), 2);
    let mSeconds = minInt(myDate.getMilliseconds(), 3) + 'Z'

    var dateFormated = year + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds + '.' + mSeconds;

    return dateFormated;
}

// function that formates the passenger variable

let formatPassengers = passenger => {
    var result = passenger.replace('<strong>1e&#xA0;passager</strong> <br>', ' ').trim().replace('&#xE0;', 'à');
    if (result === '<strong>2e&#xA0;passager</strong> <br>(26 à 59 ans)') {
        result = passenger.replace('<strong>2e&#xA0;passager</strong> <br>', ' ').trim().replace('&#xE0;', 'à')
    };
    return result;
};

// function that returns booking type

let bookingType = booking => {
    let remboursable = `Billet &#xE9;changeable`;
    let val = booking.search(remboursable);
    if (val == -1) {
        val = 'non échangeable';
    } else {
        val = 'échangeable';
    }
    return val;
};

//cheking the statut of command

var statut = $('#intro-title').text();
if (statut = `Confirmation de votre
commande`) {
    statut = 'ok';
};



testResult.statut = statut;
testResult.result = result;
testResult.result.trips = trips;
testResult.result.custom = custom;


let tabRef = $('.pnr-info').text().replace(/  \s/g, '').replace(/ \s/g, ',').split(',');
let code = tabRef[tabRef.length - 2];
let name = tabRef[tabRef.length - 1].replace(' ', '');
objectTrips.code = code;
objectTrips.name = name;

//objet details

let details = {};
objectTrips.details = details;
testResult.result.trips.details = details;
let price = parseFloat($('.very-important').text().replace(',', '.'));
details.price = price;

//table roundTrips

cheerioTableparser($);
let objectOneRT = {};
let objectTwoRT = {};
let objectThreeRT = {};
let objectFourRT = {};
let roundTrips = [objectOneRT, objectTwoRT, objectThreeRT, objectFourRT];
details.roundTrips = roundTrips;

let rawRoundTrips = $('.product-details').parsetable();
objectOneRT.type = rawRoundTrips[0][0].trim();
objectTwoRT.type = rawRoundTrips[0][2].trim();
objectThreeRT.type = rawRoundTrips[0][4].trim();
objectFourRT.type = rawRoundTrips[0][6].trim();

let date = $('.product-travel-date').text().split('  ');
let dateRef = $('.date-validity-content').text();
let year = new Date(dateRef).getFullYear();




var x = formateDate('30 juin 2016');

objectOneRT.date = formateDate(date[0]);
objectTwoRT.date = formateDate(date[1]);
objectThreeRT.date = formateDate(date[2]);
objectFourRT.date = formateDate(date[3]);

objectOneRT.trains = [];
objectTwoRT.trains = [];
objectThreeRT.trains = [];
objectFourRT.trains = [];

objectOneRT.trains[0] = {};
objectTwoRT.trains[0] = {};
objectThreeRT.trains[0] = {};
objectFourRT.trains[0] = {};

//fist object of roundTrips

objectOneRT.trains[0].departureTime = rawRoundTrips[1][0].trim().replace('h', ':');
objectOneRT.trains[0].departureStation = rawRoundTrips[2][0].trim();
objectOneRT.trains[0].arrivalTime = rawRoundTrips[1][1].trim().replace('h', ':');
objectOneRT.trains[0].arrivalStation = rawRoundTrips[2][1].trim();
objectOneRT.trains[0].type = rawRoundTrips[3][0].trim();
objectOneRT.trains[0].number = rawRoundTrips[4][0].trim();

// second object of roundTrips

objectTwoRT.trains[0].departureTime = rawRoundTrips[1][2].trim().replace('h', ':');
objectTwoRT.trains[0].departureStation = rawRoundTrips[2][2].trim();
objectTwoRT.trains[0].arrivalTime = rawRoundTrips[1][3].trim().replace('h', ':');
objectTwoRT.trains[0].arrivalStation = rawRoundTrips[2][3].trim();
objectTwoRT.trains[0].type = rawRoundTrips[3][2].trim();
objectTwoRT.trains[0].number = rawRoundTrips[4][2].trim();


// third object of roundTrips

objectThreeRT.trains[0].departureTime = rawRoundTrips[1][4].trim().replace('h', ':');
objectThreeRT.trains[0].departureStation = rawRoundTrips[2][4].trim();
objectThreeRT.trains[0].arrivalTime = rawRoundTrips[1][5].trim().replace('h', ':');
objectThreeRT.trains[0].arrivalStation = rawRoundTrips[2][5].trim();
objectThreeRT.trains[0].type = rawRoundTrips[3][4].trim();
objectThreeRT.trains[0].number = rawRoundTrips[4][4].trim();


// fourth object of roundTrips

objectFourRT.trains[0].departureTime = rawRoundTrips[1][6].trim().replace('h', ':');
objectFourRT.trains[0].departureStation = rawRoundTrips[2][6].trim();
objectFourRT.trains[0].arrivalTime = rawRoundTrips[1][7].trim().replace('h', ':');
objectFourRT.trains[0].arrivalStation = rawRoundTrips[2][7].trim();
objectFourRT.trains[0].type = rawRoundTrips[3][6].trim();
objectFourRT.trains[0].number = rawRoundTrips[4][6].trim();

let passengersTable = $('.passengers').parsetable();
let myTablePassengersThree = passengersTable[1].slice(19, 26);
let myTablePassengersFour = passengersTable[1].slice(28, 35);


objectFourRT.trains[0].passengers = [];

let bookingOne = passengersTable[2][1];
let bookingTwo = passengersTable[2][3];
let bookingThree = passengersTable[2][5];
let bookingfour = passengersTable[2][7];

let fisrElementPassengers = {};
fisrElementPassengers.type = bookingType(bookingOne);
fisrElementPassengers.age = formatPassengers(myTablePassengersFour[0]);
objectFourRT.trains[0].passengers[0] = fisrElementPassengers;


let secondElementPassengers = {};
secondElementPassengers.type = bookingType(bookingTwo);
secondElementPassengers.age = formatPassengers(myTablePassengersFour[2]);
objectFourRT.trains[0].passengers[1] = secondElementPassengers;


let thirdElementPassengers = {};
thirdElementPassengers.type = bookingType(bookingThree);
thirdElementPassengers.age = formatPassengers(myTablePassengersThree[0]);
objectFourRT.trains[0].passengers[2] = thirdElementPassengers;


let fourthElementPassengers = {};
fourthElementPassengers.type = bookingType(bookingfour);
fourthElementPassengers.age = formatPassengers(myTablePassengersThree[2]);
objectFourRT.trains[0].passengers[3] = fourthElementPassengers;



let cellTab = $('.cell').text().split('                                ');
let cellOne = parseFloat(cellTab[2].replace('\n', '').trim().replace(',', '.'));
let amountOne = parseFloat(cellOne);

let cellTwo = parseFloat(cellTab[5].replace('\n', '').trim().replace(',', '.'));
let amountTwo = parseFloat(cellTwo);


let amount = $('.amount').text();
let amountThree = parseInt(amount);

custom.prices = [];
custom.prices[0] = {};
custom.prices[1] = {};
custom.prices[2] = {};

custom.prices[0].value = amountOne;
custom.prices[1].value = amountTwo;
custom.prices[2].value = amountThree;



// make the "golobal" object a json

let myResult = JSON.stringify(testResult);

//writing the file test-result2.json

fs.writeFile('test-result2.json', myResult, (err) => {
    if (err) throw err;
    console.log(`The file "test-result2.json" has been created & saved!`);
});
