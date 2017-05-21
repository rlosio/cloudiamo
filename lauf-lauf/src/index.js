'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined;
var SKILL_NAME = 'Lauf Lauf';

/**
 * Renato Losio 
 * Array containing running facts.
 */
var FACTS = [
"Paula Radcliffe stellte den Weltrekord im Marathon mit einer Zeit von 2 Stunden und 15 Minuten.",
"Roger Bannister war der erste Mensch die Englische Meile in einer Zeit von unter vier Minuten zu laufen.",
"Über eine Milliarde Paar Laufschuhe werden jedes Jahr weltweit verkauft.",
"Der Everest Marathon ist der weltweit höchste Marathon.",
"Seit 2006 ist der Berlin-Marathon jedes Jahr der schnellste der Welt.",
"Die Laufstrecke von Marathon nach Athen war exakt 40 Kilometer.",
"Der Venedig Marathon hat 13 Brücken.",
"Fauja Singh ist der älteste Läufer der Welt und beendete als erster Hundertjähriger einen Marathon.",
"In Großteil der Deutschen läuft am liebsten im Wald.",
"Der New-York-City-Marathon ist der teilnehmerreichste Marathon.",
"Dean Karnazes beendete 50 Marathonläufe-Läufe in allen 50 Vereinigten Staaten von Amerika an 50 Tagen.",
"Dennis Kimett stellte den Weltrekord im Marathon mit einer Zeit von 2 Stunden 2 Minuten und 57 Sekunden.",
"Der Ultra-Trail du Mont-Blanc ist ein Ultramarathon rund um die Mont-Blanc-Gruppe führt.",
"Der Self-Transcendence 3100 Mile Race beträgt 3100 Meilen und ist der längste zertifizierte Lauf der Welt.",
"Die 135 Meilen lange Strecke von den Badwater Ultramarathon führt von Death Valley bis zum Mount Whitney in Kalifornien.",
"Die meisten Läufer wechseln die Schuhe alle 600 Kilometer.",
"Der Istanbul-Marathon ist der einzige Marathon auf zwei Kontinenten.",
"Der Great North Run im Norden Englands ist einer der bedeutendsten Halbmarathons der Welt.",
"Über 500000 Läufer beenden jedes Jahr einen Marathon in den Vereinigten Staaten.",
"Der Médoc-Marathon führt durch 50 Weinberge, an deren Versorgungsständen Weinverkostungen stattfinde.",
"Während eines Marathons machen Läufer etwa 35000 Schritte.",
"In 1960 gewann Abebe Bikila barfuß den Olympischen Marathonlauf.",
"Musik kann die Laufen steigern.",
"Rückwärtslaufen bezeichnet einen Trend im Laufsport, über größere Distanzen rückwärts zu laufen.",
"Der Berlin-Marathon braucht 240000 Liter Wasser und eine Million Plastikbecher."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the running facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Hier ist dein Fakt: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "Du könntest sagen, gib mir eien Fackt. Womit kann ich dir helfen?";
        var reprompt = "Womit kann ich dir helfen?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Tschüss!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Tschüss!');
    }
};
