var myRequest = "";

var LIST_COUNTRIES = [
    "Afghanistan",
    "AFRICA",
    "Albania",
    "Algeria",
    "Angola",
    "Antigua and Barbuda",
    "Arab Rep of Egypt",
    "Argentina",
    "Armenia",
    "Aruba",
    "ASIA",
    "Australia",
    "Australia/New Zealand",
    "Austria",
    "Azerbaijan",
    "The Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cote-d-Ivoire",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Caribbean",
    "Central African Republic",
    "Central America",
    "Central Asia",
    "Chad",
    "Channel Islands",
    "Chile",
    "China",
    "Hong Kong SAR-China",
    "Macao SAR China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "Dem Peoples Rep of Korea",
    "Dem Rep of Congo",
    "Denmark",
    "Djibouti",
    "Dominican Republic",
    "Eastern Africa",
    "Eastern Asia",
    "Eastern Europe",
    "Ecuador",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "EUROPE",
    "Federated States of Micronesia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "FYR Macedonia",
    "Gabon",
    "The Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Islamic Republic of Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyz Republic",
    "Lao PDR",
    "LATIN AMERICA AND THE CARIBBEAN",
    "Latvia",
    "Least developed countries",
    "Lebanon",
    "Lesotho",
    "Less developed regions",
    "Less developed regions, excluding China",
    "Less developed regions, excluding least developed countries",
    "Liberia",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Melanesia",
    "Mexico",
    "Micronesia",
    "Middle Africa",
    "Moldova",
    "Mongolia",
    "Montenegro",
    "More developed regions",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nepal",
    "The Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Northern Africa",
    "NORTHERN AMERICA",
    "Northern Europe",
    "Norway",
    "OCEANIA",
    "Oman",
    "Other non-specified areas",
    "Pakistan",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Polynesia",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "RB-de-Venezuela",
    "Rep of Korea",
    "Rep of Yemen",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St-Lucia",
    "St-Vincent and the Grenadines",
    "Samoa",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovak Republic",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South America",
    "South Sudan",
    "South-Central Asia",
    "South-Eastern Asia",
    "Southern Africa",
    "Southern Asia",
    "Southern Europe",
    "Spain",
    "Sri Lanka",
    "West Bank and Gaza",
    "Sub-Saharan Africa",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Rep",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "US Virgin Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vietnam",
    "Western Africa",
    "Western Asia",
    "Western Europe",
    "Western Sahara",
    "World",
    "Zambia",
    "Zimbabwe"];
    
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var ERROR_MESSAGES = [
"The world population is growing as we speak. But we could not find data for your request",
"Sorry, you are not alone in this big world but I could not answer your request. Try with a country name or ask for help",
"Sorry, it is a big world but we could not handle your request at this time. Try again with the name of a country or a continent'",
"Sorry, something went wrong. Try again"
]

var WELCOME_MESSAGES = [
"The world population is growing as we speak.",
"You are not alone in this world.",
"The world is a big place."
]

var handlers = {
    'LaunchRequest': function () {
         //this.emit(':tell', 'Hello! The world population is growing as we speak');
         //ar welcomeIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
         //var welcomeMessage = WELCOME_MESSAGES[welcomeIndex];
         //this.emit(':tell', welcomeMessage);
        this.emit('PopulationIntent');
    },
    'AMAZON.HelpIntent': function () {
        
        var helpIndex = Math.floor(Math.random() * LIST_COUNTRIES.length);
        var helpMessage = LIST_COUNTRIES[helpIndex];
                    
        var speechOutput = "How can I help you? Try a country or a continent,  for example " + helpMessage;
        var reprompt = "How can I help you?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Bye! The world population is growing as we speak');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye! You are not alone in this big world');
    },
    'PopulationIntent': function () {
        
        
        if (this.event.request.intent == null){
            myRequest = "Italy"; 
            var helpIndex = Math.floor(Math.random() * LIST_COUNTRIES.length);
            myRequest = LIST_COUNTRIES[helpIndex];
        } else {
            myRequest = this.event.request.intent.slots.country.value;
            myRequest=fixCountryName(myRequest);
        }
             httpsGet(myRequest,  (myResult,nextResult) => {
                    console.log("sent     : "+ myRequest);
                    console.log("received : " + myResult);
                    console.log("received : " + nextResult);
                    
                    increaseResult=nextResult-myResult;
                    
                    var welcomeIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
                    var welcomeMessage = WELCOME_MESSAGES[welcomeIndex];
            
                    if (myResult == 0){
                        // Get a random error message
                        var errorIndex = Math.floor(Math.random() * ERROR_MESSAGES.length);
                        var errorMessage = ERROR_MESSAGES[errorIndex];
                        this.emit(':tell', errorMessage);
                    } else if(myRequest=='World'){
                        this.emit(':tell', 'The world population today is ' + myResult + ', tomorrow there will be ' + increaseResult + ' people more.');
                    } else {
                         if (increaseResult>0){
                            this.emit(':tell', welcomeMessage + ' The population of ' + myRequest + ' today is ' + myResult + ', tomorrow there will be ' + increaseResult + ' people more.');
                         } else {
                            this.emit(':tell', welcomeMessage + ' The population of ' + myRequest + ' today is ' + myResult + ', tomorrow there will be ' + Math.abs(increaseResult) + ' people less.'); 
                         }
                    }
                }
            );   

    }
};

var https = require('http');
// https is a default part of Node.JS.  Read the developer doc:  https://nodejs.org/api/https.html

function fixCountryName(countryName) {

        // 1 we need to match the names from AMAZON.Country with the ones from http://api.population.io:80/1.0/countries

        var IR = 'Islamic Republic of Iran';
        var NL = 'The Netherlands';
        var UK = 'United Kingdom';
        var US = 'United States';
        var CH = 'China';
     
        var EG = 'Arab Rep of Egypt';
        var BA = 'Bosnia and Herzegovina';
        var BN = 'Brunei Darussalam';
        var HK = 'Hong Kong SAR-China';
        var MO = 'Macao SAR China';
        var CZ = 'Czech Republic';
        var KP = 'Dem Peoples Rep of Korea';
        var PS = 'West Bank and Gaza';
        
        // 2 we need to map the names of the continents as not supported by AMAZON.Country and capitalized in population.io
        
        var EUROPE = 'EUROPE';
        var ASIA = 'ASIA';
        var AFRICA = 'AFRICA';
        var CENTRAL_AMERICA = 'Central America';
        var CENTRAL_ASIA = 'Central Asia';
        var OCEANIA = 'OCEANIA';
        var NORTHERN_AMERICA = 'NORTHERN AMERICA';
        var SOUTH_AMERICA = 'South America';
        
        var EASTERN_AFRICA = 'Eastern Africa';
        var EASTERN_ASIA = 'Eastern Asia';
        var EASTERN_EUROPE = 'Eastern Europe';
        var WESTERN_AFRICA = 'Western Africa';
        var WESTERN_ASIA = 'Western Asia';
        var WESTERN_EUROPE = 'Western Europe';
        var SOUTHERN_AFRICA = 'Southern Africa';
        var SOUTHERN_ASIA = 'Southern Asia';
        var SOUTHERN_EUROPE = 'Southern Europe';

        // 3 we need to map the different possible names of the world
        
        var WORLD = 'World';     
                
        if(countryName==null){
            countryName=WORLD;
        } else if(countryName.toUpperCase() =='CHINA'){
            countryName=CH;
        } else if(countryName.toUpperCase()=='THE NETHERLANDS'){
            countryName=NL;
        } else if(countryName.toUpperCase()=='IRAN'){ 
            countryName=IR;
        } else if(countryName.toUpperCase()=='NETHERLANDS'){ 
            countryName=NL;
        } else if(countryName.toUpperCase()=='HOLLAND'){ 
            countryName=NL;
        } else if(countryName.toUpperCase()=='UK'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()=='THE UNITED KINGDOM'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()=='US'){ 
            countryName=US;
        } else if(countryName.toUpperCase()=='USA'){ 
            countryName=US;
        } else if(countryName.toUpperCase()=='ENGLAND'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()=='WALES'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()=='SCOTLAND'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()=='NORTHERN IRELAND'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()=='GREAT BRITAIN'){ 
            countryName=UK;
        } else if(countryName.toUpperCase()==ASIA){ 
            countryName=ASIA;
        } else if(countryName.toUpperCase()==EUROPE){ 
            countryName=EUROPE;
        } else if(countryName.toUpperCase()==AFRICA){ 
            countryName=AFRICA;
        } else if(countryName.toUpperCase()=='EVERYWHERE'){ 
            countryName=WORLD;
        } else if(countryName.toUpperCase()=='GLOBAL'){ 
            countryName=WORLD;
        } else if(countryName.toUpperCase()=='EARTH'){ 
            countryName=WORLD;
        } else if(countryName.toUpperCase()=='THE PLANET'){ 
            countryName=WORLD;
        } else if(countryName.toUpperCase()=='PLANET'){ 
            countryName=WORLD;
        } else if(countryName.toUpperCase()=='EGYPT'){ 
            countryName=EG;
        } else if(countryName.toUpperCase()=='BOSNIA'){ 
                    countryName=BA;
        } else if(countryName.toUpperCase()=='BRUNEI'){ 
                    countryName=BN;
        } else if(countryName.toUpperCase()=='CZECHIA'){ 
                    countryName=CZ;
        } else if(countryName.toUpperCase()=='CZECH'){ 
                    countryName=CZ;
        } else if(countryName.toUpperCase()=='NORTH KOREA'){ 
                    countryName=KP;
        } else if(countryName.toUpperCase()==CENTRAL_AMERICA){ 
                    countryName=CENTRAL_AMERICA;
        } else if(countryName.toUpperCase()==CENTRAL_ASIA){ 
                    countryName=CENTRAL_ASIA;
        } else if(countryName.toUpperCase()==SOUTH_AMERICA){ 
                    countryName=SOUTH_AMERICA;
        }else if(countryName.toUpperCase()==OCEANIA){ 
                    countryName=OCEANIA;
        }else if(countryName.toUpperCase()==NORTHERN_AMERICA){ 
                    countryName=NORTHERN_AMERICA;
        }else if(countryName.toUpperCase()=='NORTH AMERICA'){ 
                    countryName=NORTHERN_AMERICA;
        }else if(countryName.toUpperCase()=='PALESTINE'){ 
                    countryName=PS;
        } else if(countryName.toUpperCase()=='GAZA'){ 
                    countryName=PS;
        } else if(countryName.toUpperCase()=='WEST BANK'){ 
                    countryName=PS;
        } 
        
        // what is the output of the parsing?
        
        console.log("countryName : " + countryName);
        return countryName;
}

function httpsGet(myData, callback) {

    console.log("path     : " + '/1.0/population/' + encodeURIComponent(myData) + '/today-and-tomorrow/');
    var options = {
        host: 'api.population.io',
        port: 80,
        path: '/1.0/population/' + encodeURIComponent(myData) + '/today-and-tomorrow/' ,
        // path: '/1.0/population/Italy/today-and-tomorrow/' ,
        method: 'GET',

    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            
            var pop = 0;
            var pop2 = 0;
            if (JSON.parse(returnData).total_population != null){
                pop = JSON.parse(returnData).total_population[0].population;
                pop2 = JSON.parse(returnData).total_population[1].population;
            }

            callback(pop,pop2);  // this will execute whatever function the caller defined, with one argument

        });

    });
    req.end();

}

