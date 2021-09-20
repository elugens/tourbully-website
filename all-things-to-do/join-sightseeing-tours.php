<?php 
 header('Content-type: text/html; charset=utf-8'); 
?>
<?php
$link = mysql_connect('localhost', 'tourbull_elugens', 'Goodday69');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make cities the current db
$db_selected = mysql_select_db('tourbull_tours', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (isset($_GET['city'])) {
$city = $_GET['city'];

} else {

}
mysql_query("SET NAMES 'utf8'");
$tourselect = "SELECT vapproducts.Rank, vapproducts.ProductName, vapproducts.product, vapproducts.ProductTextNoDivs, vapproducts.Duration, vapproducts.ProductImageThumb, vapproducts.Country, vapproducts.Region, vapproducts.Cityname, vapproducts.city, vapproducts.Group1, vapproducts.ProductURL, vapproducts.PriceUSD, cities.cityid, cities.stateurl, cities.countryurl, cities.carurl, cities.hotelurl, cities.cityurl FROM vapproducts LEFT JOIN cities ON cities.city_name = vapproducts.Cityname WHERE vapproducts.city='$city' LIMIT 0, 10";
$tourquery = mysql_query($tourselect) or die (mysql_error());
$tourInfo = mysql_fetch_assoc($tourquery);
?>
<!DOCTYPE html>
<html>

<head>
<meta content="en-us" http-equiv="Content-Language" />
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title><?php echo $tourInfo['Cityname']; ?> Guided Tours, Attractions, &amp; Things to Do - <?php echo $tourInfo['Cityname']; ?>, <?php echo $tourInfo['Region']; ?></title>
<meta name="keywords" content="<?php echo $tourInfo['Cityname']; ?>,<?php echo $tourInfo['Cityname']; ?> guided tours,sightseeing,activities,attractions,things to do,<?php echo $tourInfo['Country']; ?>,<?php echo $tourInfo['Region']; ?>,cruises"/>
<meta name="description" content="Looking for the best prices on Guided Tours, Attractions, & Things to Do in <?php echo $tourInfo['Cityname']; ?>, <?php echo $tourInfo['Region']; ?>. Find the best deals on Guided Tours, Attractions, & Things to Do in <?php echo $tourInfo['Cityname']; ?>, <?php echo $tourInfo['Region']; ?> <?php echo $tourInfo['Country']; ?>."/>
<meta content="INDEX,FOLLOW" name="ROBOTS"/>
<meta content="15 days" name="revisit-after"/>
<meta name="rating" content="General"/>
<link rel="icon" type="image/png"  href="../images/favicon.png">
<link rel="canonical" href="http://www.tourbully.com/all-things-to-do/sightseeing-tours.php?city=<?php echo $tourInfo['city']; ?>"/>
<link rel="stylesheet" type="text/css" href="../css/pages/content.css" media="screen" />
<script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <script>
      function initialize() {
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
          center: new google.maps.LatLng(<?php echo $tourInfo['latitude'];?>, <?php echo $tourInfo['longitude'];?>),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(map_canvas, map_options)
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    </script>
    
    <!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u=(("https:" == document.location.protocol) ? "https" : "http") + "://www.bullybrands.com/analytics/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 3]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript';
    g.defer=true; g.async=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<noscript><p><img src="http://www.bullybrands.com/analytics/piwik.php?idsite=3" style="border:0;" alt="" /></p></noscript>
<!-- End Piwik Code -->

    
</head>
<body>
<div id="wrapper">
	
	<div id="headertop">
		<div id="bookbyphoneheader">
			<img alt="Book Hotels &amp; Rental Cars by Phone" height="11" src="../images/mapphonesmall.png" width="8">&nbsp;
		Book Hotels &amp; Rental Cars by Phone:  <span class="spanyel">1-877-477-8594</span> mention promo code: <span class="spanyel">
			HBC6084</span>
		</div>
		</div>
	
	<div id="header">
	<div id="subtop">
	<div class="wrapsubtop">
		<div class="logo">
			<a href="http://www.tourbully.com" title="Tour Bully Home Page">
			<img alt="TourBully.com" height="49" src="../images/logo.png" width="243"></a></div>
		<div class="navmenu">
		<nav id="topNav">
			<ul>
				<li><a href="../partners/flight-deals.html" title="Cheap Flights">FLIGHTS</a></li>
				<li><a href="../partners/hotel-deals.html" title="Discount Hotels">HOTELS</a></li>
				<li><a href="../partners/flight-hotel-combo-deal.html" title="Book Flights & Hotels">FLIGHTS+HOTELS</a></li>
				<li><a href="../partners/rental-car-deals.html" title="Rental Cars">RENTAL CARS</a></li>
				<li><a href="http://www.tourbully.com" title="Tour Reservations">TOURS</a></li>
				<li><a href="../partners/limos-reservations.html" title="Limo Services">LIMOS</a></li>
				<li><a href="../partners/cruise-deals.html" title="Cruise Deals">Cruises</a></li>
			</ul>
		</nav>
		</div>
		<div id="quoteengine"></div>
		<div class="clear"></div>
	</div>
</div>

	</div>
	
	<div id="contentheaderwrap">
	
	
	<div class="clear"></div>
		<div id="content">
			<div id="contentwrapper">
			
				<div id="leftsidebar">
				
				<div id="searchbox">
				
				<div id="viatorsearch">
				<!-- Begin Viator Partner Widget -->


    

<style type="text/css">
    @import url('../images/niftycorners.css');
    @import url('../images/pas.css');
    .ViatorFindTTD .pas .module_header { background-color: #004c85; }
    .ViatorFindTTD .pas h3 { color: #FFFFFF; font-family: 'Arial'; font-weight: normal; }
    .ViatorFindTTD .pas .module_body { background-color: #004c85; color: #FFFFFF; font-family: 'Arial'; font-weight: Normal; }
    .ViatorFindTTD .pas .btn { background-color: #ffba01; }
    .ViatorFindTTD .pas .btn button { color: #004c85; }
    .ViatorFindTTD { width: 200px; }
</style>



<script type="text/javascript" src="https://www.partner.viator.com/js/console.js?v=4.3.1.8-20131218"></script>
<script type="text/javascript" src="https://www.partner.viator.com/modules/widgets/js/initWidget.js?v=4.3.1.8-20131218"></script>
<script type="text/javascript" src="https://www.partner.viator.com/modules/widgets/js/pasWidget.js?v=4.3.1.8-20131218"></script>

<div id="viatorWidgetDivParams_a27e03d7" style="display: none">
    <div id="viatorWidgetDiv_a27e03d7_action">https://www.partner.viator.com/widgets/pas.jspa</div>
    <div id="viatorWidgetDiv_a27e03d7_serverHost">https://www.partner.viator.com</div>
    <div id="viatorWidgetDiv_a27e03d7_widgetID">a27e03d7</div>
    <div id="viatorWidgetDiv_a27e03d7_setLocale">en</div>
    <div id="viatorWidgetDiv_a27e03d7_PUID">2451</div>
    <div id="viatorWidgetDiv_a27e03d7_title">Find things to do</div>
    <div id="viatorWidgetDiv_a27e03d7_destinationID">0</div>
    <div id="viatorWidgetDiv_a27e03d7_width">200</div>
    <div id="viatorWidgetDiv_a27e03d7_btnColour">004c85</div>
    <div id="viatorWidgetDiv_a27e03d7_btnBGColour">ffba01</div>
    <div id="viatorWidgetDiv_a27e03d7_SUBPUID"></div>
    
</div>
<div id="viatorWidgetDiv_a27e03d7" style="display: none">
</div>

<script type="text/javascript">
    initViatorWidgetDiv('a27e03d7', 'viatorWidgetDivParams_a27e03d7');
</script>
<!-- End Viator Partner Widget -->
				
				</div>
				
				</div>
				
				<div id="topcities">
				
				<div id="topcitiesimage">
					<img alt="Search for Top Cities" height="17" src="../images/booking.png" width="17"></div>
				<div id="topcitiestitle"><p>TOP SIGHTSEEING TOUR CITIES</p></div>
				
				</div>
				
				<div id="topcitieslinks">
					<ul>
					<li>
					<a href="sightseeing-tours.php?city=new-york-city" title="New York City">New York City Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=paris" title="Paris">Paris Sightseeing Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=london" title="London">London Tour Services</a></li>
					<li>
					<a href="sightseeing-tours.php?city=melbourne" title="Melbourne">Melbourne Sightseeing</a></li>
					<li>
					<a href="sightseeing-tours.php?city=madrid" title="Madrid">Madrid Sightseeing Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=san-francisco" title="San Francisco">San Francisco Tours</a></li>
					<li>
					<a href="join-sightseeing-tours.php?city=washington-dc" title="Washington DC">Washington DC Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=orlando" title="Orlando">Orlando Tour Services</a></li>
					<li>
					<a href="join-sightseeing-tours.php?city=hawaii" title="Hawaii">Hawaii Sightseeing Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=venice" title="Venice">Venice Tour Services</a></li>
					<li>
					<a href="sightseeing-tours.php?city=las-vegas" title="Las Vegas">Las Vegas Tour Services</a></li>
					<li><a href="sightseeing-tours.php?city=rome" title="Rome">Rome Sightseeing Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=sydney" title="Sydney">Sydney Tour Services</a></li>
					<li>
					<a href="sightseeing-tours.php?city=tokyo" title="Tokyo">Tokyo Sightseeing Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=milan" title="Milan">Milan Tour Services</a></li>
					<li>
					<a href="sightseeing-tours.php?city=miami" title="Miami">Miami Sightseeing Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=chicago" title="Chicago">Chicago Tour Services</a></li>
					<li>
					<a href="sightseeing-tours.php?city=cairns" title="Cairns">Cairns Sightseeing</a></li>
					<li>
					<a href="sightseeing-tours.php?city=los-angeles" title="Los Angeles">Los Angeles Tours</a></li>
					<li>
					<a href="sightseeing-tours.php?city=amsterdam" title="Amsterdam">Amsterdam Tour Services</a></li>
					</ul>
					<p>
					<a href="../international-sightseeing-tour-guide.html" title="International Tour Guide">
					View More Sightseeing Tours</a></p>						
				</div>
				
				<div id="services">
				
				<div id="servicesimage">
					<img alt="More Great Deals from Tour Bully" height="16" src="../images/deals.png" width="17"></div>
				<div id="servicestitle"><p>DISCOUNT TRAVEL SERVICES</p></div>
				
				</div>
				
				<div id="serviceslinks">
					<ul>
					<li>
					<a href="../partners/flight-deals.html" title="Cheap Airline Tickets">Cheap Airline Tickets</a></li>
					<li>
					<a href="../partners/discount-hostels.html" title="Book Cheap Hostels">Book Cheap Hostels</a></li>
					<li>
					<a href="../partners/limos-reservations.html" title="Reserve Limo Services">Reserve Limo Services</a></li>
					<li>
					<a href="../partners/rail-passes.html" title="Order European Rail Passes">Order European Rail Passes</a></li>
					<li>
					<a href="../partners/golf-course-reservations.html" title="Golf Course Reservations">Golf Course Reservations</a></li>
					<li>
					<a href="../partners/rental-car-deals.html" title="Rental Car Reservations">Rental Car Reservations</a></li>
					<li>
					<a href="../partners/airport-parking-reservations.html" title="Airport Parking Reservations">Airport Parking Reservations</a></li>
					<li><a href="http://www.tourbully.com" title="Discount Sightseeing Tours">Discount Sightseeing Tours</a></li>
					<li>
					<a href="../partners/hotel-deals.html" title="Discount Hotels">Book Discount Hotels</a></li>
					</ul>					
				</div>

				
				<div id="bookbyphone">
				
					<img alt="Book Hotels &amp; Rental Cars by Phone" height="144" src="../images/book-hotels-car-rentals-by-phone-260x144.png" width="260"></div>
				
				</div>
				
				<div id="maincontent">	
					<div id="hotelheader">				
					<h1><?php echo $tourInfo['Cityname'];?> Guided Tours, Attractions, &amp; Things to Do</h1>
					</div>
					
					<div id="hotelresults">
						<p>Sightseeing Tours &amp; Attractions in <?php echo $tourInfo['Cityname'];?>, <?php echo $tourInfo['Region'];?>, <?php echo $tourInfo['Country'];?></p>
					</div>
					
				
				<?php
				
					$i = 1;
					
					do { $i++;
						$product = $tourInfo['ProductName'];
						$overview = (substr($tourInfo ['ProductTextNoDivs'],0,125));
						$city = $tourInfo["Cityname"];
						$region = $tourInfo['Region'];
						$country = $tourInfo['Country'];
						$image = $tourInfo['ProductImageThumb'];
						$duration = $tourInfo['Duration'];
						$price = $tourInfo['PriceUSD'];
						$url = $tourInfo['ProductURL'];
						$carurl = $tourInfo['carurl'];
						$hotelurl = $tourInfo['hotelurl'];
						$cityid = $tourInfo['cityid'];
						$cityurl = $tourInfo['cityurl'];
						$countryurl = $tourInfo['countryurl'];
						

					
				echo "<div id=\"tourlistingsresults\">\n"; 
				echo "<div id=\"tourdescriptionresults\">\n"; 
				echo "<div id=\"tourtitleresults\">\n"; 
				echo "<h2>$product</h2>\n"; 
				echo "</div>\n"; 
				echo "<div id=\"toursubinforesults\">\n"; 
				echo "<div id=\"tourimagesresults\">\n"; 
				echo "<img alt=\"\" src=\"$image\" width=\"75\" height=\"75\">\n"; 
				echo "</div>\n"; 
				echo "<div id=\"tourlistingsinforesults\">\n"; 
				echo "<div id=\"tourlistingsaddressresults\">\n"; 
				echo "<div id=\"starrating_4results\">\n"; 
				echo "<p><strong>Duration:</strong> $duration &nbsp;&nbsp;<strong>Location: </strong> $city, $region, $country</p>\n"; 
				echo "</div>\n"; 
				echo "<div id=\"touroverviewresults\">\n"; 
				echo "<p>$overview...</p>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "<div id=\"tourratessubmitresults\">\n"; 
				echo "<div id=\"tourinfosaleresults\">\n"; 
				echo "<div>Starting From...</div>\n"; 
				echo "<div id=\"tourcheckrateresults\">\n"; 
				echo "<p><sup style=\"font-size: small;\">$</sup>$price</p>\n"; 
				echo "</div>\n"; 
				echo "<a href=\"$url\" title=\"$product\" target=\"_blank\"><input type=\"submit\" name=\"booknow\" class=\"booknow\" value=\"Reserve Now\" /></a>\n"; 
				echo "</div>	\n"; 
				echo "</div>\n";
				echo "</div>\n";
				}
				
				while ($tourInfo = mysql_fetch_assoc($tourquery)); {
					
				}

				
				 ?>
				
				 

				<div id="viewmoreresults">
				<p>
				<a href="http://www.tourbully.com" title="<?php echo "$city"; ?>">View All Tours in <?php echo "$city"; ?>, <?php echo "$region"; ?> <?php echo "$country"; ?> - CLICK HERE</a></p>
				</div>
				
				<div id="moretravelheader">
				<h2>Discount Hotels, Rental Cars &amp; Limo Services in <?php echo "$city"; ?></h2>
				</div>
				
				<div id="hotellistings">
				
				<div id="hotelimages">
					<img alt="Discount Rental Car Services in <?php echo "$city"; ?>" height="90" src="../images/rental-cars-services-100x100.jpg" width="90">
				</div>
				
				<div id="hotellistingsinfo">
				<h2>
				<a href="http://www.carrentalbully.com/rentals-cars/<?php echo "$carurl"; ?>.php?city=<?php echo "$cityurl"; ?>&amp;cityid=<?php echo "$cityid"; ?>&amp;country=<?php echo "$countryurl"; ?>" target="_blank">Discount Rental Cars Services in <?php echo "$city"; ?>
				</a></h2>
				
				<div id="hoteldescription">
				<p>Compare prices from Ace, Avis, Budget, Dollar, Economy, Hertz and Thrifty. Save up to 40%. Find car rental deals 
				in <?php echo "$city"; ?>, <?php echo "$region"; ?> <?php echo "$country"; ?>!  Make reservations in advance by booking now &amp; enjoy the freedom of driving in <?php echo $tourInfo['Cityname'];?> at your own pace. </p>
				</div>
									
				

									
				</div>
				<div id="hotelinfosale">
					<div id="hotelcheckrate"><p>Discount Rental Cars As Low As $10 a Day: Save Now!</p></div>
					<a href="http://www.carrentalbully.com/rentals-cars/<?php echo "$carurl"; ?>.php?city=<?php echo "$cityurl"; ?>&cityid=<?php echo "$cityid"; ?>&country=<?php echo "$countryurl"; ?>" target="_blank" title="<?php echo "$city"; ?> Rental Car Services"><input type="submit" name="booknow" class="booknow" value="Book Now" /><a/>				
					
					
				</div>
				
				</div>
				
				<div id="hotellistings">
				
				<div id="hotelimages">
					<img alt="Discount Hotels" height="90" src="../images/690702.jpg" width="90">
				</div>
				
				<div id="hotellistingsinfo">
				<h2>
				<a href="http://www.hotelbully.com/hotels-motels-resorts-inns/<?php echo "$hotelurl"; ?>.php?city=<?php echo "$cityurl"; ?>&amp;cityid=<?php echo "$cityid"; ?>&amp;country=<?php echo "$countryurl"; ?>" target="_blank">Discount Hotels in <?php echo "$city";?>
				</a></h2>
				
				<div id="hoteldescription">
				<p>Are you searching for the best prices on the top hotel properties in <?php echo "$city";?>. Find Discount Hotels in <?php echo "$city";?>, <?php echo "$region";?> <?php echo "$country";?> by visiting HotelBully.com</p>
				</div>
									
				

									
				</div>
				<div id="hotelinfosale">
					<div id="hotelcheckrate"><p>Book Your Hotel Today and Save 
						on Room Reservations!</p></div>
					<a href="http://www.hotelbully.com/hotels-motels-resorts-inns/<?php echo "$hotelurl"; ?>.php?city=<?php echo "$cityurl"; ?>&cityid=<?php echo "$cityid"; ?>&country=<?php echo "$countryurl"; ?>" target="_blank" title="<?php echo "$city"; ?> Tours"><input type="submit" name="booknow" class="booknow" value="Book Now" /><a/>				
					
					
				</div>
				
				</div>
				
				<div id="hotellistings">
				
				<div id="hotelimages">
					<img alt="<?php echo "$city"; ?> Limo &amp; Car Services" height="90" src="../images/limo-car-services-100x100.jpg" width="90">
				</div>
				
				<div id="hotellistingsinfo">
				<h2><?php echo "$city"; ?> Limo, Shuttle, &amp; Car Services...</h2>
				
				<div id="hoteldescription">
				<p>Find the Lowest Limousine Rates Guaranteed! From Luxury Limo Service to Executive Car Services. Limo Bully has the Best Limo Prices and Discounts for Limousine Service in <?php echo "$city"; ?>, <?php echo "$country"; ?>.</p>
				</div>
									
				

									
				</div>
				<div id="hotelinfosale">
					<div id="hotelcheckrate"><p>Save on Limos, Shuttles &amp; Cars Services Today!</p></div>
					<a href="http://www.limobully.com" target="_blank" rel="nofollow" title="Limo Services in <?php echo "$city"; ?>"><input type="submit" name="booknow" class="booknow" value="Book Now" /><a/>				
					
					
				</div>
				
				</div>




				
											
			</div>
		<div class="clear"></div>
		</div>
	
	</div>
	
	<div id="socialfooter">
	
	<div id="quicklinkinfo">
	
		<div id="quicklinkbox">
			<div id="travelblog">
			<h2>TRAVEL BLOG</h2>	
			<img alt="Visit our Travel Blog" height="35" src="../images/travel-blog-header-bg.png" width="206">
			<p>Join us at the bully travel blog for updated information about world destinations and more.  Get travel coupons, travel info and tips at the Bully travel blog online.</p>
			<div class="travelbloglink">
				<a href="http://www.bullytravel.com/" target="_blank" title="Bully Travel Magazine">VISIT OUR BLOG</a></div>
			</div>
			
			
		</div>
		
		<div id="quicklinkbox">
			<div id="socialinvite">
			<h2>FOLLOW US!</h2>		
				<img alt="Follow Us on Facebook &amp; Twitter" height="35" src="../images/social-links-header-bg.png" width="206">
			<ul>
			<li><a href="http://www.facebook.com/pages/Bully-Travel/1416130925293766" target="_blank" rel="nofollow" title="Facebook Fanpage">
			<img alt="FaceBook" height="32" src="../images/facebook.png" width="32" class="auto-style2"></a></li>
			<li><a href="https://twitter.com/bullytravel" target="_blank" rel="nofollow" title="Twitter Follow">
			<img alt="Twitter" height="32" src="../images/twitter_2.png" width="32" class="auto-style2"></a></li>
			<li><a href="http://www.youtube.com/channel/UCRhBHCbC3xTz0E_pJe6dDUQ" target="_blank" rel="nofollow" title="YouTube Videos">
			<img alt="YouTube" height="32" src="../images/youtube_1.png" width="32" class="auto-style2"></a></li>
			<li><a href="http://www.plurk.com/bullytravel" target="_blank" rel="nofollow" title="Plurk Social">
			<img alt="Plurk Social" height="32" src="../images/plurk.png" width="32"></a></li>
			</ul>
			<ul>
				<li>
				<a href="http://www.stumbleupon.com/stumbler/bullytravel" target="_blank" rel="nofollow" title="Stumble Upon">
				<img alt="Stumble Upon" height="32" src="../images/stumbleupon_1.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://bullytravel.yelp.com/" target="_blank" rel="nofollow" title="Yelp Listing">
				<img alt="Yelp" height="32" src="../images/yelp.png" width="32" class="auto-style2"></a></li>
				<li>
				<a href="http://www.flickr.com/photos/bullytravel/" target="_blank" rel="nofollow" title="Flickr Post">
				<img alt="Flicker" height="32" src="../images/flickr_2.png" width="32" class="auto-style2"></a></li>
				<li>
				<a href="http://www.pinterest.com/bullytravel/" target="_blank" rel="nofollow" title="Pinterest Pos">
				<img alt="Pinterest" height="32" src="../images/pinterest_2.png" width="32" class="auto-style2"></a></li>
			</ul>
			<ul>
				<li>
				<a href="http://plus.google.com/b/103249185798274921413/103249185798274921413/posts" target="_blank" rel="nofollow" title="Google Plus">
				<img alt="Google Plus" height="32" src="../images/google+_1.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://instagram.com/bullytravel/" target="_blank" rel="nofollow" title="Instagram Posts">
				<img alt="Instagram" height="32" src="../images/instagram.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://bullytravel.blogspot.com/" target="_blank" rel="nofollow" title="Blog Spot">
				<img alt="Blogger" height="32" src="../images/blogger.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://bullytravel.tumblr.com/" target="_blank" rel="nofollow" title="Tumblr Social">
				<img alt="Tumblr" class="auto-style2" height="32" src="../images/tumblr.png" width="32"></a></li>
			</ul>

			</div>
		
		</div>		
		
		
		<div id="quicklinkbox">
			<div id="quicklinks">
			<h2>QUICK LINKS</h2>
				<img alt="Quick Links to Customer Support" height="35" src="../images/quick-links-header-bg.png" width="206">
			<ul>
			<li><a href="../contact.html" title="Contact Us">Contact Us</a></li>
			<li><a href="http://www.partner.viator.com/en/2451/customer-care" title="Customer Support" rel="nofollow" target="_blank">Customer Support</a></li>
			<li><a href="http://www.partner.viator.com/en/2451/customer-care" title="Review or Cancel Reservations" rel="nofollow" target="_blank">Review/Cancel Reservation</a></li>
			<li><a href="http://www.partner.viator.com/en/2451/faq" title="Frequently Asked Questions" rel="nofollow" target="_blank">Get the FAQ's</a></li>
			<li><a href="http://www.partner.viator.com/en/2451/privacy-policy" title="Privacy Policy" rel="nofollow" target="_blank">Privacy Policy</a></li>
			<li>
			<a href="http://www.partner.viator.com/popups/terms.jspa#terms" rel="nofollow" target="_blank" title="Terms &amp; Conditions">Terms &amp; Conditions</a></li>
			<li>
			<a href="../international-sightseeing-tour-guide.html" title="Tourism Guide">Tourism Guide</a></li>
			</ul>
			</div>
			
			
		</div>
		
		<div id="quicklinkbox">
			<div id="travelsaver">
			<h2>TRAVEL SAVER</h2>	
				<img alt="Discount Traveller Savings Program" height="35" src="../images/travel-saver-header-bg.png" width="206">
			
			<form action="../process.php" method="post">Name: <input name="subscribersname" type="text" class="inputbox" value="your name"/><br/><br/>Email: <input name="subscribersemail" type="text" class="inputbox" value="your email"/><br/><br>
				<input class="subscriberbtn" type="submit" name="send" value="SIGN-UP" style="width: 83px; height: 32px"/></form>
			</div>
						
			
		</div>
			
		
		
	</div>

	
	
	</div>
	
	<div id="footer">
	  <div class="wrapfooter">
		<div class="links">
			<ul>
				<li><a href="http://www.tourbully.com" title="Tour Bully Home Page">Home</a></li>
				<li><a href="../partners/flight-deals.html" title="Cheap Flights">Flights</a></li>
				<li><a href="../partners/hotel-deals.html" title="Discount Hotels">Hotels</a></li>
				<li><a href="../partners/flight-hotel-combo-deal.html" title="Vacation Packages">Flights+Hotels</a></li>
				<li><a href="../partners/rental-car-deals.html" title="Rental Cars">Cars</a></li>
				<li><a href="../partners/discount-hostels.html" title="Book Hostels">Hostels</a></li>
				<li><a href="../partners/limos-reservations.html" title="Limo Services">Limos</a></li>
				<li><a href="../partners/cruise-deals.html" title="Cruise Deals">Cruises</a></li>
				<li><a href="../partners/airport-parking-reservations.html" title="Airport Parking Reservations">Airport Parking</a></li>
				<li><a href="http://www.tourbully.com/" title="Sightseeing Tours">Tours</a></li>
				<li><a href="../partners/rail-passes.html" title="Rail Passes">Rail Passes</a></li>
				<li><a href="../partners/golf-course-reservations.html" title="Golf Course Reservations">Golf Courses</a></li>
				<li><a href="../contact.html" title="Contact Us">Contact Us</a></li>
			</ul>
		</div>
				
	</div>

	
	</div>
	
	<div id="footerbottom">
	<div class="wrapfooter2">
		<p>Copyright © 2014 TourBully.com Version 1.1 - <span class="spanyel">
		<a title="Site Map XML" href="../sitemap.xml">SITEMAP XML</a></span></p>
		
		
	</div>

	
	</div>




</body>

</html>
