//Globals
if(! rs_isDefined(rs_refID)) var rs_refID = 2050;							//Refid
if(! rs_isDefined(rs_stateFilter)) var rs_stateFilter = 'ALL';				//Two letter state filter
if(! rs_isDefined(rs_countryFilter)) var rs_countryFilter = 'ALL';			//Two letter country filter
if(! rs_isDefined(rs_petFilter)) var rs_petFilter = 'NO';					//YES or NO, filter by pet-friendly
if(! rs_isDefined(rs_cName)) var rs_cName = 'http://secure.rezserver.com';	//CNAME of the site
if(! rs_isDefined(rs_numCalendars)) var rs_numCalendars = 1;				//Number of months to show in calendar popup
if(! rs_isDefined(rs_popUp)) var rs_popUp = false;							//Show valid-click popup on seach?
if(! rs_isDefined(rs_noAutosuggest)) var rs_noAutosuggest = false;			//Skip autosuggest?
if(! rs_isDefined(rs_vcid)) var rs_vcid = 28948;							//Valid-click ID for the popup
if(! rs_isDefined(rs_allowGroupBooking)) var rs_allowGroupBooking = true;	//Allow >= 5 rooms?
if(! rs_isDefined(rs_groupBookingURL)) var rs_groupBookingURL = '';			//What URL should invalid searches be sent to?
if(! rs_isDefined(rs_bookingMode)) var rs_bookingMode = false;				//Booking.com inventory?
if(! rs_isDefined(rs_currentProduct)) var rs_currentProduct = false;		//Current product 'hotel', 'car', 'vp', or 'air'
if(! rs_isDefined(overrideLocal)) var overrideLocal = false;				//Force local
if(! rs_isDefined(rs_brandFilter)) var rs_brandFilter = '';
if(! rs_isDefined(needHTTPS)) var needHTTPS = false;
if(! rs_isDefined(openWindow)) var openWindow = false;
if(! rs_isDefined(iframeWindow)) var iframeWindow = false;
if(! rs_isDefined(rs_backend)) var rs_backend = false;
if(! rs_isDefined(rs_sid)) var rs_sid = false;
if(! rs_isDefined(rs_airFirst)) var rs_airFirst = false;
if(! rs_isDefined(rs_skipCheck)) var rs_skipCheck = false;
if(! rs_isDefined(rs_v3)) var rs_v3 = false;
if(! rs_isDefined(rs_mobile)) var rs_mobile = false;
if(! rs_isDefined(car_folder)) var car_folder = false;
if(! rs_isDefined(rs_generateRooms)) var rs_generateRooms = true;	// sets to genereate rooms or not
if(! rs_isDefined(rs_hotelroom)) var rs_hotelroom = false;
if(! rs_isDefined(new_car)) var new_car = false;

var start = "http://";
if(needHTTPS == true)
	start = "https://";

//local source
var rs_source = start + "secure.rezserver.com";
if((document.location.href).indexOf("rezserver.ppn.local", 0) > 0 && (document.location.href).indexOf("rezserver.ppn.local", 0) < 10){
	rs_source = start + "rezserver.ppn.local";
	rs_cName = "http://rezserver.ppn.local";
}
if((document.location.href).indexOf("rezserver3.ppn.local", 0) > 0 && (document.location.href).indexOf("rezserver3.ppn.local", 0) < 10){
	rs_source = start + "rezserver.ppn.local";
	rs_cName = "http://rezserver3.ppn.local";
	rs_v3 = true;
}
if((document.location.href).indexOf("qa", 0) > 0 && (document.location.href).indexOf("qa", 0) < 10){
	rs_source = start + "qa.rezserver.com";
	rs_cName = "http://qa.rezserver.com";
}
if(rs_backend && ! rs_v3){
	rs_source = "";
}
if(overrideLocal == true){
	rs_source = start + "rezserver.ppn.local";
	rs_cName = "http://rezserver.ppn.local";
}

//Autosuggest
var rs_currentResult = 0;
var rs_request = null;                                                              //Current AJAX request

//Decide a default current product if none supplied 
if(! rs_currentProduct){
	if(rs_hotelActive)
		rs_currentProduct = 'hotel';
	else if(rs_carActive)
		rs_currentProduct = 'car';
	else if(rs_vpActive)
		rs_currentProduct = 'vp';
	else if(rs_airActive)
		rs_currentProduct = 'air';
}

//Dates
var rs_rightNow = new Date();
var rs_today = new Date( rs_rightNow.getFullYear(), rs_rightNow.getMonth(), rs_rightNow.getDate() );
var rs_maxDate = new Date( rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate() + 330 );
var rs_maxDate2 = new Date( rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate() + 329 );
var rs_daysInMonth = [31,rs_daysInFeb(rs_today.getFullYear()),31,30,31,30,31,31,30,31,30,31];
var rs_fullMonthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var rs_shortMonthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

//Product activation
if(! rs_isDefined(rs_hotelActive)) var rs_hotelActive = false;
if(! rs_isDefined(rs_carActive)) var rs_carActive = false;
if(! rs_isDefined(rs_vpActive)) var rs_vpActive = false;
if(! rs_isDefined(rs_airActive)) var rs_airActive = false;

//Get CSS
if (rs_backend==false || car_folder){
	$('head').append('<link rel="stylesheet" type="text/css" href="' + rs_source + '/css/searchbox.css?refid=' + rs_refID + '&num=' + rs_numCalendars + '" title="default" />');
}

//Initial Hotel Dates
var rs_hotel_dates = {};


// ------------------ GENERAL FUNCTIONS ------------------ //
	
function rs_isDefined(variable){
	return(typeof(variable) == "undefined") ? false : true;
}

function rs_doPop(popVal, product){
	var key = "&hotels=true";
	if(product == 'car')
		key = "&cars=true";
	if(product == 'air')
		key = "&flights=true";
	if(rs_checkPop()){
		var page = "http://www.hotelsbycity.com/hotels/pop_up.php?key=" + popVal + "&vcid=" + rs_vcid + "&skip_tig=true" + key;
		var windowprops = "resizable=1,scrollbars=1,menubar=1,location=1,toolbar=1,titlebar=1,width=680,height=510, top=50, left=50";
		var newWindow = window.open(page, 'HBCPop', windowprops);
		newWindow.blur();
		//open a temp window and close it to avoid popUnder becomes popUp on newer browser
		var temp=newWindow.open("about:blank");
		temp.close();
	}
}

function rs_checkPop(){
	var oldTime = rs_readCookie("lastHBCPop");
	var rightNow = new Date();

	if(oldTime == null){
		rs_createCookie("lastHBCPop", rightNow.getTime(), 0);
		return(true);
	}
	else{
		if((parseInt(oldTime) + (4 * 60 * 60 * 60)) > (parseInt(rightNow.getTime())))
			return (false);
		else{
			rs_createCookie("lastHBCPop", rightNow.getTime(), 0);
			return(true);
		}
	}
}

function rs_createCookie(name, value, days){
	if(days){
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function rs_readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++){
		var c = ca[i];
		while(c.charAt(0) == ' ')
			c = c.substring(1,c.length);
		if(c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function rs_getParent(element){
	return '#' + ($(element).parents('.rs_multiSearchBoxes').attr('id'));
}

function rs_getAutocompleteParent(element){
	var myregexp = /rs_multiSearchBoxAutosuggestContainer_([^ ])*/i;
	var match = myregexp.exec($(element).parents('.rs_multiSearchBoxAutosuggestContainer').attr('class'));
	if(match != null)
		return '.' + match[0];
	else
		return false;
}

var brand_list = [];
// brand_list["AB"] = "Abba Hotels";
// brand_list["AR"] = "AC Hotels";
// brand_list["IF"] = "Acc-Nifos Hotels";
// brand_list["XQ"] = "Accor Hotels";
// brand_list["NY"] = "Affinia Hospitality";
// brand_list["AV"] = "Allegiance Services";
// brand_list["AL"] = "Aloft";
// brand_list["YP"] = "AltiusPar";
// brand_list["AA"] = "AmericInn";
// brand_list["MQ"] = "Amerihost";
// brand_list["AJ"] = "Amerisuites";
// brand_list["AN"] = "ANA Hotels International";
// brand_list["BZ"] = "Andre Balazs Properties";
// brand_list["AF"] = "Aramark hotel";
// brand_list["NZ"] = "Ascend Collection";
// brand_list["AO"] = "Atlantis";
// brand_list["BY"] = "Banyan Tree Hotels";
// brand_list["BN"] = "Barcelo";
// brand_list["BU"] = "Baymont Inns Suites";
// brand_list["BV"] = "Best Value Inn and Suites";
// brand_list["BW"] = "Best Western";
// brand_list["BA"] = "Boscolo Hotels";
// brand_list["BC"] = "Boutique";
// brand_list["000203"] = "Brisas Hotels &amp; Resorts";
// brand_list["BG"] = "Bulgari Hotels";
// brand_list["EZ"] = "Cambria Suites";
// brand_list["YO"] = "Candlewood Suites";
// brand_list["UN"] = "Carino Hotels and Resorts Worldwide";
// brand_list["CF"] = "City Partners Hotels";
// brand_list["CC"] = "Clarion";
// brand_list["CB"] = "Classic British Hotels";
// brand_list["IH"] = "Classic International Hotels";
// brand_list["CQ"] = "Club Quarters";
// brand_list["KI"] = "ClubHouse Inn &amp; Suites";
// brand_list["KL"] = "Clubhouse Inn and Suites";
// brand_list["WX"] = "Coast Hotels";
// brand_list["BX"] = "Columbus Reservation Services";
// brand_list["CI"] = "Comfort Inn";
// brand_list["CZ"] = "Comfort Suites";
// brand_list["CA"] = "Confortel Hotels";
// brand_list["000053"] = "Conrad Hotels";
// brand_list["CN"] = "Conrad Hotels CN";
// brand_list["IA"] = "Corinthia Hotels and Resorts";
// brand_list["CHI"] = "Country Inn &amp; Suites";
// brand_list["CY"] = "Courtyard";
// brand_list["CP"] = "Crowne Plaza";
// brand_list["DZ"] = "Dan Hotels Corporation Ltd.";
// brand_list["DI"] = "Days Inn";
// brand_list["DV"] = "De Vere Hotels";
// brand_list["DE"] = "Delta Hotels";
// brand_list["DS"] = "Design Hotels";
// brand_list["DN"] = "Destination Hotels";
// brand_list["DH"] = "Distinguished Hotels";
// brand_list["DX"] = "Dolce International";
// brand_list["DL"] = "Doral";
// brand_list["DO"] = "Dorint Resorts";
// brand_list["DT"] = "DoubleTree Hotels";
// brand_list["DR"] = "Drury Hotels";
// brand_list["EO"] = "Econo Lodge";
// brand_list["000192"] = "El Cid";
// brand_list["ES"] = "Embassy Suites Hotel";
// brand_list["NN"] = "Envergure Hotels";
// brand_list["EP"] = "Epoque Hotels";
// brand_list["EU"] = "Exclusive Hotels";
// brand_list["EI"] = "Executive Hotels and Resorts";
// brand_list["EA"] = "Extended StayAmerica";
// brand_list["FN"] = "Fairfield Inn";
// brand_list["FA"] = "Fairmont";
// brand_list["FH"] = "Fiesta Americana Hotels";
// brand_list["FB"] = "Fontainebleau Resorts";
// brand_list["FP"] = "Four Points - Sheraton";
// brand_list["FS"] = "Four Seasons";
// brand_list["GE"] = "Gaylord Entertainment";
// brand_list["GZ"] = "Genares Worldwide";
// brand_list["GQ"] = "Genre hotels";
// brand_list["GX"] = "Global Connections";
// brand_list["GA"] = "Global Hotel Alliance";
// brand_list["GL"] = "GlobRes";
// brand_list["GT"] = "Golden Tulip";
// brand_list["GH"] = "Grand Heritage";
// brand_list["GW"] = "Great Hotels of the World";
// brand_list["RT"] = "Gresham Hotels";
// brand_list["GO"] = "GuestHouse International";
// brand_list["HX"] = "Hampton Inn";
// brand_list["HR"] = "Harrah&apos;s Entertainment";
// brand_list["HV"] = "Harvey Hotels";
// brand_list["BH"] = "Hawthorn Suites";
// brand_list["HH"] = "Hilton";
// brand_list["GI"] = "Hilton Garden Inn";
// brand_list["HL"] = "Hilton International";
// brand_list["HE"] = "Historic Hotels America";
// brand_list["EX"] = "Holiday Inn Express";
// brand_list["HI"] = "Holiday Inn Hotels";
// brand_list["HT"] = "Home 2 Suites";
// brand_list["HG"] = "Homewood by Hilton";
// brand_list["HB"] = "Hotelbook";
// brand_list["HO"] = "HotelRez";
// brand_list["IW"] = "Hotels and Preference";
// brand_list["XZ"] = "Hotelzon International";
// brand_list["HA"] = "Hotusa Hotels";
// brand_list["HJ"] = "Howard Johnson";
// brand_list["HY"] = "Hyatt";
// brand_list["HZ"] = "Hyatt Place";
// brand_list["IS"] = "Ian Schrager";
// brand_list["XI"] = "IBIS - Accor hotels";
// brand_list["WV"] = "iHotelier";
// brand_list["IM"] = "Independent Managed Hotels";
// brand_list["IN"] = "Indigo";
// brand_list["IP"] = "Inn Points";
// brand_list["IL"] = "InnLink Inns";
// brand_list["IR"] = "InnPoints Reserve";
// brand_list["IV"] = "InnVite";
// brand_list["IC"] = "Intercontinental";
// brand_list["IG"] = "ITWG - Italy and world hotels";
// brand_list["JJ"] = "Jin Jan";
// brand_list["JV"] = "Joie De Vivre Hospitality";
// brand_list["JO"] = "Jolly Hotels";
// brand_list["JT"] = "Jumeirah";
// brand_list["JD"] = "Jurys Doyle Hotel Group";
// brand_list["KH"] = "Kerry Hotels";
// brand_list["KY"] = "Keytel";
// brand_list["KC"] = "Kimpton Hotel Group";
// brand_list["KG"] = "Knight&apos;s Inn";
// brand_list["LQ"] = "La Quinta";
// brand_list["LO"] = "Langham Hotels";
// brand_list["MD"] = "Le Meridien";
// brand_list["LW"] = "Leading Hotels of World";
// brand_list["LI"] = "LeisureLink";
// brand_list["LD"] = "Leonardo Hotels";
// brand_list["LP"] = "Lexington Collection";
// brand_list["LM"] = "Lexington Services";
// brand_list["LZ"] = "Loews Hotels";
// brand_list["LB"] = "Lucien Barriere";
// brand_list["LE"] = "Luxe Worldwide Hotels";
// brand_list["MS"] = "Magnuson Group";
// brand_list["MG"] = "Magnolia Hotels";
// brand_list["MZ"] = "Mainstay Suites";
// brand_list["MO"] = "Mandarin Oriental";
// brand_list["MH"] = "Marco Polo Hotels";
// brand_list["MC"] = "Marriott";
// brand_list["AK"] = "Marriott Autograph Collection";
// brand_list["ET"] = "Marriott Conference Centers";
// brand_list["EB"] = "Marriott Edition Hotels";
// brand_list["VC"] = "Marriott Vacation Club";
// brand_list["VY"] = "Maybourne Hotel Group";
// brand_list["XM"] = "MERCURE - Accor Hotels";
// brand_list["ME"] = "Mercure Gallery";
// brand_list["BK"] = "Meristar Hotels";
// brand_list["GM"] = "Meritus Hotels &amp; Resorts";
// brand_list["ZX"] = "MI Independent Property";
// brand_list["MI"] = "Microtel Inn and Suites";
// brand_list["MU"] = "Millennium Copthorne Hotels";
// brand_list["MR"] = "Morgans Hotel Group";
// brand_list["MX"] = "Motel 6";
// brand_list["MK"] = "Movenpick Hotels &amp; Resorts";
// brand_list["IQ"] = "Myfidelio.net";
// brand_list["NO"] = "New Otani Hotels";
// brand_list["AP"] = "NH Hotels";
// brand_list["NK"] = "Nikko Hotels";
// brand_list["NC"] = "Noble House";
// brand_list["XN"] = "NOVOTEL - Accor Hotels";
// brand_list["000055"] = "Oberoi Group of Hotels";
// brand_list["OC"] = "Okura Hotels &amp; Resorts";
// brand_list["OM"] = "Omni Hotels";
// brand_list["OE"] = "Orient Express";
// brand_list["HC"] = "Otedis Hotels";
// brand_list["OT"] = "Othon Hotels";
// brand_list["OR"] = "Outrigger Hotels Hawaii";
// brand_list["PP"] = "Pan Pacific Hotels and Resorts";
// brand_list["PM"] = "Paramount Hotels";
// brand_list["PII"] = "Park Inns";
// brand_list["PKP"] = "Park Plaza";
// brand_list["PN"] = "Peninsula Hotels";
// brand_list["PX"] = "Performance Connections";
// brand_list["PH"] = "Preferred Hotels";
// brand_list["PT"] = "Prime Hotels and Resorts";
// brand_list["PJ"] = "Prince Resorts Hawaii &amp; Alaska";
// brand_list["PU"] = "Pullman";
// brand_list["QI"] = "Quality Inn and Suites";
// brand_list["QR"] = "Quality Reservations";
// brand_list["RAD"] = "Radisson Hotels International";
// brand_list["RA"] = "Ramada";
// brand_list["ON"] = "Reconline";
// brand_list["RL"] = "Red Lion";
// brand_list["RF"] = "Red Roof Inns";
// brand_list["RQ"] = "Regal Hotels";
// brand_list["RE"] = "Regency Hotel Group";
// brand_list["WB"] = "Relais &amp; Chateaux";
// brand_list["BR"] = "Renaissance";
// brand_list["000176"] = "Rendezvous Hotels";
// brand_list["TA"] = "ReservHotel";
// brand_list["RC"] = "Residence Inn";
// brand_list["RB"] = "Resort Bookings";
// brand_list["AH"] = "ResortQuest Hawaii";
// brand_list["RK"] = "Rezlink";
// brand_list["RX"] = "Ringhotels";
// brand_list["RZ"] = "Ritz Carlton";
// brand_list["RS"] = "Rockresorts";
// brand_list["RI"] = "Rodeway Inn and Suites";
// brand_list["SC"] = "Sceptre Hospitality";
// brand_list["SQ"] = "Select Marketing Hotels";
// brand_list["SG"] = "Shangri-La Hotels";
// brand_list["SI"] = "Sheraton";
// brand_list["BP"] = "Shilo Resorts";
// brand_list["US"] = "Sierra Suites";
// brand_list["SJ"] = "Signature/Jameson Inns";
// brand_list["GR"] = "Six Senses Resorts & Spas";
// brand_list["SZ"] = "Sleep Inn";
// brand_list["000194"] = "Small Luxury Hotels of World";
// brand_list["VS"] = "Sofitel Hotels - Accor";
// brand_list["SM"] = "Sol Melia";
// brand_list["SN"] = "Sonesta Hotels";
// brand_list["000196"] = "Sorat Hotels";
// brand_list["XV"] = "Springhill Suites";
// brand_list["XR"] = "St. Regis";
// brand_list["LX"] = "St. Regis Luxury";
// brand_list["SY"] = "StarHotels";
// brand_list["SB"] = "Staybridge Suites";
// brand_list["S1"] = "Steigenberger Hotels";
// brand_list["WR"] = "Sterling Hotels";
// brand_list["SS"] = "Studio 6";
// brand_list["XA"] = "Suite Hotels - Accor";
// brand_list["XS"] = "Summerfield Suites";
// brand_list["XL"] = "Summit Hotels";
// brand_list["SE"] = "Super 8";
// brand_list["SR"] = "SuperClubs";
// brand_list["ZS"] = "Supranational Hotels";
// brand_list["UB"] = "Surburban Extended Stay";
// brand_list["000063"] = "Sutton Place Hotels";
// brand_list["SL"] = "Swissotel Hotels";
// brand_list["SD"] = "Switzerland Travel Centre";
// brand_list["YX"] = "Synxis Independent";
// brand_list["TJ"] = "Taj Hotels, Resorts";
// brand_list["A3"] = "The Ascott Limited";
// brand_list["LC"] = "The Luxury collection";
// brand_list["TI"] = "Thistle Hotels";
// brand_list["TP"] = "Top International";
// brand_list["TO"] = "TownePlace";
// brand_list["TL"] = "Travelodge";
// brand_list["TW"] = "Trump Hotel Collection";
// brand_list["WT"] = "Tryp Hotels";
// brand_list["UZ"] = "Unirez by Pegasus";
// brand_list["UE"] = "Universal";
// brand_list["UV"] = "Univisit";
// brand_list["UI"] = "Utell by Pegasus";
// brand_list["VE"] = "VIP International";
// brand_list["WH"] = "W Hotels";
// brand_list["WA"] = "Waldorf Astoria";
// brand_list["WK"] = "Warwick";
// brand_list["XW"] = "Webres";
// brand_list["WL"] = "Wellesley Inn and Suites";
// brand_list["WI"] = "Westin";
// brand_list["WG"] = "Wingate Inn";
// brand_list["WD"] = "Woodfin Suites";
// brand_list["SW"] = "WORLDHOTELS";
// brand_list["WY"] = "Wyndham International";
// brand_list["YH"] = "Your Hotel Worldwide";
brand_list["1"] = "AmericInn";
brand_list["2"] = "Aston Hotels & Resorts";
brand_list["3"] = "NH Hotels";
brand_list["4"] = "Boscolo Hotels";
brand_list["5"] = "Barcelo Hotels & Resorts";
brand_list["6"] = "Confortel Hotels";
brand_list["7"] = "Classic British Hotels";
brand_list["8"] = "Club Quarters";
brand_list["9"] = "Delta Hotels";
brand_list["10"] = "Destination Hotels & Resorts";
brand_list["11"] = "Design Hotels";
brand_list["12"] = "Dolce International";
brand_list["13"] = "Extended StayAmerica";
brand_list["14"] = "Executive Hotels and Resorts";
brand_list["15"] = "Marriott Conference Centers";
brand_list["16"] = "Cambria Suites";
brand_list["17"] = "Fairmont Hotels";
brand_list["18"] = "Great Hotels of the World";
brand_list["19"] = "GenaRes Worldwide Reservation Services";
brand_list["20"] = "Harrahs Entertainment";
brand_list["21"] = "Home 2 Suites";
brand_list["22"] = "Hyatt Hotels and Resorts";
brand_list["23"] = "Corinthia Hotels and Resorts";
brand_list["24"] = "Inter-Continental Hotels and Resorts";
brand_list["25"] = "Indigo";
brand_list["26"] = "InnPoints Reserv";
brand_list["27"] = "Jolly Hotels";
brand_list["28"] = "Joie de Vivre";
brand_list["29"] = "Kimpton Hotels";
brand_list["30"] = "Kempinski Hotels & Resorts";
brand_list["31"] = "Lindner Hotels";
brand_list["32"] = "Leonardo Hotels";
brand_list["33"] = "Luxe Worldwide Hotels";
brand_list["34"] = "Vantis Hotels Group";
brand_list["35"] = "Lexington Collection";
brand_list["36"] = "La Quinta";
brand_list["37"] = "Loews Hotels";
brand_list["38"] = "Moevenpick Hotels & Resorts";
brand_list["39"] = "Morgans Hotel Group";
brand_list["40"] = "Magnuson Group";
brand_list["41"] = "MGM Grand Hotels";
brand_list["42"] = "Motel 6";
brand_list["43"] = "MainStay Suites";
brand_list["44"] = "Noble House";
brand_list["45"] = "Denihan Hospitality Group";
brand_list["46"] = "Ascend Collection";
brand_list["47"] = "Outdoor Traveler Destinations";
brand_list["48"] = "Alesia Distribution";
brand_list["49"] = "Omni Hotels";
brand_list["50"] = "Reconline";
brand_list["51"] = "Park Inn";
brand_list["52"] = "Puma Hotels collection";
brand_list["53"] = "Sandman Hotels";
brand_list["54"] = "Aqua Hotels and Resorts";
brand_list["55"] = "Red Roof Inns";
brand_list["56"] = "Red Lion Hotels & Inns";
brand_list["57"] = "Sleep Inns";
brand_list["58"] = "Marriott Vacation Club International";
brand_list["59"] = "Vantis Hotels";
brand_list["60"] = "SOFITEL - Accor Hotels and Resorts";
brand_list["61"] = "Warwick International Hotels";
brand_list["62"] = "Tryp Hotels";
brand_list["63"] = "Coast Hotels";
brand_list["64"] = "Novotel Accor Hotels";
brand_list["65"] = "Candlewood Suites";
brand_list["66"] = "AltiusPar";
brand_list["67"] = "Supranational Hotels";
brand_list["68"] = "Marriott Autograph Collection";
brand_list["69"] = "Aloft";
brand_list["70"] = "AC HOTELS";
brand_list["71"] = "Hawthorn Suites by Wyndham";
brand_list["72"] = "Renaissance Hotels and Resorts";
brand_list["73"] = "Baymont Inn & Suites";
brand_list["74"] = "Best Value Inn and Suites";
brand_list["75"] = "Best Western International";
brand_list["76"] = "Clarion";
brand_list["77"] = "Country Inns & Suites";
brand_list["78"] = "Comfort Inns";
brand_list["79"] = "Conrad Hotels CN";
brand_list["80"] = "Crowne Plaza Hotels and Resorts";
brand_list["81"] = "Courtyard by Marriott";
brand_list["82"] = "Comfort Suites";
brand_list["83"] = "Days Inn";
brand_list["84"] = "Doubletree Hotels";
brand_list["85"] = "Element";
brand_list["86"] = "Econo Lodge";
brand_list["87"] = "Embassy Suites";
brand_list["88"] = "Holiday Inn Express";
brand_list["89"] = "Fiesta Americana Hotels & Resorts";
brand_list["90"] = "Fairfield Inn by Marriott";
brand_list["91"] = "Four Points by Sheraton";
brand_list["92"] = "Hilton Garden Inn";
brand_list["93"] = "Golden Tulip";
brand_list["94"] = "Global Conextions";
brand_list["95"] = "Homewood Suites";
brand_list["96"] = "Hilton Hotels and Resorts(U. S.)";
brand_list["97"] = "Holiday Inn Hotels and Resorts";
brand_list["98"] = "Howard Johnson Plazas, Hotels, Inns, and Express Inns";
brand_list["99"] = "Hilton International";
brand_list["100"] = "Hampton Inn/Hampton Inn and Suites";
brand_list["101"] = "Knights Inn";
brand_list["102"] = "The Luxury collection";
brand_list["103"] = "LeisureLink";
brand_list["104"] = "Leading Hotels of the World";
brand_list["105"] = "Marriott Hotels, Resorts, and Suites";
brand_list["106"] = "Le Meridien";
brand_list["107"] = "Microtel Inns and Suites";
brand_list["108"] = "Millennium & Copthorne Hotels";
brand_list["109"] = "Preferred Hotels & Resorts Worldwide";
brand_list["110"] = "Park Plaza";
brand_list["111"] = "Dream & Night Hotels";
brand_list["112"] = "Quality Inns";
brand_list["113"] = "Ramada Plazas, Limiteds, and Inns";
brand_list["114"] = "Radisson Hotels & Resorts";
brand_list["115"] = "Residence Inn by Marriott";
brand_list["116"] = "Rodeway Inn";
brand_list["117"] = "Ritz-Carlton Hotels";
brand_list["118"] = "Staybridge Suites by Holiday Inn";
brand_list["119"] = "Super 8";
brand_list["120"] = "Sheraton Hotels and Resorts";
brand_list["121"] = "Sol Melia";
brand_list["122"] = "Sonesta Collection";
brand_list["123"] = "WORLDHOTELS";
brand_list["124"] = "Travelodge";
brand_list["125"] = "TownePlace Suites";
brand_list["126"] = "TOP International Hotels";
brand_list["127"] = "Utell";
brand_list["128"] = "Pegasus Connect";
brand_list["129"] = "Waldorf Astoria";
brand_list["130"] = "Wingate Inns";
brand_list["131"] = "W Hotels";
brand_list["132"] = "Westin Hotels and Resorts";
brand_list["133"] = "TravelCLICK";
brand_list["134"] = "Wyndham Hotels and Resorts";
brand_list["135"] = "Summit Hotels and Resorts";
brand_list["136"] = "St Regis";
brand_list["137"] = "SpringHill Suites";
brand_list["138"] = "Synxis";
brand_list["141"] = "Aramark hotel";
brand_list["142"] = "Atlantis";
brand_list["143"] = "Allegiance Hospitality Services";
brand_list["144"] = "Preferred Hotel Group";
brand_list["145"] = "Bulgari Hotels";
brand_list["146"] = "Interstate Hotels and Resorts";
brand_list["147"] = "Benchmark Hotels";
brand_list["148"] = "Shilo Resorts";
brand_list["149"] = "Boutique Desires Hotels";
brand_list["150"] = "Columbus Reservation Services";
brand_list["151"] = "Andre Balazs Properties";
brand_list["152"] = "Drury Hotels";
brand_list["153"] = "Marriott Edition Hotels";
brand_list["154"] = "Exclusive Hotels";
brand_list["155"] = "Fontainebleau Resorts";
brand_list["156"] = "Fastbooking";
brand_list["157"] = "Four Seasons";
brand_list["158"] = "Gaylord Entertainment";
brand_list["159"] = "Grand Heritage Hotels";
brand_list["160"] = "GuestHouse International";
brand_list["161"] = "Genre hotels";
brand_list["162"] = "Historic Hotels of America";
brand_list["163"] = "HotelREZ";
brand_list["164"] = "Classic International Hotels";
brand_list["165"] = "InnLink Inns";
brand_list["166"] = "Independent Hotels";
brand_list["167"] = "InnPoints Worldwide";
brand_list["168"] = "Myfidelio.net";
brand_list["169"] = "Ian Schrager";
brand_list["170"] = "InnVite";
brand_list["171"] = "Hotels and Preference";
brand_list["172"] = "The Doyle Collection";
brand_list["173"] = "Jumeirah";
brand_list["174"] = "Kerry Hotels";
brand_list["175"] = "ClubHouse Inn & Suites";
brand_list["176"] = "Langham Hotels";
brand_list["177"] = "Mercure Gallery";
brand_list["178"] = "Magnolia Hotels and Resorts";
brand_list["179"] = "Mandarin Oriental Hotel Group";
brand_list["180"] = "AmeriHost Inn Hotels";
brand_list["181"] = "Nikko Hotels International";
brand_list["182"] = "Louvre Hotels";
brand_list["183"] = "Northwood Hotels";
brand_list["184"] = "Orient-Express Hotels";
brand_list["185"] = "Outrigger Hotels Hawaii";
brand_list["186"] = "Prince Hotels";
brand_list["187"] = "Pan Pacific Hotels and Resorts";
brand_list["188"] = "WLB Hotels";
brand_list["189"] = "Resort Bookings";
brand_list["190"] = "Vail Resorts";
brand_list["191"] = "Hard Rock Hotels";
brand_list["192"] = "Steigenberger Hotels";
brand_list["193"] = "Sceptre";
brand_list["194"] = "Signature/Jameson Inns";
brand_list["195"] = "Swissotel";
brand_list["196"] = "Studio 6";
brand_list["197"] = "ReservHOTELs";
brand_list["198"] = "TShotels";
brand_list["199"] = "Trump Hotel Collection";
brand_list["200"] = "Suburban Hotels";
brand_list["201"] = "Universal";
brand_list["202"] = "Carino Hotels and Resorts Worldwide";
brand_list["203"] = "Univisit";
brand_list["204"] = "Chase Suite Hotels";
brand_list["205"] = "Sterling Hotels and Resorts";
brand_list["206"] = "MERCURE - Accor Hotels";
brand_list["207"] = "MI Independent Property";


function updateBrands(brands){
	var brands_arry = brands.split('~');
	var result = '';
	var result2 = '<option value="">Any</option>';
	//alert(brands_arry.indexOf("WV^TravelCLICK"));
	//alert(brands_arry[0]);
	for(var i = 0; i < brands_arry.length - 1; i++){
		var temp = brands_arry[i];
		var code = temp.substr(0, temp.indexOf("^"));
		var bname = temp.substr(temp.indexOf("^") + 1);
		if((code == "XQ" || code == "XC" || code == "XI" || code == "XM" || code == "XN" || code == "VS" || code == "XA" || code == "PU" || code == "ME" || code == "MX" || code == "SS") && result2.indexOf("All Accor Hotel Brands") < 0)
			result2 += '<option value="XQ, XC, XI, XM, XN, VS, XA, PU, ME, MX, SS">All Accor Hotel Brands</option>';
		else if((code == "UB" || code == "EA") && result2.indexOf("All Extended Stay Hotels") < 0)
			result2 += '<option value="UB, EA">All Extended Stay Hotels</option>';
		else if((code == "HH" || code == "GI" || code == "HG" || code == "HL" || code == "DT" || code == "WA" || code == "ES" || code == "HX" || code == "HT") && result2.indexOf("All Hilton Hotel Brands") < 0)
			result2 += '<option value="HH, GI, HG, HL, DT, WA, ES, HX, HT">All Hilton Hotel Brands</option>';
		else if((code == "HY" || code == "HZ" || code == "HU") && result2.indexOf("All Hyatt Hotel Brands") < 0)
			result2 += '<option value="HY, HZ, HU">All Hyatt Hotel Brands</option>';
		else if((code == "MC" || code == "ET" || code == "VC" || code == "AK" || code == "EB" || code == "BR" || code == "CY" || code == "AR" || code == "RC" || code == "FN" || code == "RZ") && result2.indexOf("All Marriott Hotel Brands") < 0)
			result2 += '<option value="MC, ET, VC, AK, EB, BR, CY, AR, RC, FN, RZ">All Marriott Hotel Brands</option>';
		
		result += '<option value="' + code + '">' + bname + '</option>';
	}

	result2 += '<option value=""></option>';
	result2 += '<option value=""></option>';

	$('.filter_hotel select[name=rs_brand]').html(result2 + result);
}

function rs_printBrands(){
	var result = '<option value="">Any</option>';
	// result += '<option value="XQ, XC, XI, XM, XN, VS, XA, PU, ME, MX, SS">All Accor Hotel Brands</option>';
	// result += '<option value="UB, EA">All Extended Stay Hotels</option>';
	// result += '<option value="HH, GI, HG, HL, DT, WA, ES, HX, HT">All Hilton Hotel Brands</option>';
	// result += '<option value="HY, HZ, HU">All Hyatt Hotel Brands</option>';
	// result += '<option value="MC, ET, VC, AK, EB, BR, CY, AR, RC, FN, RZ">All Marriott Hotel Brands</option>';
	result += '<option value=""></option>';
	result += '<option value=""></option>';
	for(i in brand_list)
		result += '<option value="' + i + '">' + brand_list[i] + '</option>';
	
	return result;
}

function rs_loadRefData(){
	$.getJSON(rs_source + '/inc/json_refData.php?refid=' + rs_refID + '&get_brands=1&jquery=' + $().jquery + '&source=searchbox.js' + '&jsoncallback=?', function(data){
		var xml = data.data[0].html;
		rs_stateFilter = ((/<stateFilter>[\s]*([^\s]*)[\s]*<\/stateFilter>/.exec(xml))[1]);
		if(rs_stateFilter == '')
			rs_stateFilter = 'ALL';
		rs_countryFilter = ((/<countryFilter>[\s]*([^\s]*)[\s]*<\/countryFilter>/.exec(xml))[1]);
		if(rs_countryFilter == '')
			rs_countryFilter = 'ALL';
		rs_petFilter = ((/<petFilter>[\s]*([^\s]*)[\s]*<\/petFilter>/.exec(xml))[1]);
		if(rs_petFilter == 'true')
			rs_petFilter = 'YES';
		else
			rs_petFilter = 'NO';
		if(! rs_bookingMode){
			rs_bookingMode = ((/<bookingFilter>[\s]*([^\s]*)[\s]*<\/bookingFilter>/.exec(xml))[1]);
			if(rs_bookingMode == 'true')
				rs_bookingMode = 'YES';
			else
				rs_bookingMode = 'NO';
		}
		rs_groupBookingURL = ((/<fiveRoomURL>[\s]*([^\s]*)[\s]*<\/fiveRoomURL>/.exec(xml))[1]);
		rs_allowGroupBooking = ((/<groupBookingMode>[\s]*([^\s]*)[\s]*<\/groupBookingMode>/.exec(xml))[1]);
		if(parseInt(rs_allowGroupBooking, 10) == 2 || rs_allowGroupBooking == '')
			rs_allowGroupBooking = false;
		else
			rs_allowGroupBooking = true;
		rs_brandFilter = xml.slice(xml.indexOf("<brands>") + 8, xml.indexOf("</brands>"));
		if(rs_brandFilter != '')
			updateBrands(rs_brandFilter);
		rs_vcid = ((/<validClickID>[\s]*([^\s]*)[\s]*<\/validClickID>/.exec(xml))[1]);
		var rs_cname = ((/<cName>[\s]*([^\s]*)[\s]*<\/cName>/.exec(xml))[1]);
		if(rs_cname != ''){
			rs_cname = rs_cname.replace('http://','');
			if((document.location.href).indexOf("local.", 0) === -1)
				rs_cName = "http://" + rs_cname;
		}
		if(rs_backend)
			rs_cName = '';
		var accountid = ((/<accountid>[\s]*([^\s]*)[\s]*<\/accountid>/.exec(xml))[1]);
		
		if(accountid != '' && accountid == 1000 && rs_refID != 2050 && rs_refID != 2999 && rs_refID != 1230 && rs_refID != 5999)
			rs_popUp = (rs_mobile != true ? true : false);

		new_car = ((/<car_rentals>[\s]*([^\s]*)[\s]*<\/car_rentals>/.exec(xml))[1]);
		new_car = new_car == 'true' ? true : false;
		
		// var rs_cname = ((/<cName>[\s]*([^\s]*)[\s]*<\/cName>/.exec(xml))[1]);
		// if ( rs_cname != '' ){
			// rs_cname = rs_cname.replace('http://','');
			// if(rs_cname.indexOf("secure.") != -1)
				// rs_cname = rs_cname.replace('secure.','');
			// if((document.location.href).indexOf("secure", 0) > 0)
				// rs_cName = start + "secure." + rs_cname;
			// if((document.location.href).indexOf("qa", 0) > 0)
				// rs_cName = start + "qa." + rs_cname;
			// if(overrideLocal == true)
				// rs_cName = start + "local." + rs_cname;
		// }
	});
}

function rs_fillProductTabs(parent){
	var result = '';
	
	if(rs_hotelActive)
		result += rs_generateProductTab('Hotels', 'hotel', (rs_currentProduct == 'hotel' ? true : false), parent);
	if(rs_carActive)
		result += rs_generateProductTab('Rental Cars', 'car', (rs_currentProduct == 'car' ? true : false), parent);
	if(rs_vpActive)
		result += rs_generateProductTab('Flight + Hotel', 'vp', (rs_currentProduct == 'vp' ? true : false), parent);
	if(rs_airActive)
		result += rs_generateProductTab('Flights', 'air', (rs_currentProduct == 'air' ? true : false), parent);

	$('#rs_multiSearchBoxTabsList', parent).html(result + '<div class="clear"></div>');
}

function rs_generateProductTab(name, product, active, parent){
	var result = '<span class="options"><input type="radio" class="radio" name="search_options" id="radio_' + product + '" onclick="rs_switchTab(\'' + product + '\', \'' + parent + '\'); return false;" ';

	result += '/><label for="radio_' + product + '">' + name + '</label></span>';

	return result;
}

function rs_switchTab(product, parent){
	rs_killRequest();
	
	if(product == "hotel"){
		$(".filter_car", parent).hide();
		$(".filter_hotel", parent).show();
		$('.rs_multiSearchBoxContent_car', parent).hide();
		$('.rs_multiSearchBoxContent_vp', parent).hide();
		$('.rs_multiSearchBoxContent_air', parent).hide();
		$(".radio_hotels", parent).attr("checked", "checked");
	}
	else if(product == "car"){
		$(".filter_hotel", parent).hide();
		$(".filter_car", parent).show();
		$('.rs_multiSearchBoxContent_hotel', parent).hide();
		$('.rs_multiSearchBoxContent_vp', parent).hide();
		$('.rs_multiSearchBoxContent_air', parent).hide();
		$(".radio_cars", parent).attr("checked", "checked");
	}
	else if(product == "vp"){
		$(".filter_hotel", parent).hide();
		$(".filter_car", parent).hide();
		$('.rs_multiSearchBoxContent_car', parent).hide();
		$('.rs_multiSearchBoxContent_hotel', parent).hide();
		$('.rs_multiSearchBoxContent_air', parent).hide();
		$(".radio_vp", parent).attr("checked", "checked");
	}
	else if(product == "air"){
		$(".filter_hotel", parent).hide();
		$(".filter_car", parent).hide();
		$('.rs_air_checkout', parent).show();
		$('.rs_multiSearchBoxContent_car', parent).hide();
		$('.rs_multiSearchBoxContent_vp', parent).hide();
		$('.rs_multiSearchBoxContent_hotel', parent).hide();
		$(".radio_flights", parent).attr("checked", "checked");
	}
	
	$('.rs_multiSearchBoxCalendar', parent).hide();
	$('.rs_multiSearchBoxAutosuggestResults', parent).hide();
	
	//$('.rs_multiSearchBoxContent_' + rs_currentProduct, parent).hide();
	
	rs_currentProduct = product;
	
	$('.rs_multiSearchBoxContent_' + rs_currentProduct, parent).show();
	
	if((rs_currentProduct == "hotel" || rs_currentProduct == "vp") && rs_generateRooms)
		$('.rs_multiSearchBoxContent_' + rs_currentProduct + ' select[name=rs_rooms]').html(rs_printRooms(rs_currentProduct));
		
	if(rs_currentProduct == "hotel")
		$('.filter_' + rs_currentProduct + ' select[name=rs_brand]', parent).html(rs_printBrands());

    if(rs_currentProduct == "air" && $('.rs_multiSearchBoxContent_' + rs_currentProduct + ' select[name=rs_adults]').length){
        $('.rs_multiSearchBoxContent_' + rs_currentProduct + ' select[name=rs_adults]').html(rs_printAdults());
    }
	
	if(! $('.rs_multiSearchBoxForm_' + rs_currentProduct + ' input[name=refid]', parent).length)
		$('.rs_multiSearchBoxForm_' + rs_currentProduct, parent).append('<input name="refid" type="hidden" />');
	$('.rs_multiSearchBoxForm_' + rs_currentProduct + ' input[name=refid]', parent).val(rs_refID);

	$('.rs_multiSearchBoxContent_' + rs_currentProduct + ' .rs_multiSearchBoxCalendar').each(function(){
		if(rs_getCalType($(this)) == "checkIn"){
			rs_drawCalendar(rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_today, rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_getCheckOut(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_currentProduct, 'checkIn', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
		else if(rs_getCalType($(this)) == "checkOut"){
			rs_drawCalendar(rs_getCheckOut(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_getCheckOut(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_currentProduct, 'checkOut', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
		else if(rs_getCalType($(this)) == "checkIn1"){
			rs_drawCalendar(rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_today, rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), false, rs_currentProduct, 'checkIn1', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
		else if(rs_getCalType($(this)) == "checkIn2"){
			rs_drawCalendar(rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_today, rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), false, rs_currentProduct, 'checkIn2', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
		else if(rs_getCalType($(this)) == "checkIn3"){
			rs_drawCalendar(rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_today, rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), false, rs_currentProduct, 'checkIn3', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
		else if(rs_getCalType($(this)) == "checkIn4"){
			rs_drawCalendar(rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_today, rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), false, rs_currentProduct, 'checkIn4', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
		else if(rs_getCalType($(this)) == "checkIn5"){
			rs_drawCalendar(rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), rs_today, rs_getCheckIn(rs_currentProduct, rs_getCalParent($(this)), rs_getParent($(this))), false, rs_currentProduct, 'checkIn5', false, rs_getCalParent($(this)), rs_getParent($(this)));
		}
	});
}

function rs_printAdults(){
    var result = '';
    for(var i = 0; i < 9; i++){
        if(i == 1){
            result += '<option value="' + i + '" selected="SELECTED">' + i + "</option>";
        }else{
            result += '<option value="' + i + '">' + i + "</option>";
        }
    }
    return result;
}

function rs_printRooms(product){
	var result = '<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option>';
	if(rs_allowGroupBooking && product != 'vp')
		result += '<option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9+</option>';
	
	return result;
}

function rs_checkSearchForm(product, parent){
	
	if(product == 'hotel')
		return rs_checkHotelSearchForm(parent);
	else if(product == 'car')
		return rs_checkCarSearchForm(parent);
	else if(product == 'vp')
		return rs_checkVPSearchForm(parent);
	else if(product == 'air')
		return rs_checkAirSearchForm(parent);
	
	return false;
}

function rs_checkHotelSearchForm(parent){
	if(($('.rs_multiSearchBoxForm_hotel select[name=rs_hid]', parent).length && $('.rs_multiSearchBoxForm_hotel select[name=rs_hid]', parent).val() != '') || ($('.rs_multiSearchBoxForm_hotel input[name=rs_hid]', parent).length && $('.rs_multiSearchBoxForm_hotel input[name=rs_hid]', parent).val() != '')){
		if(! rs_skipCheck){
			if($('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() == ''){
				$('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
				return false;
			}
			if($('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() == ''){
				$('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
				return false;
			}
		}
		$('.rs_multiSearchBoxForm_hotel', parent).attr('action', rs_cName + '/hotel/?');
	}
	else if(($('.rs_multiSearchBoxForm_hotel select[name=rs_cid]', parent).length && $('.rs_multiSearchBoxForm_hotel select[name=rs_cid]', parent).val() != '') || ($('.rs_multiSearchBoxForm_hotel input[name=rs_cid]', parent).length && $('.rs_multiSearchBoxForm_hotel input[name=rs_cid]', parent).val() != '') || ($('.rs_multiSearchBoxForm_hotel input[name=rs_rid]', parent).length && $('.rs_multiSearchBoxForm_hotel input[name=rs_rid]', parent).val() != '') || ($('.rs_multiSearchBoxForm_hotel input[name=rs_lmark]', parent).length && $('.rs_multiSearchBoxForm_hotel input[name=rs_lmark]', parent).val().substing(0,3) == 'air'))
		$('.rs_multiSearchBoxForm_hotel', parent).attr('action', rs_cName + '/city/?');
	else{
		if($('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxAutosuggest', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxAutosuggest', parent).val() == "City or Airport Name"){
			alert("Please enter a city to search for.");
			$('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxAutosuggest', parent).val("");
			$('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxAutosuggest', parent).focus();
			return false;
	   }
	   $('.rs_multiSearchBoxForm_hotel', parent).attr('action', rs_cName + '/search/?');
	}
	if($('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).length && $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() >= 5 && $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() <= 8){
		if(rs_allowGroupBooking){
			if($('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() != 'City or airport'){
				if(rs_popUp)
					rs_doPop($('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val(), 'hotel');
				if(rs_groupBookingURL != '')
					window.location.href = rs_groupBookingURL;
				else if(rs_refID == 2055)
					window.location.href = "http://motelgroups.com/Search/Index.cfm?City=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() + "&InDate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() + "&Outdate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() + "&NumRooms=" + $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() + "&sc=HBC" + rs_refID;
				else
					window.location.href = "http://hotelsbycity.hotelplanner.com/Search/Index.cfm?City=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() + "&InDate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() + "&Outdate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() + "&NumRooms=" + $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() + "&sc=HBC" + rs_refID;
			}
		}
		else
			alert( "Sorry, we only allow reservations between 1 and 4 rooms" );
		return false;
	}
	else if($('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).length && $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() > 8){
		if(rs_allowGroupBooking){
			if($('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() != 'City or airport'){
				if(rs_popUp)
					rs_doPop($('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val(), 'hotel');
				if(rs_groupBookingURL != '')
					window.location.href = rs_groupBookingURL;
				else if(rs_refID == 2055)
					window.location.href = "http://motelgroups.com/GroupForm.cfm?City=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() + "&InDate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() + "&Outdate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() + "&NumRooms=" + $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() + "&sc=HBC" + rs_refID;
				else
					window.location.href = "http://hotelsbycity.hotelplanner.com/GroupForm.cfm?City=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() + "&InDate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() + "&Outdate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() + "&NumRooms=" + $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() + "&sc=HBC" + rs_refID;
			}
		}
		else
			alert("Sorry, we only allow reservations between 1 and 4 rooms");
		return false;
	}
	else if($('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() != 'mm/dd/yyyy' && $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() != 'mm/dd/yyyy' && (((rs_stringToDate($('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val()) - rs_stringToDate($('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val()))/86400000) > 21)){
		//alert(rs_fiveRooms);
		//return false;
		if(rs_allowGroupBooking){
			if(rs_popUp)
				rs_doPop($('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val(), 'hotel');
			if(rs_groupBookingURL != '')
				window.location.href = rs_groupBookingURL;
			else
				window.location.href = "http://hotelsbycity.hotelplanner.com/Search/Index.cfm?City=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val() + "&InDate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val() + "&Outdate=" + $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val() + "&NumRooms=" + $('.rs_multiSearchBoxForm_hotel select[name=rs_rooms]', parent).val() + "&sc=HBC" + rs_refID;
		}
		else
			alert ( "Sorry, reservations have a maximum length of 21 days");
		return false;
	}

    var date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
        check_in = $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]', parent).val(),
        check_out = $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]', parent).val();

    if((date_regex).test(check_in) == false && check_in != '' && check_in != rs_hotel_dates.check_in){
        alert("Please enter your check in date.");
        $('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
        return false;
    }else if((date_regex).test(check_out) == false && check_out != '' && check_out != rs_hotel_dates.check_out){
        alert("Please enter your check out date.");
        $('.rs_multiSearchBoxForm_hotel .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
        return false;
    }
	
	if(rs_popUp)
		rs_doPop($('.rs_multiSearchBoxForm_hotel input[name=rs_city]', parent).val(), 'hotel');
		
	if(openWindow)
		$('.rs_multiSearchBoxForm_hotel', parent).attr("target", "_blank");
	if(iframeWindow)
		$('.rs_multiSearchBoxForm_hotel', parent).attr("target", "_parent");

	return true;
}

function rs_checkCarSearchForm(parent){
	$('.rs_multiSearchBoxForm_car', parent).attr('action', rs_cName + '/car/results/?');
	if(car_folder || new_car){
		$('.rs_multiSearchBoxForm_car', parent).attr('action', rs_cName + '/' + (car_folder || 'car_rentals') + '/results/?');
	}

	if($('.rs_multiSearchBoxForm_car input[name=rs_pu_city]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_car input[name=rs_pu_city]', parent).val() == "City or Airport Name"){
		alert("Please enter a pick up location.");
		$('.rs_multiSearchBoxForm_car input[name=rs_pu_city]', parent).val('');
		$('.rs_multiSearchBoxForm_car input[name=rs_pu_city]', parent).focus();
		return false;
	}

	if($('.rs_multiSearchBoxForm_car input[name=rs_return_different]', parent).attr('checked')){
		if($('.rs_multiSearchBoxForm_car input[name=rs_do_city]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_car input[name=rs_do_city]', parent).val() == "City or Airport Name"){
			alert("Please enter a drop off location.");
			$('.rs_multiSearchBoxForm_car input[name=rs_do_city]', parent).val('');
			$('.rs_multiSearchBoxForm_car input[name=rs_do_city]', parent).focus();
			return false;
		}
	}
	else{
		$('.rs_multiSearchBoxForm_car input[name=rs_do_city]', parent).val('');
		$('.rs_multiSearchBoxForm_car input[name=rs_do_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_car input[name=rs_do_airport]', parent).val('');
	}

    var date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
        check_in = $('.rs_multiSearchBoxForm_car input[name=rs_pu_date]', parent).val(),
        check_out = $('.rs_multiSearchBoxForm_car input[name=rs_do_date]', parent).val();

    if((date_regex).test(check_in) == false){
        alert("Please enter your pick up date.");
        $('.rs_multiSearchBoxForm_car .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
        return false;
    }else if((date_regex).test(check_out) == false){
        alert("Please enter your drop off date.");
        $('.rs_multiSearchBoxForm_car .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
        return false;
    }else if(check_in == check_out && $('.rs_multiSearchBoxForm_car select[name=rs_pu_time]', parent).val() == $('.rs_multiSearchBoxForm_car select[name=rs_do_time]', parent).val()){
		alert( "Please choose a drop off time at least 30 minutes after your pick up time.");
		return false;
	}

//	if($('.rs_multiSearchBoxForm_car input[name=rs_pu_date]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_car input[name=rs_pu_date]', parent).val() == ''){
//		alert("Please enter your pick up date.");
//		$('.rs_multiSearchBoxForm_car .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
//		return false;
//	}
//	else if($('.rs_multiSearchBoxForm_car input[name=rs_do_date]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_car input[name=rs_do_date]', parent).val() == ''){
//		alert("Please enter your drop off date.");
//		$('.rs_multiSearchBoxForm_car .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
//		return false;
//	}
//	else if($('.rs_multiSearchBoxForm_car input[name=rs_pu_date]', parent).val() == $('.rs_multiSearchBoxForm_car input[name=rs_do_date]', parent).val() && $('.rs_multiSearchBoxForm_car select[name=rs_pu_time]', parent).val() == $('.rs_multiSearchBoxForm_car select[name=rs_do_time]', parent).val()){
//		alert( "Please choose a drop off time at least 30 minutes after your pick up time.");
//		return false;
//	}

    // remove auto pick first autosuggest result
//	if(rs_v3 || new_car){
//		if(($('.rs_multiSearchBoxForm_car input[name=rs_pu_airport]', parent).length == 0 || $('.rs_multiSearchBoxForm_car input[name=rs_pu_airport]', parent).val() == '') && ($('.rs_multiSearchBoxForm_car input[name=rs_pu_cityid]', parent).length == 0 || $('.rs_multiSearchBoxForm_car input[name=rs_pu_cityid]', parent).val() == '')){
//			if($('.rs_multiSearchBoxAutosuggestContainer_pickUp .rs_multiSearchBoxAutosuggestResults', parent).length != 0){
//				if($('.rs_multiSearchBoxAutosuggestContainer_pickUp .rs_multiSearchBoxAutosuggestResults .selected', parent).attr('class').indexOf('city') != -1){
//					if($('.rs_multiSearchBoxForm_car input[name=rs_pu_cityid]', parent).length == 0)
//						$('.rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_pickUp', parent).append("<input type='hidden' name='rs_pu_cityid' />");
//					$('.rs_multiSearchBoxForm_car input[name=rs_pu_cityid]', parent).val($('.rs_multiSearchBoxAutosuggestContainer_pickUp .rs_multiSearchBoxAutosuggestResults .selected', parent).attr('id'));
//				}
//				else{
//					if($('.rs_multiSearchBoxForm_car input[name=rs_pu_airport]', parent).length == 0)
//						$('.rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_pickUp', parent).append("<input type='hidden' name='rs_pu_airport' />");
//					$('.rs_multiSearchBoxForm_car input[name=rs_pu_airport]', parent).val($('.rs_multiSearchBoxAutosuggestContainer_pickUp .rs_multiSearchBoxAutosuggestResults .selected', parent).attr('id'));
//				}
//			}
//		}
//
//		if($('.rs_multiSearchBoxForm_car input[name=rs_return_different]', parent).attr('checked')){
//			if(($('.rs_multiSearchBoxForm_car input[name=rs_do_airport]', parent).length == 0 || $('.rs_multiSearchBoxForm_car input[name=rs_do_airport]', parent).val() == '') && ($('.rs_multiSearchBoxForm_car input[name=rs_do_cityid]', parent).length == 0 || $('.rs_multiSearchBoxForm_car input[name=rs_do_cityid]', parent).val() == '')){
//				if($('.rs_multiSearchBoxAutosuggestContainer_dropOff .rs_multiSearchBoxAutosuggestResults', parent).length != 0){
//					if($('.rs_multiSearchBoxAutosuggestContainer_dropOff .rs_multiSearchBoxAutosuggestResults .selected', parent).attr('class').indexOf('city') != -1){
//						if($('.rs_multiSearchBoxForm_car input[name=rs_do_cityid]', parent).length == 0)
//							$('.rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_dropOff', parent).append("<input type='hidden' name='rs_do_cityid' />");
//						$('.rs_multiSearchBoxForm_car input[name=rs_do_cityid]', parent).val($('.rs_multiSearchBoxAutosuggestContainer_dropOff .rs_multiSearchBoxAutosuggestResults .selected', parent).attr('id'));
//					}
//					else{
//						if($('.rs_multiSearchBoxForm_car input[name=rs_do_airport]', parent).length == 0)
//							$('.rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_dropOff', parent).append("<input type='hidden' name='rs_do_airport' />");
//						$('.rs_multiSearchBoxForm_car input[name=rs_do_airport]', parent).val($('.rs_multiSearchBoxAutosuggestContainer_dropOff .rs_multiSearchBoxAutosuggestResults .selected', parent).attr('id'));
//					}
//				}
//			}
//		}
//	}

	if(rs_popUp)
		rs_doPop($('.rs_multiSearchBoxForm_car input[name=rs_pu_city]', parent).val(), 'car');
		
	if(openWindow)
		$('.rs_multiSearchBoxForm_car', parent).attr("target", "_blank");
	if(iframeWindow)
		$('.rs_multiSearchBoxForm_car', parent).attr("target", "_parent");

	return true;
}

function rs_checkVPSearchForm(parent){
	$('.rs_multiSearchBoxForm_vp', parent).attr('action', rs_cName + '/vp/search/?');
	
	if($('.rs_multiSearchBoxForm_vp input[name=rs_o_city]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_vp input[name=rs_o_city]', parent).val() == "City or Airport Name"){
		alert("Please enter the city or airport you are leaving from.");
		$('.rs_multiSearchBoxForm_vp input[name=rs_o_city]', parent).val('');
		$('.rs_multiSearchBoxForm_vp input[name=rs_o_city]', parent).focus();
		return false;
	}
	else if($('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).val() == "City or Airport Name"){
		alert("Please enter the city or airport you are traveling to.");
		$('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).val('');
		$('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).focus();
		return false;
	}

    var date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
        check_in = $('.rs_multiSearchBoxForm_vp input[name=rs_chk_in]', parent).val(),
        check_out = $('.rs_multiSearchBoxForm_vp input[name=rs_chk_out]', parent).val();

//	if($('.rs_multiSearchBoxForm_vp input[name=rs_chk_in]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_vp input[name=rs_chk_in]', parent).val() == ''){
//		alert("Please enter your departure date.");
//		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
//		return false;
//	}
//	if($('.rs_multiSearchBoxForm_vp input[name=rs_chk_out]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_vp input[name=rs_chk_out]', parent).val() == ''){
//		alert("Please enter your return date.");
//		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
//		return false;
//	}
    if((date_regex).test(check_in) == false){
        alert("Please enter your departure date.");
        $('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
        return false;
    }else if((date_regex).test(check_out) == false){
        alert("Please enter your return date.");
        $('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
        return false;
    }else if((((rs_stringToDate($('.rs_multiSearchBoxForm_vp input[name=rs_chk_out]', parent).val()) - rs_stringToDate($('.rs_multiSearchBoxForm_vp input[name=rs_chk_in]', parent).val()))/86400000) > 21)){
		if(rs_allowGroupBooking){
			if(confirm( "Sorry, vacation packages can only be booked for stays of 21 days or less.\nIf you wish to search for only a hotel, click 'OK', otherwise click 'CANCEL' and modify your search." )){
				if(rs_popUp)
					rs_doPop($('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).val(), 'hotel');

				if(rs_groupBookingURL != '')
					window.location.href = rs_groupBookingURL;
				else
					window.location.href = "http://hotelsbycity.hotelplanner.com/Search/Index.cfm?City=" + $('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).val() + "&InDate=" + $('.rs_multiSearchBoxForm_vp input[name=rs_chk_in]', parent).val() + "&Outdate=" + $('.rs_multiSearchBoxForm_vp input[name=rs_chk_out]', parent).val() + "&NumRooms=" + $('.rs_multiSearchBoxForm_vp select[name=rs_rooms]', parent).val() + "&sc=HBC" + rs_refID;

				return false;    
			}
			else{
				$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
				return false;
			}
		}
		else{
			alert("Sorry, vacation packages can only be booked for stays of 21 days or less");
		}
	}
	
	if($('.rs_multiSearchBoxForm_vp input[name=rs_passengers]', parent).length != 0){
		var checkRoomsVal = rs_checkRooms(parent);
		if(checkRoomsVal != 0){
			alert("Sorry, at most four guests can stay in each hotel room.\nPlease increase the number of rooms for your trip.\nFor the number of travellers you have selected, you will require at least " + checkRoomsVal + " rooms.");
			return false;
		}

		if(! rs_fillPassengers(parent))
			return false;
	}

    var vp_rooms = $('.rs_multiSearchBoxForm_vp select[name=rs_rooms]', parent);

    if(vp_rooms.length != 0 && vp_rooms.val() != '' && vp_rooms.val() > 4 && ! rs_allowGroupBooking){
        alert("Sorry, we only allow reservations between 1 and 4 rooms");
        return false;
    }

	if(rs_popUp)
		rs_doPop($('.rs_multiSearchBoxForm_vp input[name=rs_d_city]', parent).val(), 'hotel');
		
	if(openWindow)
		$('.rs_multiSearchBoxForm_vp', parent).attr("target", "_blank");
	if(iframeWindow)
		$('.rs_multiSearchBoxForm_vp', parent).attr("target", "_parent");

	return true;
}

function rs_checkAirSearchForm(parent){
	$('.rs_multiSearchBoxForm_air', parent).attr('action', rs_cName + '/air/search/?');

    var date_regex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

	if($('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_roundtrip]', parent).attr("checked")){
		if($('.rs_multiSearchBoxForm_air input[name=rs_o_city]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city]', parent).val() == "City or Airport Name"){
			alert("Please enter the city or airport you are leaving from.");
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city]', parent).val("");
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city]', parent).focus();
			return false;
		}
		if($('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).val() == "City or Airport Name"){
			alert("Please enter the city or airport you are traveling to.");
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).val("");
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).focus();
			return false;
		}
		if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_in]', parent).val()) == false){
			alert("Please enter your departure date.");
			$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn .rs_multiSearchBoxCalendar', parent).show();
			return false;
		}
		if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_out]', parent).val()) == false){
			alert("Please enter your arrival date.");
			$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkOut .rs_multiSearchBoxCalendar', parent).show();
			return false;
		}
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode1]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode1]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in1]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in5]', parent).remove();
		$('.rs_multiSearchBoxForm_air radio[name=rs_air_roundtrip]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=air_search_type]', parent).val("roundtrip");
	}
	else if($('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_oneway]', parent).attr("checked")){
		if($('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).val() == "City or Airport Name"){
			alert("Please enter the city or airport you are leaving from.");
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).val("");
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).focus();
			return false;
		}
		if($('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).val() == "City or Airport Name"){
			alert("Please enter the city or airport you are traveling to.");
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).val("");
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).focus();
			return false;
		}
		if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_in1]', parent).val()) == false){
			alert("Please enter your departure date.");
			$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn1 .rs_multiSearchBoxCalendar', parent).show();
			return false;
		}
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode5]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_out]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in2]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in3]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in4]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in5]', parent).remove();
		$('.rs_multiSearchBoxForm_air radio[name=rs_air_oneway]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=air_search_type]', parent).val("oneway");
	}
	else if($('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_multicity]', parent).attr("checked")){
		if($('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).val() == "City or Airport Name"){
			alert("Please enter the city or airport you are leaving from.");
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).val("");
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city1]', parent).focus();
			return false;
		}
		if($('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).val() == "City or Airport Name"){
			alert("Please enter the city or airport you are traveling to.");
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).val("");
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city1]', parent).focus();
			return false;
		}
		if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_in1]', parent).val()) == false){
			alert("Please enter your departure date.");
			$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn1 .rs_multiSearchBoxCalendar', parent).show();
			return false;
		}
		if($('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).val() == "City or Airport Name"){
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).val("");
		}
		if($('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).val() == "City or Airport Name"){
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).val("");
		}
		// if($('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).val() == "City or Airport Name"){
			// alert("Please enter the city or airport you are leaving from.");
			// $('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).val("");
			// $('.rs_multiSearchBoxForm_air input[name=rs_o_city2]', parent).focus();
			// return false;
		// }
		// if($('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).val() == "City or Airport Name"){
			// alert("Please enter the city or airport you are traveling to.");
			// $('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).val("");
			// $('.rs_multiSearchBoxForm_air input[name=rs_d_city2]', parent).focus();
			// return false;
		// }
		// if($('.rs_multiSearchBoxForm_air input[name=rs_chk_in2]', parent).val() == 'mm/dd/yyyy' || $('.rs_multiSearchBoxForm_air input[name=rs_chk_in2]', parent).val() == ''){
			// alert("Please enter your departure date.");
			// $('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn2 .rs_multiSearchBoxCalendar', parent).show();
			// return false;
		// }
		if($('.rs_multiSearchBoxForm_air .air_multicity_3', parent).css('display') != "none"){
			if($('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).val() == "City or Airport Name"){
				alert("Please enter the city or airport you are leaving from.");
				$('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).val("");
				$('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).focus();
				return false;
			}
			if($('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).val() == "City or Airport Name"){
				alert("Please enter the city or airport you are traveling to.");
				$('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).val("");
				$('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).focus();
				return false;
			}
			if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_in3]', parent).val()) == false){
				alert("Please enter your departure date.");
				$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn3 .rs_multiSearchBoxCalendar', parent).show();
				return false;
			}
		
		}
		if($('.rs_multiSearchBoxForm_air .air_multicity_4', parent).css('display') != "none"){
			if($('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).val() == "City or Airport Name"){
				alert("Please enter the city or airport you are leaving from.");
				$('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).val("");
				$('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).focus();
				return false;
			}
			if($('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).val() == "City or Airport Name"){
				alert("Please enter the city or airport you are traveling to.");
				$('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).val("");
				$('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).focus();
				return false;
			}
			if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_in4]', parent).val()) == false){
				alert("Please enter your departure date.");
				$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn4 .rs_multiSearchBoxCalendar', parent).show();
				return false;
			}
		
		}
		if($('.rs_multiSearchBoxForm_air .air_multicity_5', parent).css('display') != "none"){
			if($('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).val() == "City or Airport Name"){
				alert("Please enter the city or airport you are leaving from.");
				$('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).val("");
				$('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).focus();
				return false;
			}
			if($('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).val().replace(/[^a-zA-Z0-9]+/g,'') == "" || $('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).val() == "City or Airport Name"){
				alert("Please enter the city or airport you are traveling to.");
				$('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).val("");
				$('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).focus();
				return false;
			}
			if((date_regex).test($('.rs_multiSearchBoxForm_air input[name=rs_chk_in5]', parent).val()) == false){
				alert("Please enter your departure date.");
				$('.rs_multiSearchBoxForm_air .rs_multiSearchBoxCalendarContainer_checkIn5 .rs_multiSearchBoxCalendar', parent).show();
				return false;
			}
		
		}
		if($('.rs_multiSearchBoxForm_air .air_multicity_5', parent).css('display') == "none"){
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city5]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city5]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode5]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode5]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_chk_in5]', parent).remove();
		}
		if($('.rs_multiSearchBoxForm_air .air_multicity_4', parent).css('display') == "none"){
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city4]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city4]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode4]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode4]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_chk_in4]', parent).remove();
		}
		if($('.rs_multiSearchBoxForm_air .air_multicity_3', parent).css('display') == "none"){
			$('.rs_multiSearchBoxForm_air input[name=rs_o_city3]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_d_city3]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode3]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode3]', parent).remove();
			$('.rs_multiSearchBoxForm_air input[name=rs_chk_in3]', parent).remove();
		}
		$('.rs_multiSearchBoxForm_air input[name=rs_o_city]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_o_aircode]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_d_aircode]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_in]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=rs_chk_out]', parent).remove();
		$('.rs_multiSearchBoxForm_air radio[name=rs_air_multicity]', parent).remove();
		$('.rs_multiSearchBoxForm_air input[name=air_search_type]', parent).val("multi");
	}

	if(parseInt($('.rs_multiSearchBoxForm_air select[name=rs_adults]', parent).val()) + parseInt($('.rs_multiSearchBoxForm_air select[name=rs_children]', parent).val()) > 8){
		alert("Sorry, flight reservations are limited to 8 passengers.");
		return false;
	}

	if(rs_popUp)
		rs_doPop($('.rs_multiSearchBoxForm_air input[name=rs_d_city]', parent).val(), 'air');
		
	if(openWindow)
		$('.rs_multiSearchBoxForm_air', parent).attr("target", "_blank");
	if(iframeWindow)
		$('.rs_multiSearchBoxForm_air', parent).attr("target", "_parent");

	return true;
}

// ------------------ AUTOCOMPLETE FUNCTIONS ------------------ //

function rs_killRequest(){
	if(rs_request != null){
		rs_request.abort();
		rs_request = null;
	}
}


function rs_blankResult(product, subParent, parent){
	$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).css('background-image', 'none');
	$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults', parent).hide();
	
	if(product == 'hotel'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_cid]', parent).val('');
		if($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_lmark]', parent).css('display') == 'none')
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_lmark]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_rid]', parent).val('');
	}
	else if(product == 'car'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_airport]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_airport]', parent).val('');
	}
	else if(product == 'vp'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).val('');
	}
	else if(product == 'air'){ // ADD
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_cityid]', parent).val('');
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).val('');
	}
}

function rs_autocompleteIsVisible(product, subParent, parent){
	if($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults', parent).css('display') == 'block')
		return true;
	else
		return false;
}

function rs_saveChoice(selectedResult, product, subParent, parent)
{
	$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults', parent).hide();
	
	if(product == 'hotel'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());

		if (! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_cid]', parent).length)
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_cid' />");
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_cid]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
		
		var resultType = $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('class').split(' ').slice(0,1);
		
		if(resultType == 'region'){
			if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_rid]', parent).length)
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_rid' />");
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_rid]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
		}
		else
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_rid]', parent).val('');
			
		if(resultType == 'airport'){            
			if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_lmark]', parent).length)
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_lmark' />");
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_lmark]', parent).val('air' + $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());            
		}
		else if($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_lmark]', parent).css('display') == 'none')
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_lmark]', parent).val('');

		if(rs_hotelroom){
			if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_link_agent]', parent).length)
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_link_agent' />");
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_link_agent]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .link_agent', parent).text());     
		}
	}
	else if(product == 'car'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());	
		
		var resultType = $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('class').split(' ').slice(0,1);
		if(resultType == 'airport'){
			if(subParent == '.rs_multiSearchBoxAutosuggestContainer_pickUp'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_cityid]', parent).remove();
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_airport]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_pu_airport' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_airport]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_dropOff'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_cityid]', parent).remove();
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_airport]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_do_airport' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_airport]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());
			}
		}
		else if(resultType == 'city'){
			 if(subParent == '.rs_multiSearchBoxAutosuggestContainer_pickUp'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_airport]', parent).remove();
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_cityid]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_pu_cityid' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_cityid]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_dropOff'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_airport]', parent).remove();
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_cityid]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_do_cityid' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_cityid]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
		}
	}
	else if(product == 'vp'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());

		var resultType = $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('class').split(' ').slice(0,1);
		if(resultType == 'airport'){
			if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
		}
		else{
			if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_cityid]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_cityid' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_cityid]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_cityid]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_cityid' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_cityid]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
		}
	}
	else if(product == 'air'){
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult + ' .cleanName', parent).text());

		var resultType = $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('class').split(' ').slice(0,1);
		if(resultType == 'airport'){
			if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin1'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode1]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode1' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode1]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination1'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode1]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode1' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode1]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin2'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode2]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode2' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode2]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination2'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode2]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode2' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode2]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin3'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode3]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode3' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode3]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination3'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode3]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode3' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode3]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin4'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode4]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode4' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode4]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination4'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode4]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode4' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode4]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin5'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode5]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode5' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode5]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination5'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode5]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode5' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode5]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
		}
		else{
			if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin1'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode1]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode1' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode1]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination1'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode1]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode1' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode1]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin2'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode2]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode2' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode2]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination2'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode2]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode2' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode2]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin3'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode3]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode3' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode3]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination3'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode3]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode3' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode3]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin4'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode4]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode4' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode4]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination4'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode4]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode4' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode4]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin5'){
				if(! $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode5]', parent).length)
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_o_aircode5' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_o_aircode5]', parent).val($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id'));
			}
			else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination5'){
				if ( !$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode5]', parent).length )
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent, parent).append("<input type='hidden' name='rs_d_aircode5' />");
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_d_aircode5]', parent).val ( $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent ).attr('id') );
			}
		}
	}

	rs_killRequest();
}

function rs_setCurrentResult(selectedResult, product, subParent, parent){
	if(selectedResult == $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults li', parent).length)
		selectedResult = 0;
	
	if(selectedResult == -1)
		selectedResult = $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults li', parent).length - 1;
		
	rs_currentResult = selectedResult;

	if(selectedResult != "hotelTitle" && selectedResult != "airportTitle")
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .selected', parent).removeClass('selected');

	$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults .result_' + selectedResult, parent).addClass('selected');
	
	rs_killRequest();
}

function rs_runAutocomplete(currentSearch, product, subParent, parent){
	$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).css('background', '#FFF url(' + rs_source + '/img/loader.gif) no-repeat right center');

	if(product == 'hotel')
		var jsonSource = rs_source + "/inc/json_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&petFilter=" + rs_petFilter + "&bookingFilter=" + rs_bookingMode +  "&refid=" + rs_refID + "&sid=" + rs_sid + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&hotelroom=" + rs_hotelroom + "&jsoncallback=?";
	else if(product == 'car'){
		if(rs_v3 || new_car)
			var jsonSource = rs_source + "/inc/json_car_autocomplete_v3.php?stateFilter=" + rs_stateFilter + "&rs_v3=" + rs_v3 + "&countryFilter=" + rs_countryFilter + "&string=" + currentSearch + "&airFirst=" + rs_airFirst + "&jsoncallback=?";
		else
			var jsonSource = rs_source + "/inc/json_car_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&jsoncallback=?";
	}
	else if(product == 'vp'){
		if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin')
			var jsonSource = rs_source + "/inc/json_vp_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination')
			var jsonSource = rs_source + "/inc/json_vp_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination&jsoncallback=?";
	}
	else if(product == 'air'){
		if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin1')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin1&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination1')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination1&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin2')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin2&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination2')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination2&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin3')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin3&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination3')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination3&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin4')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin4&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination4')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination4&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_origin5')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=origin5&jsoncallback=?";
		else if(subParent == '.rs_multiSearchBoxAutosuggestContainer_destination5')
			var jsonSource = rs_source + "/inc/json_air_autocomplete_redesign.php?stateFilter=" + rs_stateFilter + "&countryFilter=" + rs_countryFilter + "&query=" + currentSearch + "&airFirst=" + rs_airFirst + "&container=destination5&jsoncallback=?";
	}

	rs_request = $.getJSON(jsonSource, function(data){
		rs_request = null;
		if(data.data[0].html.indexOf('li') != -1){
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults', parent).html('<div class="rs_multiSearchBoxAutosuggestResultsContent">' + data.data[0].html + '</div>')
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults', parent).show();
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults', parent).bgiframe();
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).css('background-image', 'none');
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults li', parent).click ( function() { rs_saveChoice(($(this).attr('class').split(' ').slice(0)).toString().split('_').slice(-1).toString().split(',').slice(0, 1).toString(), product, subParent, parent); } );
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggestResults li', parent).mouseover ( function() { rs_setCurrentResult(($(this).attr('class').split(' ').slice(0)).toString().split('_').slice(-1).toString().split(',').slice(0, 1).toString(), product, subParent, parent); } );

			rs_setCurrentResult(0, product, subParent, parent);
		}
		else{
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxAutosuggest', parent).css('background-image', 'none');
		}    
		rs_killRequest();
	});
	
}

$(document).ready(function(){
	rs_loadRefData();
	
	//rs_fillProductTabs('#changeSearchForm');
	
	if(rs_currentProduct != "hotel")
		$(".rs_multiSearchBoxContent_hotel").hide();
  
	rs_switchTab(rs_currentProduct, '#changeSearchForm');

    //Set default value for check in and check out for hotel
    rs_hotel_dates.check_in = $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_in]').val();
    rs_hotel_dates.check_out = $('.rs_multiSearchBoxForm_hotel input[name=rs_chk_out]').val();

	//alert(rs_currentProduct);

	$(document).click(function(e){
	
		var clicked = $(e.target);
		
		var visibleAutocomplete = $('.rs_multiSearchBoxForm_' + rs_currentProduct + ' .rs_multiSearchBoxAutosuggestResults:visible');        
		if(visibleAutocomplete.length != 0 && rs_autocompleteIsVisible ( rs_currentProduct, rs_getAutocompleteParent(visibleAutocomplete), rs_getParent(visibleAutocomplete)))
			rs_blankResult(rs_currentProduct, rs_getAutocompleteParent(visibleAutocomplete), rs_getParent(visibleAutocomplete));
		
		if(! ($(clicked).parents().is('.rs_multiSearchBoxCalendar') || $(clicked).parents().is('.rs_calendarBody')) && !$(clicked).is('.rs_multiSearchBoxCalendarShow') && ($(clicked).attr('class') != 'calendarNext') && ($(clicked).attr('class') != 'calendarPrev'))
			$('.rs_multiSearchBoxCalendar').hide();
	});

	var ua = window.navigator.userAgent;
	
	$('.rs_multiSearchBoxAutosuggest').keydown(function(event){
		if(! rs_noAutosuggest){
			if(event.keyCode != 16)    //Shift
				rs_killRequest();

			if(event.keyCode == 13){  //Enter
				if(rs_autocompleteIsVisible(rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)))){
					rs_saveChoice(rs_currentResult, rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
					return false;   //Blocks the form submission
				}
				else
					return true;    //This causes the form to submit
			}
			else if(event.keyCode == 9){  //Tab
				if(rs_autocompleteIsVisible(rs_currentResult, rs_getAutocompleteParent($(this)), rs_getParent($(this))))
					rs_saveChoice(rs_currentResult, rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
			}
			else if(event.keyCode == 8 && $(this).val().length < 3) //Tab or backspace
				rs_blankResult(rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
		}
		else
			rs_blankResult(rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
	});

	$('.rs_multiSearchBoxAutosuggest').keyup(function(event){
		if (! rs_noAutosuggest){
			if(event.keyCode != 16)    //Shift
				rs_killRequest();

			if(event.keyCode == 40)  // Up
				rs_setCurrentResult(rs_currentResult + 1, rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
			else if(event.keyCode == 38) //Down
				rs_setCurrentResult(rs_currentResult - 1, rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
			else if(event.keyCode == 27) //Escape
				rs_blankResult(rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
			else if($(this).val().length >= 3 && ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode == 8 || ((/(Android.[0-9]*)+.*(Chrome\/[0-9]*)/).test(ua)))) //A-Z and backspace
				rs_runAutocomplete($(this).val(), rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
			else if($(this).val().length < 3)
				rs_blankResult(rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
		}
		else
			rs_blankResult(rs_currentProduct, rs_getAutocompleteParent($(this)), rs_getParent($(this)));
	});
	
	//$(".rs_multiSearchBoxes input").click(function() { $(this, rs_getParent($(this))).css('color', '#464646'); });
	//$(".rs_multiSearchBoxes select").click(function() { $(this, rs_getParent($(this))).css('color', '#464646'); });
	
	$('.rs_multiSearchBoxContent_car .rs_multiSearchBoxForm_car input[name=rs_return_different]').removeAttr("checked");
	$('.rs_multiSearchBoxContent_car .rs_multiSearchBoxForm_car input[name=rs_return_different]').click(function(){
		if($('.rs_multiSearchBoxContent_car .rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_dropOff', rs_getParent($(this))).css('display') == 'none')
			$('.rs_multiSearchBoxContent_car .rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_dropOff', rs_getParent($(this))).slideDown();
		else
			$('.rs_multiSearchBoxContent_car .rs_multiSearchBoxForm_car .rs_multiSearchBoxAutosuggestContainer_dropOff', rs_getParent($(this))).slideUp();
	});
	
	var destnum = 2;
	
	$('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_oneway]').removeAttr("checked");
	$('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_oneway]').click(function(){
		$(".rs_multiSearchBoxForm_air .air_options input", rs_getParent($(this))).each(function(){
			$(this).removeAttr('checked');
		});
		$(this).attr('checked', 'checked');
		$(".air_roundtrip_box", rs_getParent($(this))).hide();
		$(".air_multicity_1 .rs_air_checkout", rs_getParent($(this))).hide();
		$(".air_multicity_box", rs_getParent($(this))).show();
		$(".air_multicity_2", rs_getParent($(this))).hide();
		$(".air_multicity_3", rs_getParent($(this))).hide();
		$(".air_multicity_4", rs_getParent($(this))).hide();
		$(".air_multicity_5", rs_getParent($(this))).hide();
		$(".air_stepPassengers", rs_getParent($(this))).text("3");
		$(".air_add_dest", rs_getParent($(this))).hide();
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_oneway]", rs_getParent($(this))).addClass("bold");
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_roundtrip]", rs_getParent($(this))).removeClass("bold");
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_multicity]", rs_getParent($(this))).removeClass("bold");
		
	});
	
	$('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_roundtrip]').click(function(){
		$(".rs_multiSearchBoxForm_air .air_options input", rs_getParent($(this))).each(function(){
			$(this).removeAttr('checked');
		});
		$(this).attr('checked', 'checked');
		$(".air_roundtrip_box", rs_getParent($(this))).show();
		$(".air_multicity_box", rs_getParent($(this))).hide();
		$(".air_multicity_2", rs_getParent($(this))).hide();
		$(".air_stepPassengers", rs_getParent($(this))).text("3");
		$(".air_add_dest", rs_getParent($(this))).hide();
		$(".air_multicity_3", rs_getParent($(this))).hide();
		$(".air_multicity_4", rs_getParent($(this))).hide();
		$(".air_multicity_5", rs_getParent($(this))).hide();
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_oneway]", rs_getParent($(this))).removeClass("bold");
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_roundtrip]", rs_getParent($(this))).addClass("bold");
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_multicity]", rs_getParent($(this))).removeClass("bold");
		
	});
	
	$('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_multicity]').removeAttr("checked");
	$('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_multicity]').click(function(){
		$(".rs_multiSearchBoxForm_air .air_options input", rs_getParent($(this))).each(function(){
			$(this).removeAttr('checked');
		});
		$(this).attr('checked', 'checked');
		$(".air_roundtrip_box", rs_getParent($(this))).hide();
		$(".air_multicity_1 .rs_air_checkout", rs_getParent($(this))).show();
		$(".air_multicity_box", rs_getParent($(this))).show();
		$(".air_multicity_2", rs_getParent($(this))).slideDown();
		$(".air_stepPassengers", rs_getParent($(this))).text("5");
		$(".air_add_dest", rs_getParent($(this))).slideDown();
		destnum = 2;
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_oneway]", rs_getParent($(this))).removeClass("bold");
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_roundtrip]", rs_getParent($(this))).removeClass("bold");
		$(".rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air label[for=air_multicity]", rs_getParent($(this))).addClass("bold");
		
	});
	
	$(".air_add_dest").click(function() {
		if(destnum <= 4){
			destnum++;
			$(".air_multicity_" + parseInt(destnum), rs_getParent($(this))).slideDown();
			$(".air_stepPassengers", rs_getParent($(this))).text(destnum * 2 + 1);
		}
		if(destnum >= 5)
			$(this).slideUp();
	});
	
	$(".air_removeflight").click(function() {
		var temp = "air_multicity_" + parseInt(destnum);
		var thisid = $(this).parent().parent().parent().parent().attr('class');
		thisid = thisid.substr(0, 15);
		if(temp == thisid){
			$(".air_multicity_" + parseInt(destnum), rs_getParent($(this))).slideUp();
			$(".air_multicity_" + parseInt(destnum) + " input[name=rs_o_city" + parseInt(destnum) + "]", rs_getParent($(this))).val("City or Airport Name");
			$(".air_multicity_" + parseInt(destnum) + " input[name=rs_d_city" + parseInt(destnum) + "]", rs_getParent($(this))).val("City or Airport Name");
			$(".air_multicity_" + parseInt(destnum) + " input[name=rs_o_aircode" + parseInt(destnum) + "]", rs_getParent($(this))).val("");
			$(".air_multicity_" + parseInt(destnum) + " input[name=rs_d_aircode" + parseInt(destnum) + "]", rs_getParent($(this))).val("");
			$(".air_multicity_" + parseInt(destnum) + " input[name=rs_chk_in" + parseInt(destnum) + "]", rs_getParent($(this))).val("mm/dd/yyyy");
			
			destnum--;
			$(".air_stepPassengers", rs_getParent($(this))).text(destnum * 2 + 1);
		}
		else{
			if(thisid == "air_multicity_3"){
				if($(".air_multicity_4", rs_getParent($(this))).css("display") != "none"){
					$(".air_multicity_3 input[name=rs_o_city3]", rs_getParent($(this))).val($(".air_multicity_4 input[name=rs_o_city4]", rs_getParent($(this))).val());
					$(".air_multicity_3 input[name=rs_d_city3]", rs_getParent($(this))).val($(".air_multicity_4 input[name=rs_d_city4]", rs_getParent($(this))).val());
					$(".air_multicity_3 input[name=rs_o_aircode3]", rs_getParent($(this))).val($(".air_multicity_4 input[name=rs_o_aircode4]", rs_getParent($(this))).val());
					$(".air_multicity_3 input[name=rs_d_aircode3]", rs_getParent($(this))).val($(".air_multicity_4 input[name=rs_d_aircode4]", rs_getParent($(this))).val());
					$(".air_multicity_3 input[name=rs_chk_in3]", rs_getParent($(this))).val($(".air_multicity_4 input[name=rs_chk_in4]", rs_getParent($(this))).val());
					$(".air_multicity_3 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val($(".air_multicity_4 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val());
					$(".air_multicity_3 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val($(".air_multicity_4 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val());
					
					$(".air_multicity_4 input[name=rs_o_city4]", rs_getParent($(this))).val("City or Airport Name");
					$(".air_multicity_4 input[name=rs_d_city4]", rs_getParent($(this))).val("City or Airport Name");
					$(".air_multicity_4 input[name=rs_o_aircode4]", rs_getParent($(this))).val("");
					$(".air_multicity_4 input[name=rs_d_aircode4]", rs_getParent($(this))).val("");
					$(".air_multicity_4 input[name=rs_chk_in4]", rs_getParent($(this))).val("mm/dd/yyyy");
					$(".air_multicity_4 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val("Month");
					$(".air_multicity_4 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val("Day")
				}
				if($(".air_multicity_5", rs_getParent($(this))).css("display") != "none"){
					$(".air_multicity_4 input[name=rs_o_city4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_o_city5]", rs_getParent($(this))).val());
					$(".air_multicity_4 input[name=rs_d_city4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_d_city5]", rs_getParent($(this))).val());
					$(".air_multicity_4 input[name=rs_o_aircode4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_o_aircode5]", rs_getParent($(this))).val());
					$(".air_multicity_4 input[name=rs_d_aircode4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_d_aircode5]", rs_getParent($(this))).val());
					$(".air_multicity_4 input[name=rs_chk_in4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_chk_in5]", rs_getParent($(this))).val());
					$(".air_multicity_4 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val($(".air_multicity_5 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val());
					$(".air_multicity_4 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val($(".air_multicity_5 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val());
					
					$(".air_multicity_5 input[name=rs_o_city5]", rs_getParent($(this))).val("City or Airport Name");
					$(".air_multicity_5 input[name=rs_d_city5]", rs_getParent($(this))).val("City or Airport Name");
					$(".air_multicity_5 input[name=rs_o_aircode5]", rs_getParent($(this))).val("");
					$(".air_multicity_5 input[name=rs_d_aircode5]", rs_getParent($(this))).val("");
					$(".air_multicity_5 input[name=rs_chk_in5]", rs_getParent($(this))).val("mm/dd/yyyy");
					$(".air_multicity_5 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val("Month");
					$(".air_multicity_5 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val("Day")
				}
				$(".air_multicity_" + parseInt(destnum), rs_getParent($(this))).slideUp();
				destnum--;
				$(".air_stepPassengers", rs_getParent($(this))).text(destnum * 2 + 1);
			}
			else{
				$(".air_multicity_4 input[name=rs_o_city4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_o_city5]", rs_getParent($(this))).val());
				$(".air_multicity_4 input[name=rs_d_city4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_d_city5]", rs_getParent($(this))).val());
				$(".air_multicity_4 input[name=rs_o_aircode4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_o_aircode5]", rs_getParent($(this))).val());
				$(".air_multicity_4 input[name=rs_d_aircode4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_d_aircode5]", rs_getParent($(this))).val());
				$(".air_multicity_4 input[name=rs_chk_in4]", rs_getParent($(this))).val($(".air_multicity_5 input[name=rs_chk_in5]", rs_getParent($(this))).val());
				$(".air_multicity_4 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val($(".air_multicity_5 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val());
				$(".air_multicity_4 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val($(".air_multicity_5 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val());
				
				$(".air_multicity_5 input[name=rs_o_city5]", rs_getParent($(this))).val("City or Airport Name");
				$(".air_multicity_5 input[name=rs_d_city5]", rs_getParent($(this))).val("City or Airport Name");
				$(".air_multicity_5 input[name=rs_o_aircode5]", rs_getParent($(this))).val("");
				$(".air_multicity_5 input[name=rs_d_aircode5]", rs_getParent($(this))).val("");
				$(".air_multicity_5 input[name=rs_chk_in5]", rs_getParent($(this))).val("mm/dd/yyyy");
				$(".air_multicity_5 .rs_multiSearchBoxCalendarMonth", rs_getParent($(this))).val("Month");
				$(".air_multicity_5 .rs_multiSearchBoxCalendarDay", rs_getParent($(this))).val("Day")
				
				$(".air_multicity_" + parseInt(destnum), rs_getParent($(this))).slideUp();
				destnum--;
				$(".air_stepPassengers", rs_getParent($(this))).text(destnum * 2 + 1);
			}
		}
		
		if(destnum <= 4)
			$(".air_add_dest", rs_getParent($(this))).slideDown();
	});
});

// ------------------ CALENDAR FUNCTIONS ------------------ //

function rs_getCalType(element){
	return($(element).parents('.rs_multiSearchBoxCalendarContainer').attr('class')).replace("rs_multiSearchBoxCalendarContainer rs_multiSearchBoxCalendarContainer_", "");
}

function rs_getCalParent(element){
	return '.' + ($(element).parents('.rs_multiSearchBoxCalendarGroupContainer').attr('class')).replace("rs_multiSearchBoxCalendarGroupContainer ", "");
}

function rs_daysInFeb(year){
	if(new Date(year,1,29).getDate()==29)
		return 29;
	else
		return 28;
}

function rs_getDaysInMonth(month, year){
	if(month == 1)
		return rs_daysInFeb(year);
	else
		return rs_daysInMonth[month];
}

function rs_stringToDate(string){
	var splitted = string.split("/");
	if(splitted[0] == 'mm' || splitted[0] == null || splitted[0] == '')
		return rs_today;
	else
		return new Date( splitted[2], splitted[0]-1, splitted[1]);
}

function rs_getAirCheckIn(product, subParent, parent, calType){
	if(product == "air" && calType == "checkIn1")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in1]', parent).val()));
	else if(product == "air" && calType == "checkIn2")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in2]', parent).val()));
	else if(product == "air" && calType == "checkIn3")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in3]', parent).val()));
	else if(product == "air" && calType == "checkIn4")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in4]', parent).val()));
	else if(product == "air" && calType == "checkIn5")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in5]', parent).val()));
}

function rs_getCheckIn(product, subParent, parent){
	if(product == "hotel" || product == "vp" || product == "air")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in]', parent).val()));
	else if(product == "car")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_date]', parent).val()));
}

function rs_getCheckOut ( product, subParent, parent ){		//fix
	if(product == "air" && (! $('.rs_multiSearchBoxContent_air .rs_multiSearchBoxForm_air input[name=rs_air_roundtrip]').attr("checked")))
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out1]', parent).val()));
	else if(product == "hotel" || product == "vp" || product == "air")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out]', parent).val()));
	else if(product == "car")
		return(rs_stringToDate($('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_date]', parent).val()));
}

function rs_drawPrev(month, year, product, calType, subParent, parent){
	var drawDate = new Date(year, month, 1);
	drawDate.setMonth(drawDate.getMonth() -  1);
	
	if(calType == "checkIn")
		rs_drawCalendar(drawDate, rs_today, rs_getCheckIn(product, subParent, parent), rs_getCheckOut(product, subParent, parent), product, calType, true, subParent, parent);
	else
		rs_drawCalendar(drawDate, rs_getCheckIn(product, subParent, parent), rs_getCheckIn(product, subParent, parent), rs_getCheckIn(product, subParent, parent), product, calType, true, subParent, parent);
}

function rs_drawNext(month, year, product, calType, subParent, parent){
	var drawDate = new Date(year, month, 1);
	drawDate.setMonth(drawDate.getMonth() + 1);
	if(calType == "checkIn")
		rs_drawCalendar(drawDate, rs_today, rs_getCheckIn(product, subParent, parent), rs_getCheckOut(product, subParent, parent), product, calType, true, subParent, parent);
	else
		rs_drawCalendar(drawDate, rs_getCheckIn(product, subParent, parent), rs_getCheckIn(product, subParent, parent), rs_getCheckIn(product, subParent, parent), product, calType, true, subParent, parent);
}

function rs_setDay(day, product, calType, subParent, parent){
	if(calType == 'checkIn'){
		var chk_in = rs_getCheckIn(product, subParent, parent);
		rs_setDate(chk_in.getFullYear(), chk_in.getMonth(), day, product, calType, subParent, parent);
	}
	if(calType == 'checkIn1' || calType == 'checkIn2' || calType == 'checkIn3' || calType == 'checkIn4' || calType == 'checkIn5'){
		var chk_in = rs_getAirCheckIn(product, subParent, parent, calType);
		rs_setDate(chk_in.getFullYear(), chk_in.getMonth(), day, product, calType, subParent, parent);
	}
	if(calType == 'checkOut'){
		var chk_out = rs_getCheckOut(product, subParent, parent);
		rs_setDate(chk_out.getFullYear(), chk_out.getMonth(), day, product, calType, subParent, parent);
	}
}

function rs_setMonth(month, product, calType, subParent, parent){
	if(month.length == 1)
		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth' , parent).val(0);
	else{
		var newMonth = month.split('-')[0];
		var newYear = month.split('-')[1];
		rs_setDate(newYear, newMonth, 1, product, calType, subParent, parent);
	}
}

function rs_isValidDate(date) {
    if ( Object.prototype.toString.call(date) !== "[object Date]" )
        return false;
    return !isNaN(date.getTime());
}

function rs_setDate(year, month, day, product, calType, subParent, parent){
	$('.rs_multiSearchBoxCalendar').hide();

	if(product == "air" && calType == "checkIn1"){
		var chk_in1 = rs_getAirCheckIn(product, subParent, parent, calType);
	}
	else if(product == "air" && calType == "checkIn2"){
		var chk_in2 = rs_getAirCheckIn(product, subParent, parent, calType);
	}
	else if(product == "air" && calType == "checkIn3"){
		var chk_in3 = rs_getAirCheckIn(product, subParent, parent, calType);
	}
	else if(product == "air" && calType == "checkIn4"){
		var chk_in4 = rs_getAirCheckIn(product, subParent, parent, calType);
	}
	else if(product == "air" && calType == "checkIn5"){
		var chk_in5 = rs_getAirCheckIn(product, subParent, parent, calType);
	}
	else{
		var chk_in = rs_getCheckIn(product, subParent, parent);
		var chk_out = rs_getCheckOut(product, subParent, parent);
	}
	
	if(calType == 'checkIn'){
		var chk_in = new Date(year, month, day);
		if(chk_in < rs_today)
			chk_in = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());
				
		if((product == "hotel" || product == "vp" || product == "air") && (rs_getCheckOut(product, subParent, parent) <= chk_in || ! rs_isValidDate(rs_getCheckOut(product, subParent, parent)))){
			var chk_out = new Date(chk_in.getFullYear(), chk_in.getMonth(), chk_in.getDate());
			chk_out.setDate(chk_out.getDate() + 1);
		}
		else if(product == "car" && rs_getCheckOut(product, subParent, parent) < chk_in){
			var chk_out = new Date(chk_in.getFullYear(), chk_in.getMonth(), chk_in.getDate());
			chk_out.setDate(chk_out.getDate() + 1);
		}

		if(product == "hotel" || product == "vp" || product == "air"){
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in]', parent).val((chk_in.getMonth()+1) + '/' + chk_in.getDate() + '/' + chk_in.getFullYear());
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out]', parent).val((chk_out.getMonth()+1) + '/' + chk_out.getDate() + '/' + chk_out.getFullYear());
		}
		else if(product == "car"){
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_date]', parent).val((chk_in.getMonth()+1) + '/' + chk_in.getDate() + '/' + chk_in.getFullYear());
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_date]', parent).val((chk_out.getMonth()+1) + '/' + chk_out.getDate() + '/' + chk_out.getFullYear());
		}
	}
	else if(calType == 'checkIn1'){
		var chk_in1 = new Date(year, month, day);
		if(chk_in1 < rs_today)
			chk_in1 = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());

		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in1]', parent).val((chk_in1.getMonth()+1) + '/' + chk_in1.getDate() + '/' + chk_in1.getFullYear());
	}
	else if(calType == 'checkIn2'){
		var chk_in2 = new Date(year, month, day);
		if(chk_in2 < rs_today)
			chk_in2 = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());

		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in2]', parent).val((chk_in2.getMonth()+1) + '/' + chk_in2.getDate() + '/' + chk_in2.getFullYear());
	}
	else if(calType == 'checkIn3'){
		var chk_in3 = new Date(year, month, day);
		if(chk_in3 < rs_today)
			chk_in3 = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());

		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in3]', parent).val((chk_in3.getMonth()+1) + '/' + chk_in3.getDate() + '/' + chk_in3.getFullYear());
	}
	else if(calType == 'checkIn4'){
		var chk_in4 = new Date(year, month, day);
		if(chk_in4 < rs_today)
			chk_in4 = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());

		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in4]', parent).val((chk_in4.getMonth()+1) + '/' + chk_in4.getDate() + '/' + chk_in4.getFullYear());
	}
	else if(calType == 'checkIn5'){
		var chk_in5 = new Date(year, month, day);
		if(chk_in5 < rs_today)
			chk_in5 = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());

		$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in5]', parent).val((chk_in5.getMonth()+1) + '/' + chk_in5.getDate() + '/' + chk_in5.getFullYear());
	}
	else if(calType == 'checkOut'){
		var chk_out = new Date(year, month, day);
		
		if(chk_in < rs_today)
			chk_in = new Date(rs_today.getFullYear(), rs_today.getMonth(), rs_today.getDate());
		
		if((product == "hotel" || product == "vp") && chk_out <= chk_in){
			chk_out = new Date(chk_in.getFullYear(), chk_in.getMonth(), chk_in.getDate());
			chk_out.setDate(chk_out.getDate() + 1);
		}
		else if(product == "air" && chk_out <= chk_in){
			chk_out = new Date(chk_in.getFullYear(), chk_in.getMonth(), chk_in.getDate());
			chk_out.setDate(chk_out.getDate());

		}
		else if(product == "car" && chk_out <= chk_in){
			chk_out = new Date(chk_in.getFullYear(), chk_in.getMonth(), chk_in.getDate());
			chk_out.setDate(chk_out.getDate());
		}

		if(product == "hotel" || product == "vp" || product == "air"){
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in]', parent).val((chk_in.getMonth()+1) + '/' + chk_in.getDate() + '/' + chk_in.getFullYear());
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out]', parent).val((chk_out.getMonth()+1) + '/' + chk_out.getDate() + '/' + chk_out.getFullYear());        
		}
		else if(product == "car"){
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_date]', parent).val((chk_in.getMonth()+1) + '/' + chk_in.getDate() + '/' + chk_in.getFullYear());
			$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_date]', parent).val((chk_out.getMonth()+1) + '/' + chk_out.getDate() + '/' + chk_out.getFullYear());        
		}
	}
	
	if(product == "air" && calType == "checkIn1"){
		rs_drawCalendar(chk_in1, rs_today, chk_in1, false, product, 'checkIn1', false, subParent, parent);
	}
	else if(product == "air" && calType == "checkIn2"){
		rs_drawCalendar(chk_in2, rs_today, chk_in2, false, product, 'checkIn2', false, subParent, parent);
	}
	else if(product == "air" && calType == "checkIn3"){
		rs_drawCalendar(chk_in3, rs_today, chk_in3, false, product, 'checkIn3', false, subParent, parent);
	}
	else if(product == "air" && calType == "checkIn4"){
		rs_drawCalendar(chk_in4, rs_today, chk_in4, false, product, 'checkIn4', false, subParent, parent);
	}
	else if(product == "air" && calType == "checkIn5"){
		rs_drawCalendar(chk_in5, rs_today, chk_in5, false, product, 'checkIn5', false, subParent, parent);
	}
	else{
		rs_drawCalendar(chk_out, chk_in, chk_out, chk_in, product, 'checkOut', false, subParent, parent);
		rs_drawCalendar(chk_in, rs_today, chk_in, chk_out, product, 'checkIn', false, subParent, parent);
	}
}

function rs_printMonths(minDate, drawDate, rs_maxDate, drawBlank){
	var result = '';
	var year = minDate.getFullYear();
	var printDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
	
	if(drawBlank)
		result = '<option>Month</option><option>&nbsp;</option>';

	while(printDate <= rs_maxDate){
		result += '<option';
		if(printDate.getMonth() == drawDate.getMonth() && printDate.getFullYear() == drawDate.getFullYear() && drawBlank == false)
			result += ' selected=SELECTED';
		//result += ' value="' + printDate.getMonth() + '-' + printDate.getFullYear() + '">' + rs_shortMonthNames[printDate.getMonth()] + ' `' + printDate.getFullYear().toString().slice(2,4) + '</option>';
		result += ' value="' + printDate.getMonth() + '-' + printDate.getFullYear() + '">' + rs_shortMonthNames[printDate.getMonth()] + '</option>';
		printDate.setMonth(printDate.getMonth() + 1);
	}

	return result;
}

function rs_printDays(drawDate, minDate, rs_maxDate, drawBlank){
	var result = '';
	var printDate = new Date(drawDate.getFullYear(), drawDate.getMonth(), 1);
	if(drawBlank){
		result = '<option>Day</option>';
		return result;
	}

	for(var i = 1; i <= rs_getDaysInMonth(drawDate.getMonth(), drawDate.getFullYear()); i ++){
		printDate.setDate(i);
		if(printDate <= rs_maxDate && printDate >= minDate){
			result += '<option value=\'' + i + '\'';
			if(printDate.toDateString() == drawDate.toDateString() && drawBlank == false)
				result += ' selected=SELECTED';
			result += '>' + i + '</option>';
		}
	}

	return result;
}

function rs_drawCalendar(drawDate, minDate, date, otherDate, product, calType, skipSelect, subParent, parent){
	var html = '<div class="rs_calendarBody">';
	var daysLeftInWeek = 7;
	var weeksToPrint = 6;
	
	if((product == "hotel" || product == "vp") && calType == 'checkOut'){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate() + 1));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in]', parent).val() == 'mm/dd/yyyy' && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}
	else if(product == "air" && calType == "checkOut"){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate()));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in]', parent).val() == 'mm/dd/yyyy' && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}
	else if(product == "air" && calType == 'checkOut1'){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate() + 1));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in1]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}
	else if(product == "air" && calType == 'checkOut2'){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate() + 1));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in2]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}
	else if(product == "air" && calType == 'checkOut3'){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate() + 1));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in3]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}
	else if(product == "air" && calType == 'checkOut4'){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate() + 1));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in4]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}
	else if(product == "air" && calType == 'checkOut5'){
		minDate = new Date(minDate.getFullYear(), minDate.getMonth(), (minDate.getDate() + 1));
		if(minDate.getMonth() != drawDate.getMonth() && drawDate.getMonth() == rs_today.getMonth() && drawDate.getFullYear() == rs_today.getFullYear() && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in5]', parent).val() == 'mm/dd/yyyy')
			drawDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
	}

	var buttonsHMTL = '';
	if(! (drawDate.getFullYear() == rs_maxDate.getFullYear() && drawDate.getMonth() == rs_maxDate.getMonth()))
		buttonsHMTL += "<span class='calendarNext' onclick='rs_drawNext(" + drawDate.getMonth() + ", " + drawDate.getFullYear() + ", \"" + product + "\", \"" + calType + "\", \"" + subParent + "\", \"" + parent + "\"); return false;'></span>";
	if(! (drawDate.getFullYear() == minDate.getFullYear() && drawDate.getMonth() == minDate.getMonth()) && (drawDate.getFullYear() == rs_maxDate.getFullYear() && drawDate.getMonth() == rs_maxDate.getMonth()))
		buttonsHMTL += "<span class='calendarPrev' style='margin-right:21px' onclick='rs_drawPrev(" + drawDate.getMonth() + ", " + drawDate.getFullYear() + ", \"" + product + "\", \"" + calType + "\", \"" + subParent + "\", \"" + parent + "\"); return false;'></span>";
	else if(! (drawDate.getFullYear() == minDate.getFullYear() && drawDate.getMonth() == minDate.getMonth())){
		if(! ((calType == 'checkOut') && (drawDate.getFullYear() == minDate.getFullYear()) && (drawDate.getMonth()-1 == minDate.getMonth()) && (rs_getDaysInMonth(minDate.getMonth(), minDate.getFullYear()) == minDate.getDate())))
			buttonsHMTL += "<span class='calendarPrev' onclick='rs_drawPrev(" + drawDate.getMonth() + ", " + drawDate.getFullYear() + ", \"" + product + "\", \"" + calType + "\", \"" + subParent + "\", \"" + parent + "\"); return false;'></span>";
	}
	
	if(skipSelect == false){
		if(calType == "checkIn"){
			if(((product == "hotel" || product == "vp" || product == "air") && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in]', parent).val() == 'mm/dd/yyyy') || (product == "car" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_pu_date]', parent).val() == 'mm/dd/yyyy')){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
			}
		}
		else if(calType == "checkIn1"){
			if(product == "air" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in1]', parent).val() == 'mm/dd/yyyy'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));	
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
			}
		}
		else if(calType == "checkIn2"){
			if(product == "air" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in2]', parent).val() == 'mm/dd/yyyy'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));	
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
			}
		}
		else if(calType == "checkIn3"){
			if(product == "air" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in3]', parent).val() == 'mm/dd/yyyy'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));	
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
			}
		}
		else if(calType == "checkIn4"){
			if(product == "air" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in4]', parent).val() == 'mm/dd/yyyy'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));	
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
			}
		}
		else if(calType == "checkIn5"){
			if(product == "air" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_in5]', parent).val() == 'mm/dd/yyyy'){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));	
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
			}
		}
		else{
			if(((product == "hotel" || product == "vp" || product == "air") && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_chk_out]', parent).val() == 'mm/dd/yyyy') || (product == "car" && $('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' input[name=rs_do_date]', parent).val() == 'mm/dd/yyyy')){
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, true));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, true));
			}
			else{
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarMonth', parent).html(rs_printMonths(minDate, drawDate, rs_maxDate, false));
				$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarDay', parent).html(rs_printDays(drawDate, minDate, rs_maxDate, false));
				if(product == "car"){
					$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendarTime', parent).val("10:00");
				}
			}
		}
	}

	drawDate = new Date(drawDate.getFullYear(), drawDate.getMonth() - 1, 1);

	for(var counter=0; counter<rs_numCalendars; counter++){
		drawDate = new Date(drawDate.getFullYear(), drawDate.getMonth() + 1, 1);

		html += "<table ";

		html += "cellspacing=0 cellpadding=0><tr class='topRow'><td colspan=7>";
		//if(counter == 0)
		//    html += "<select onchange='rs_updateCalendar($(this).val(), \"" + product + "\", \"" + calType + "\", false, \"" + subParent + "\", \"" + parent + "\");'>" + rs_printMonths(minDate, drawDate, rs_maxDate, false) + "</select>";
		//if(counter != 0)
			html += "<span class='calendarTitle'>" + rs_fullMonthNames[drawDate.getMonth()] + " " + drawDate.getFullYear() + "</span>";
		if(counter == (rs_numCalendars-1)){
			html += "<span class='calendarButtons'>";
			html += buttonsHMTL;
			html += "</span>";
		}
		html += "</td></tr><tr class='weekRow'><th>sun</th><th>mon</th><th>tue</th><th>wed</th><th>thu</th><th>fri</th><th>sat</th></tr><tr>";

		daysLeftInWeek = 7;
		weeksToPrint = 6;

		html += rs_printBlanks(new Date(drawDate.getFullYear(), drawDate.getMonth(), 1).getDay());
		daysLeftInWeek -= new Date(drawDate.getFullYear(), drawDate.getMonth(), 1).getDay();

		for(var i=1; i<=rs_getDaysInMonth(drawDate.getMonth(), drawDate.getFullYear()); i++){
			var printingDate = new Date(drawDate.getFullYear(), drawDate.getMonth(), i);
			var clickAdd = 'onclick="rs_setDate(' + drawDate.getFullYear() + ', ' + drawDate.getMonth() + ', ' + i + ', \'' + product + '\', \'' + calType + '\', \'' + subParent + '\', \'' + parent + '\'); return false;"';
			if(otherDate){
				if(printingDate.toDateString() == date.toDateString() && date.toDateString() != otherDate.toDateString())
					html += '<td class="dateSquare currDate" ' + clickAdd + '><span>' + i + '</span></td>';
				else if(printingDate.toDateString() == otherDate.toDateString() && date.toDateString() != otherDate.toDateString()){
					if(calType == 'checkOut' && product != 'car' && product != 'air')
						html += '<td class="dateSquare otherDate"><span>' + i + '</span></td>';
					else
						html += '<td class="dateSquare otherDate" ' + clickAdd + '><span>' + i + '</span></td>';
				}
				else if((printingDate < minDate) || (printingDate > rs_maxDate2 && calType == "checkIn") || (printingDate > rs_maxDate2 && calType == "checkIn1") || (printingDate > rs_maxDate2 && calType == "checkIn2") || (printingDate > rs_maxDate2 && calType == "checkIn3") || (printingDate > rs_maxDate2 && calType == "checkIn4") || (printingDate > rs_maxDate2 && calType == "checkIn5") || (printingDate > rs_maxDate && calType == "checkOut") || (printingDate > rs_maxDate && calType == "checkOut1") || (printingDate > rs_maxDate && calType == "checkOut2") || (printingDate > rs_maxDate && calType == "checkOut3") || (printingDate > rs_maxDate && calType == "checkOut4") || (printingDate > rs_maxDate && calType == "checkOut5"))
					html += '<td class="dateSquare disabledDate"><span>' + i + '</span></td>';
				else if((printingDate > date && printingDate < otherDate) || (printingDate < date && printingDate > otherDate))
					html += '<td class="dateSquare betweenDate" ' + clickAdd + '><span>' + i + '</span></td>';
				else
					html += '<td class="dateSquare" ' + clickAdd + '><span>' + i + '</span></td>';
			}else{
				if(printingDate.toDateString() == date.toDateString() && date.toDateString())
					html += '<td class="dateSquare currDate" ' + clickAdd + '><span>' + i + '</span></td>';
				else if((printingDate < minDate) || (printingDate > rs_maxDate2 && calType == "checkIn") || (printingDate > rs_maxDate2 && calType == "checkIn1") || (printingDate > rs_maxDate2 && calType == "checkIn2") || (printingDate > rs_maxDate2 && calType == "checkIn3") || (printingDate > rs_maxDate2 && calType == "checkIn4") || (printingDate > rs_maxDate2 && calType == "checkIn5") || (printingDate > rs_maxDate && calType == "checkOut") || (printingDate > rs_maxDate && calType == "checkOut1") || (printingDate > rs_maxDate && calType == "checkOut2") || (printingDate > rs_maxDate && calType == "checkOut3") || (printingDate > rs_maxDate && calType == "checkOut4") || (printingDate > rs_maxDate && calType == "checkOut5"))
					html += '<td class="dateSquare disabledDate"><span>' + i + '</span></td>';
				else
					html += '<td class="dateSquare" ' + clickAdd + '><span>' + i + '</span></td>';
			}
			daysLeftInWeek--;
			if(daysLeftInWeek == 0){
				html = html + '</tr><tr>';
				daysLeftInWeek = 7;
				weeksToPrint--;
			}
		}

		if(daysLeftInWeek != 7){
			html += rs_printBlanks(daysLeftInWeek) + '</tr>';
			weeksToPrint--;
		}

		for(var i=weeksToPrint; i>0; i--)
			html += '<tr>' + rs_printBlanks(7) + '</tr>';

		html += '</table>';
	}

	$('.rs_multiSearchBoxForm_' + product + ' ' + subParent + ' .rs_multiSearchBoxCalendarContainer_' + calType + ' .rs_multiSearchBoxCalendar', parent).html(html + '<div class="closeSquare"><span class="closeText" onclick="$(\'.rs_multiSearchBoxCalendar\').hide();">Close Calendar</span></div></div>');
}

function rs_updateCalendar(drawVal, product, calType, skipSelect, subParent, parent){
	var chk_in = rs_getCheckIn(product, subParent, parent);
	var chk_out = rs_getCheckOut(product, subParent, parent);
	if(calType == 'checkIn')
		rs_drawCalendar(new Date(drawVal.split('-')[1],drawVal.split('-')[0],1), chk_in, chk_out, chk_in, product, calType, true, subParent, parent);
	else if(calType == 'checkOut')
		rs_drawCalendar(new Date(drawVal.split('-')[1],drawVal.split('-')[0],1), rs_today, chk_in, chk_out, product, calType, true, subParent, parent);
}

function rs_printBlanks(count){
	var result = "";
	for(var i=1; i<=count; i++)
		result += "<td class='dateSquare blank'>&nbsp;</td>";
	return result;
}

$(document).ready(function(){
	$('.rs_multiSearchBoxCalendarShow').click(function(){  $('.rs_multiSearchBoxCalendar').hide(); $('.rs_multiSearchBoxForm_' + rs_currentProduct + ' ' + rs_getCalParent($(this)) + ' .rs_multiSearchBoxCalendarContainer_' + rs_getCalType($(this)) + ' .rs_multiSearchBoxCalendar', rs_getParent($(this))).show().bgiframe(); });
	$('.rs_multiSearchBoxCalendar .closeSquare').click(function(){ $('.rs_multiSearchBoxCalendar').hide(); });        
});

// ------------------ VP FUNCTIONS ------------------ //

function rs_checkRooms(parent){
   var adults = parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_adults]', parent).val(), 10),
       children = parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_children]', parent).val(), 10),
       rooms = parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_rooms]', parent).val(), 10),
       max_guests = 4;

	if(Math.ceil((adults + children) / max_guests) > rooms)
		return(Math.ceil((adults + children) / max_guests));
	else
		return 0;

//    if(((parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_adults]', parent).val(), 10) + parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_children]', parent).val(), 10))/parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_rooms]', parent).val(), 10)) > 4)
//        return(Math.ceil((parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_adults]', parent).val(), 10) + parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_children]', parent).val(), 10))/parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_rooms]', parent).val(), 10)/4));
//    else
//        return 0;
}

function rs_fillPassengers(parent){
	var passengersString = $('.rs_multiSearchBoxForm_vp select[name=rs_adults]', parent).val();
	var infantsCounter = 1;
	var lapsCounter = 0;
	var passengersCounter = parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_adults]', parent).val(), 10);

	for(var i=1; i<=parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_children]', parent).val(),10); i++){
		passengersString += "^" + $('.rs_multiSearchBoxForm_vp .rs_child_' + i + '_age', parent).val();
		if($('.rs_multiSearchBoxForm_vp .rs_child_' + i + '_age', parent).val() == '0'){
			passengersString += "-" + $('.rs_multiSearchBoxForm_vp input[name=rs_infant_' + infantsCounter + '_seating]:checked', parent).val();
			if($('.rs_multiSearchBoxForm_vp input[name=rs_infant_' + infantsCounter + '_seating]:checked', parent).val() == 'lap')
				lapsCounter++;
			else
				passengersCounter++;
			infantsCounter++; 
		}
		else
			passengersCounter++;
	}

	$('.rs_multiSearchBoxForm_vp input[name=rs_passengers]', parent).val(passengersString);

	if(lapsCounter > parseInt($('.rs_multiSearchBoxForm_vp select[name=rs_adults]', parent).val(), 10)){
		alert("Sorry, due to airline regulations, at most one lap infant is permitted per adult traveller.");
		return false;
	}

	if(passengersCounter > 8){
		alert("Sorry, at most 8 passengers can travel for a vacation package.");
		return false;
	}

	return true;
}

function rs_updateChildren(parent){
	if($('.rs_multiSearchBoxForm_vp select[name=rs_children]', parent).val() != '0'){
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer .rs_multiSearchBoxChildrensAges', parent).html('<span>Children&lsquo;s Ages:</span>');
		for(var i=1; i<=parseInt( $('.rs_multiSearchBoxForm_vp select[name=rs_children]', parent).val(), 10 ); i ++){
			if(i == 5){
				$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer .rs_multiSearchBoxChildrensAges', parent).append("<div class='clear' style='margin-top: 5px'></div>");
				$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer .rs_multiSearchBoxChildrensAges', parent).append("<select onchange='rs_updateInfants(\"" + parent + "\");' class='rs_child_" + i + "_age' onclick='$(this).css(\"color\", \"#464646\");'><option value='17' selected=SELECTED>17</option><option value='16'>16</option><option value='15'>15</option><option value='14'>14</option><option value='13'>13</option><option value='12'>12</option><option value='11'>11</option><option value='10'>10</option><option value='9'>9</option><option value='8'>8</option><option value='7'>7</option><option value='6'>6</option><option value='5'>5</option><option value='4'>4</option><option value='3'>3</option><option value='2'>2</option><option value='0'>&lt;2</option></select>");
			}
			else
				$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer .rs_multiSearchBoxChildrensAges').append("<select onchange='rs_updateInfants(\"" + parent + "\");' class='rs_child_" + i + "_age' onclick='$(this).css(\"color\", \"#464646\");'><option value='17' selected=SELECTED>17</option><option value='16'>16</option><option value='15'>15</option><option value='14'>14</option><option value='13'>13</option><option value='12'>12</option><option value='11'>11</option><option value='10'>10</option><option value='9'>9</option><option value='8'>8</option><option value='7'>7</option><option value='6'>6</option><option value='5'>5</option><option value='4'>4</option><option value='3'>3</option><option value='2'>2</option><option value='0'>&lt;2</option></select>");
		}
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer', parent).show();
		$('.rs_lq_searchbox .fields.alt').css('vertical-align', 'baseline').css('vertical-align', 'bottom');
		rs_updateInfants(parent);
	}
	else{
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer', parent).hide();
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer .rs_multiSearchBoxChildrensAges', parent).html('');
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer', parent).hide();
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer .rs_multiSearchBoxInfantsAges', parent).html('');
	}
}

function rs_updateInfants(parent){
	$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer .rs_multiSearchBoxInfantsAges', parent).html('');
	
	var counter = 1;
	$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxChildrensAgesContainer .rs_multiSearchBoxChildrensAges select', parent).each(function(){
		if(parseInt($(this).val(),10) == 0){
			$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer .rs_multiSearchBoxInfantsAges', parent).append("<div class='subTile' style='float: none; margin-bottom: 10px;'><span class='label' style='display: block; margin-top: 3px; font-weight: bold'>" + rs_getOrdinal(counter) + " Infant Seating:</span><input type='radio' style='float: left;' class='rs_infant_" + counter + "_seating_lap' name='rs_infant_" + counter + "_seating' id='rs_infant_" + counter + "_seating' value='lap' /><label style='padding-top: 3px; margin-bottom: 4px; font-weight: normal; font-size: 14px' for='rs_infant_" + counter + "_seating'>Lap infant</label><input type='radio' style='float: left;' class='rs_infant_" + counter + "_seating_seat' id='rs_infant_" + counter + "_seating_seat' name='rs_infant_" + counter + "_seating' value='seat' checked=CHECKED /><label style='padding-top: 3px; margin-bottom: 4px; font-weight: normal; font-size: 14px' for='rs_infant_" + counter + "_seating_seat'>Purchase Seat</label><div style='clear: both;'></div></div>");
			counter ++;
		}
	});

	if($('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer .rs_multiSearchBoxInfantsAges', parent).html() != '')
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer', parent).show();
	else
		$('.rs_multiSearchBoxForm_vp .rs_multiSearchBoxInfantsAgesContainer', parent).hide();
}

function rs_getOrdinal(n){
   var s = ["th","st","nd","rd"],
	   v = n % 100;
   return(n + (s[(v-20)%10]||s[v]||s[0]));
}

// ------------------ FILTER FUNCTIONS ------------------ //

function updateStar(){
	var stars = new Array();
	$(".filter_star input:checkbox", rs_getParent(".filter_star")).each(function(){
		if($(this).attr("checked")){
			stars.push($(this).val());
		}
	});
	var temp = '';
	for(var i = 0; i < stars.length; i++){
		temp += stars[i] + ',';
	}
	temp = temp.substr(0, temp.length-1);
	$(".filter_star input[name=rs_stars]", rs_getParent(".filter_star")).val(temp);
	// if(stars[0] != ""){
		// $(".filter_star input[name=rs_lowStar]", rs_getParent(".filter_star")).val(stars[0]);
	// }
	// if(stars[stars.length-1] != ""){
		// $(".filter_star input[name=rs_highStar]", rs_getParent(".filter_star")).val(stars[stars.length-1]);
	// }
	// if(stars.length == 0){
		// $(".filter_star input[name=rs_lowStar]", rs_getParent(".filter_star")).val("1");
		// $(".filter_star input[name=rs_highStar]", rs_getParent(".filter_star")).val("5");
	// }
	
}


function updateAmenities(){
	var amenitiesList = "";

	$(".filter_amenities input:checkbox", rs_getParent(".filter_amenities")).each(function() {
		if($(this).attr("checked")){
			amenitiesList += ($(this).attr("id")).replace("amenity_", "") + ", ";
		}
	});

	if(amenitiesList != ""){
		$(".filter_amenities input[name=rs_facil]", rs_getParent(".filter_amenities")).val(amenitiesList.substring(0, amenitiesList.length - 2));
	}
	if(amenitiesList == ""){
		$(".filter_amenities input[name=rs_facil]", rs_getParent(".filter_amenities")).val("");
	}
}

function updateDiscounts(company){
	var result = "";
	
	if(company == 'AD'){
		result += '<div class="car_option">';
			result += '<span class="label">Corporate Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	if ( company == 'AL' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate ID:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Coupon Code:</span>';
			result += '<input name="rs_coupon_number" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate/Product Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'AV' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Worldwide Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Coupon Number:</span>';
			result += '<input name="rs_coupon_number" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'BU' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">CorpRate Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Coupon Code:</span>';
			result += '<input name="rs_coupon_number" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate Plan:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'ZR' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Promotion Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'ET' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate/Association Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Coupon Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'HZ' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate Discount/AAA:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Promotional Coupon:</span>';
			result += '<input name="rs_coupon_number" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'NA' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate/Contracted Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Coupon Code:</span>';
			result += '<input name="rs_coupon_number" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate Code:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	else if ( company == 'SX' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
	}
	else if ( company == 'ZT' )
	{
		result += '<div class="car_option">';
			result += '<span class="label">Corporate Discount:</span>';
			result += '<input name="rs_corp_discount" value="" />';
		result += '</div>';
		result += '<div class="car_option">';
			result += '<span class="label">Rate Code/PC#:</span>';
			result += '<input name="rs_rate_code" value="" />';
		result += '</div>';
	}
	
	$('.discountsAJAX', rs_getParent(".discountsAJAX")).html(result);
}