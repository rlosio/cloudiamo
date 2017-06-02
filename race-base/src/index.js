
var LIST_COUNTRIES = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Angola",
    "Antigua and Barbuda",
    "Egypt",
    "Argentina",
    "Armenia",
    "Australia",
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
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Chad",
    "Channel Islands",
    "Chile",
    "China",
    "Hong Kong",
    "Macao",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "North Korea",
    "Denmark",
    "Djibouti",
    "Dominican Republic",
    "Ecuador",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Micronesia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Macedonia",
    "Gabon",
    "Gambia",
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
    "Iran",
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
    "Lao",
    "Latvia",
    "Lebanon",
    "Lesotho",
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
    "Moldova",
    "Mongolia",
    "Montenegro",
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
    "Norway",
    "Oman",
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
    "South Korea",
    "Yemen",
    "Romania",
    "Russia",
    "Rwanda",
    "St-Lucia",
    "Samoa",
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
    "Spain",
    "Sri Lanka",
    "West Bank and Gaza",
    "Sub-Saharan Africa",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
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
    "Virgin Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vietnam",
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
"The race base database is growing as we speak. But we could not find data for your request",
"Sorry, there are many running events in the world but I could not answer your request. Try with a country name or ask for help",
"Sorry, it is a big world but we could not handle your request at this time. Try again with the name of a country or a city'"
]

// most of the time we do not want a long message after the result

var WELCOME_MESSAGES = [
"The race base database is growing as we speak.",
"",
"",
"",
"Explore, Discover, Race with RaceBase World.",
"",
"",
"",
" Are you ready to run?",
"",
"",
"",
"The world is a big place.  Explore, Discover, Race with RaceBase World.",
"",
"",
"",
"Explore, Discover, Race with RaceBase World.",
"",
"",
"",
"Trail or road races?",
"",
"",
""
]

var handlers = {
    'LaunchRequest': function () {
        this.emit('RaceBaseIntent');
    },
    'AMAZON.HelpIntent': function () {
        
        var helpIndex = Math.floor(Math.random() * LIST_COUNTRIES.length);
        var helpMessage = LIST_COUNTRIES[helpIndex];
                    
        var speechOutput = "The race base database is growing as we speak, how can I help you? Try a country or a city,  for example " + helpMessage;
        var reprompt = "How can I help you?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Bye! Explore, Discover, Race.');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Bye! Explore, Discover, Race.');
    },
    'RaceBaseIntent': function () {

        // default is entire World scenario if no intent city
        var myRequest = 'World';
        // default is marathon is not intent distance
        var myDistance = 'marathon';

        if (this.event.request.intent != null){
            
            if (this.event.request.intent.slots.city != null){
                myRequest = (this.event.request.intent.slots.city.value);
            }
            
            if (this.event.request.intent.slots.distance != null){
                myDistance = (this.event.request.intent.slots.distance.value);
            }
            
            if (myRequest == null || myRequest == ''){
                  myRequest = 'World'; 
            }
            if (myDistance == null || myDistance == ''){
                  myDistance = 'marathon'; 
            } 
            
        }
        
        console.log("myRequest  : "+ myRequest);
        console.log("myDistance : "+ myDistance);
        
        if (myRequest.toUpperCase() == 'WORLD'){
            var helpIndex = Math.floor(Math.random() * LIST_COUNTRIES.length);
            myRequest = LIST_COUNTRIES[helpIndex];
            
            // we need the current value of events and countries, for example  "14190 events in 165 countries"
            httpsGetStats((countries, events) => {

                    console.log("received countries: " + countries);
                    console.log("received events: " + events);

                      this.emit(':tell', 'The Race base world database has currently ' + events + ' events in ' + countries +  ' countries. Which one would you like to run? What about a marathon in ' + myRequest + '?');
      
                        }
                    );  

        } else {

            	httpsGet(myRequest,  myDistance, (myResult,nextResult,dateResult) => {

                    console.log("received : " + myResult);
                    console.log("received : " + nextResult);
                    console.log("received : " + dateResult);

                    
                    var welcomeIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
                    var welcomeMessage = WELCOME_MESSAGES[welcomeIndex];
                    if (myResult == ''){
                                // Get a random error message
                                var errorIndex = Math.floor(Math.random() * ERROR_MESSAGES.length);
                                var errorMessage = ERROR_MESSAGES[errorIndex];
                                this.emit(':tell', errorMessage);
                     } else {
                         this.emit(':tell', ' The next ' +  myDistance +' in ' + myRequest  
                         + ' is the ' + myResult + ' on ' + dateResult + '. ' + welcomeMessage);
                         
                     }
            
            
            
                        }
                    );   
            
        }

    }
};

var https = require('https');
// https is a default part of Node.JS.  Read the developer doc:  https://nodejs.org/api/https.html

// not needed for now....

function fixCountryName(countryName) {

        // 1 we need to match the names from AMAZON.Country with the ones from Mapbox

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

function httpsGet(myData, myDistance, callback) {


    // From=2017-05-26&dateTo=2017-08-26
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var yyyyn = today.getFullYear()+1;
    if(dd<10) {
        dd='0'+dd;
    } 
    
    if(mm<10) {
        mm='0'+mm;
    } 

    var from_date = yyyy+'-'+mm+'-'+dd;
    var to_date = yyyyn+'-'+mm+'-'+dd;
    
    // need to handle the distance slot with mapping:
    //
    // type: 'road_run', 'trail_run'.
    // category: 'marathon', 'half_marathon', '10k', '5k'
    
    var rtype = '';
    var category = 'marathon';
    
    if (myDistance != null){
        myDistance = myDistance.toLowerCase();
    }
    
    if (myDistance != 'marathon'){
        if (myDistance.includes('half')){
            category = 'half_marathon';
        } else  if (myDistance.includes('5')){
            category = '5k';
        } else  if (myDistance.includes('10')){
            category = '10k';
        } 
        
        if (myDistance.includes('trail')){
            rtype = 'trail_run';
        } else if (myDistance.includes('road')){
            rtype = 'road_run';
        }  

    }
    
    console.log("from_date: " + from_date + " to_date. " + to_date + " category: " + category + " type: " + rtype);
    // https://api.trailburning.com/v2/search?sort=date&order=asc&q=Italy&dateFrom=2017-05-26&dateTo=2017-08-26&category=marathon&limit=1&offset=0
    var options = {
        host: 'api.trailburning.com',
        port: 443,
        path: '/v2/search?sort=date&order=asc&q=' + encodeURIComponent(myData) + '&dateFrom=' + from_date + '&dateTo=' + to_date + '&category=' + category + '&limit=1&offset=0&type=' + rtype,
        method: 'GET',

    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            
            var raceName = '';
            var raceDate = '';
            var raceLocation = '';

            if (JSON.parse(returnData).body.raceevents[0] != null){
                raceName     = JSON.parse(returnData).body.raceevents[0].name;
                // raceLocation     = JSON.parse(returnData).body.raceevents[0].\\location;
               raceDate = JSON.parse(returnData).body.raceevents[0].races[0].date;
            }

            callback(raceName,raceLocation,raceDate);  // this will execute whatever function the caller defined, with one argument

        });

    });
    req.end();

}

function httpsGetStats(callback) {

    var options = {
        host: 'api.trailburning.com',
        port: 443,
        path: '/v2/summary',
        method: 'GET',

    };

    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            console.log("JSON body : " + JSON.parse(returnData));
            
            var countries = 0;
            var events = 0;
            if (JSON.parse(returnData).body != null){
                countries = JSON.parse(returnData).body.summary.country_count;
                events = JSON.parse(returnData).body.summary.race_event_count;
            }

            callback(countries,events);  // this will execute whatever function the caller defined, with one argument

        });

    });
    req.end();

}
