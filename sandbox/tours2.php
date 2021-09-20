<?php 
 header('Content-type: text/html; charset=utf-8'); 
?>
<?php
$link = mysql_connect('localhost', 'root', '');
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
$tourselect = "SELECT * FROM vapproducts WHERE city='$city' ORDER by Rank ASC LIMIT 0,10";
$tourquery = mysql_query($tourselect) or die (mysql_error());
$tourInfo = mysql_fetch_assoc($tourquery);
?>
<!DOCTYPE html>
<html>

<head>
<meta content="en-us" http-equiv="Content-Language" />
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title><?php echo $tourInfo['Cityname']; ?> Discount Hotels, Motels, Inns, Resorts - <?php echo $tourInfo['Cityname']; ?>, <?php echo $tourInfo['Country']; ?></title>
<meta name="keywords" content="<?php echo $tourInfo['Cityname']; ?>,<?php echo $tourInfo['Cityname']; ?> hotels,discount motels,inns,<?php echo $tourInfo['Country']; ?>,<?php echo $tourInfo['Cityname']; ?> resorts,hotels,motels,inns,<?php echo $tourInfo['Region']; ?>,resorts"/>
<meta name="description" content="Looking for the best prices on Hotels, Motels, & Resorts in <?php echo $tourInfo['Cityname']; ?>, <?php echo $tourInfo['Region']; ?>. Find the best deals on Hotels, Motels, Inns, & Resorts in <?php echo $tourInfo['Cityname']; ?>, <?php echo $tourInfo['Region']; ?> <?php echo $tourInfo['Country']; ?>."/>
<meta content="INDEX,FOLLOW" name="ROBOTS"/>
<meta content="15 days" name="revisit-after"/>
<meta name="rating" content="General"/>
<link rel="icon" type="image/png"  href="../images/favicon.png">
<link rel="canonical" href="http://www.hotelbully.com/hotels-motels-resorts-inns/city-discount-hotels.php?city=<?php echo $tourInfo['city']; ?>&cityid=<?php echo $tourInfo['cityid']; ?>&country=<?php echo $tourInfo['country']; ?>"/>
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
			<a href="http://www.hotelbully.com" title="Hotel Bully">
			<img alt="HotelBully.com" height="49" src="../images/logo.png" width="240"></a></div>
		<div class="navmenu">
		<nav id="topNav">
			<ul>
				<li><a href="http://go.farebully.com/air/home/?refid=6084" title="Cheap Flights">FLIGHTS</a></li>
				<li><a href="http://www.hotelbully.com" title="Discount Hotels">HOTELS</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Book Flights & Hotels">FLIGHTS+HOTELS</a></li>
				<li><a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Cars">RENTAL CARS</a></li>
				<li><a href="http://www.tourbully.com" target="_blank" title="Tour Services">TOURS</a></li>
				<li><a href="http://www.limobully.com" target="_blank" title="Limo Services">LIMOS</a></li>
				<li><a href="http://www.cruisedirect.com" target="_blank" title="Cruise Deals">CRUISES</a></li>
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
				
					<a href="http://www.hotelbully.com/" title="Hotel Travel Search Engine">
				
					<img alt="Discount Travel Search - Search Now" height="329" src="../images/discount-search-box.png" width="260"></a></div>
				
				<div id="topcities">
				
				<div id="topcitiesimage">
					<img alt="Search for Top Cities" height="17" src="../images/booking.png" width="17"></div>
				<div id="topcitiestitle"><p>TOP HOTEL CITY DISCOUNTS</p></div>
				
				</div>
				
				<div id="topcitieslinks">
					<ul>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=tokyo&amp;cityid=3000040035&amp;country=japan" title="Hotels in Tokyo, Japan">Hotels in Tokyo, Japan</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=jakarta&amp;cityid=3000040026&amp;country=indonesia" title="Hotels in Jakarta, Indonesia">Hotels in Jakarta, Indonesia</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=seoul&amp;cityid=3000040019&amp;country=republic-of-korea" title="Hotels in Seoul, South Korea">Hotels in Seoul, South Korea</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=new-delhi&amp;cityid=3000040029&amp;country=india" title="Hotels in Delhi, India">Hotels in Delhi, India</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=shanghai&amp;cityid=3000040015&amp;country=china" title="Hotels in Shanghai, China">Hotels in Shanghai, China</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=manila&amp;cityid=3000040031&amp;country=philippines" title="Hotels in Manila, Philippines">Hotels in Manila, Philippines</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=karachi&amp;cityid=5000467289&amp;country=pakistan" title="Hotels in Karachi, Pakistan">Hotels in Karachi, Pakistan</a></li>
					<li><a href="../all-things-to-do/us-city-discount-hotels.php?city=new-york-city&amp;cityid=3000016152&amp;country=united-States" title="Hotels in New York, USA">Hotels in New York City</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=sao-paulo&amp;cityid=5000457645&amp;country=brazil" title="Hotels in Sao Paulo, Brazil">Hotels in Sao Paulo, Brazil</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=mexico-city&amp;cityid=3000060262&amp;country=mexico" title="Hotels in Mexico City, Mexico">Hotels in Mexico City, Mexico</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=cairo&amp;cityid=3000080002&amp;country=egypt" title="Hotels in Cairo, Egypt">Hotels in Cairo, Egypt</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=beijing&amp;cityid=3000040013&amp;country=china" title="Hotels in Beijing, China">Hotels in Beijing, China</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=osaka&amp;cityid=3000040036&amp;country=japan" title="Hotels in Osaka, Japan">Hotels in Osaka, Japan</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=mumbai&amp;cityid=3000040030&amp;country=india" title="Hotels in Mumbai (Bombay), India">Hotels in Mumbai, India</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=guangzhou&amp;cityid=3000040014&amp;country=china" title="Hotels in Guangzhou, China">Hotels in Guangzhou, China</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=moscow&amp;cityid=5000406639&amp;country=russia" title="Hotels in Moscow, Russia">Hotels in Moscow, Russia</a></li>
					<li><a href="../all-things-to-do/us-city-discount-hotels.php?city=los-angeles&amp;cityid=3000001947&amp;country=united-states" title="Hotels in Los Angeles, USA">Hotels in Los Angeles, USA</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=calcutta&amp;cityid=5000467571&amp;country=india" title="Hotels in Calcutta, India">Hotels in Calcutta, India</a></li>
					<li><a href="../all-things-to-do/us-city-discount-hotels.php?city=san-francisco&amp;cityid=3000002244&amp;country=united-states" title="Hotels in San Francisco, California">Hotels in San Francisco, CA</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=buenos-aires&amp;cityid=5000450066&amp;country=argentina" title="Hotels in Buenos Aires, Argentina">Hotels in Buenos Aires, AR</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=istanbul&amp;cityid=3000040045&amp;country=turkey" title="Hotels in Istanbul, Turkey">Hotels in Istanbul, Turkey</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=rio-de-janeiro&amp;cityid=5000457862&amp;country=brazil" title="Hotels in Rio de Janeiro, Brazil">Hotels in Rio de Janeiro, BR</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=shenzhen&amp;cityid=5000494495&amp;country=china" title="Hotels in Shenzhen, China">Hotels in Shenzhen, China</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=lagos&amp;cityid=5000489319&amp;country=nigeria" title="Hotels in Lagos, Nigeria">Hotels in Lagos, Nigeria</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=paris&amp;cityid=3000035827&amp;country=france" title="Hotels in Paris, France">Hotels in Paris, France</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=nagoya&amp;cityid=5000479669&amp;country=japan" title="Hotels in Nagoya, Japan">Hotels in Nagoya, Japan</a></li>
					<li><a href="../all-things-to-do/city-discount-hotels.php?city=lima&amp;cityid=3000070004&amp;country=peru" title="Hotels in Lima, Peru">Hotels in Lima, Peru</a></li>
					<li><a href="../all-things-to-do/us-city-discount-hotels.php?city=chicago&amp;cityid=3000005381&amp;country=united-states" title="Hotels in Chicago, USA">Hotels in Chicago, USA</a></li>
					</ul>
					<p>
					<a href="../international-hotel-directory.html" title="International Hotel Guide">View More 
					HOTEL Destinations</a></p>						
				</div>
				
				<div id="services">
				
				<div id="servicesimage">
					<img alt="More Great Deals from Fare Bully" height="16" src="../images/deals.png" width="17"></div>
				<div id="servicestitle"><p>DISCOUNT TRAVEL SERVICES</p></div>
				
				</div>
				
				<div id="serviceslinks">
					<ul>
					<li><a href="http://www.farebully.com" target="_blank" rel="nofollow" title="Cheap Airline Tickets">Cheap Airline Tickets</a></li>
					<li><a href="http://www.hostelbully.com" target="_blank" rel="nofollow" title="Book Cheap Hostels">Book Cheap Hostels</a></li>
					<li><a href="http://www.limobully.com" target="_blank" rel="nofollow" title="Reserve Limo Services">Reserve Limo Services</a></li>
					<li><a href="http://www.eutrak.com" target="_blank" rel="nofollow" title="Order European Rail Passes">Order European Rail Passes</a></li>
					<li><a href="http://www.coursereservations.com" rel="nofollow" title="Golf Course Reservations">Golf Course Reservations</a></li>
					<li><a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Car Reservations">Rental Car Reservations</a></li>
					<li><a href="http://www.airportparkingreservations.com" target="_blank" rel="nofollow" title="Airport Parking Reservations">Airport Parking Reservations</a></li>
					<li><a href="http://www.tourbully.com" target="_blank" rel="nofollow" title="Discount Sightseeing Tours">Discount Sightseeing Tours</a></li>
					</ul>					
				</div>

				
				<div id="bookbyphone">
				
					<img alt="Book Hotels &amp; Rental Cars by Phone" height="144" src="../images/book-hotels-car-rentals-by-phone-260x144.png" width="260"></div>
				
				</div>
				
				<div id="maincontent">	
					<div id="hotelheader">				
					<h1><?php echo $tourInfo['Cityname'];?> Guided Tours, Activities, &amp; Things to Do</h1>
					</div>
					
					<div id="hotelresults">
						<p>Total Number of Hotels in <?php echo $tourInfo['Cityname'];?>, <?php echo $tourInfo['Region'];?></p>
					</div>
					
				
				<?php
				
					$i = 1;
					
					do { $i++;
						$product = $tourInfo['ProductName'];
						$overview = (substr($tourInfo ['Introduction'],0,175));
						$city = $tourInfo["Cityname"];
						$region = $tourInfo['Region'];
						$country = $tourInfo['Country'];
						$image = $tourInfo['ProductImageThumb'];
						$duration = $tourInfo['Duration'];
						$price = $tourInfo['PriceUSD'];

					
				echo "<div id=\"tourlistings\">\n"; 
				echo "<div id=\"tourdescription\">\n"; 
				echo "<div id=\"tourtitle\">\n"; 
				echo "<h2>$product</h2>\n"; 
				echo "</div>\n"; 
				echo "<div id=\"toursubinfo\">\n"; 
				echo "<div id=\"hotelimages\">\n"; 
				echo "<img alt=\"\" src=\"$image\" width=\"75\" height=\"75\">\n"; 
				echo "</div>\n"; 
				echo "<div id=\"hotellistingsinfo\">\n"; 
				echo "<div id=\"hotellistingsaddress\">\n"; 
				echo "<div id=\"starrating_4\">\n"; 
				echo "<p><strong>Duration:</strong> $duration &nbsp;&nbsp;<strong>Location: </strong> $city, $region</p>\n"; 
				echo "</div>\n"; 
				echo "<div id=\"hoteldescription\">\n"; 
				echo "<p>$overview...</p>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "</div>						\n"; 
				echo "</div>\n"; 
				echo "<div id=\"tourratessubmit\">\n"; 
				echo "<div id=\"hotelinfosale\">\n"; 
				echo "<div>Starting From...</div>\n"; 
				echo "<div id=\"hotelcheckrate\">\n"; 
				echo "<p>$$price</p>\n"; 
				echo "</div>\n"; 
				echo "<input type=\"submit\" name=\"booknow\" class=\"booknow\" value=\"Show Prices\" />\n"; 
				echo "</div>	\n"; 
				echo "</div>\n"; 
				echo "</div>\n";
				}
				
				while ($tourInfo = mysql_fetch_assoc($tourquery)); {
					
				}

				
				 ?>
				
				 

				<div id="viewmoreresults">
				<p>
				<a href="http://go.farebully.com/city/?refid=6084&amp;rs_cid=<?php echo "$cid"; ?>" title="<?php echo "$city"; ?> Hotels">View More Hotels in <?php echo "$city"; ?>, <?php echo "$statecode"; ?> <?php echo "$country"; ?> - CLICK HERE</a></p>
				</div>
				
				<div id="moretravelheader">
				<h2>Discount Tours, Rental Cars &amp; Limo Services in <?php echo "$city"; ?></h2>
				</div>
				
				<div id="hotellistings">
				
				<div id="hotelimages">
					<img alt="Discount Rental Car Services in <?php echo "$city"; ?>" height="90" src="../images/rental-cars-services-100x100.jpg" width="90">
				</div>
				
				<div id="hotellistingsinfo">
				<h2>Discount Rental Cars Services in <?php echo "$city"; ?></h2>
				
				<div id="hoteldescription">
				<p>Compare prices from Ace, Avis, Budget, Dollar, Economy, Hertz and Thrifty. Save up to 40%. Find car rental deals 
				in <?php echo "$city"; ?>, <?php echo "$statecode"; ?> <?php echo "$country"; ?>!  Make reservations in advance by booking now &amp; enjoy the freedom of driving in <?php echo $tourInfo['Cityname'];?> at your own pace. Book with us &amp; Save Up to 40% 
				on rental cars in <?php echo "$city"; ?>, <?php echo "$country"; ?>.</p>
				</div>
									
				

									
				</div>
				<div id="hotelinfosale">
					<div id="hotelcheckrate"><p>Discount Rental Cars As Low As $10 a Day: Save Now!</p></div>
					<a href="http://go.farebully.com/car_rentals/home/?refid=6084" target="_blank" title="<?php echo "$city"; ?> Rental Car Services"><input type="submit" name="booknow" class="booknow" value="Book Now" /><a/>				
					
					
				</div>
				
				</div>
				
				<div id="hotellistings">
				
				<div id="hotelimages">
					<img alt="<?php "$city"; ?> Tours, Activities, &amp; Transfers" height="90" src="../images/tours-sightseeing-100x100.jpg" width="90">
				</div>
				
				<div id="hotellistingsinfo">
				<h2><?php echo "$city";?> City Tours, Activities, &amp; Transfers</h2>
				
				<div id="hoteldescription">
				<p>Find and book city tours, helicopter tours, day trips, show tickets, sightseeing day tours, popular activities and things to do in <?php echo "$city"; ?>, <?php echo "$statecode"; ?> <?php echo "$country"; ?> at discount prices!</p>
				</div>
									
				

									
				</div>
				<div id="hotelinfosale">
					<div id="hotelcheckrate"><p>Make Reservations Today and Save on Tours and More!</p></div>
					<a href="http://www.partner.viator.com/en/2451/search/<?php echo "$country";?> Tours" target="_blank" title="<?php echo "$city"; ?> Tours"><input type="submit" name="booknow" class="booknow" value="Book Now" /><a/>				
					
					
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
			<li><a href="http://go.farebully.com/help/contact/" title="Customer Support">Customer Support</a></li>
			<li><a href="http://go.farebully.com/help/review/" title="Review or Cancel Reservations">Review/Cancel Reservation</a></li>
			<li><a href="http://go.farebully.com/help/faq/" title="Frequently Asked Questions">Get the FAQ's</a></li>
			<li><a href="http://go.farebully.com/help/privacy/" title="Privacy Policy">Privacy Policy</a></li>
			<li><a href="http://go.farebully.com/help/terms/" title="Terms &amp; Conditions">Terms &amp; Conditions</a></li>
			<li><a href="../international-hotel-directory.html" title="Hotel Guide">Hotel Guide</a></li>

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
				<li><a href="http://www.hotelbully.com" title="Hotel Bully Home Page">Home</a></li>
				<li><a href="http://www.farebully.com" title="Cheap Flights">Flights</a></li>
				<li><a href="http://www.hotelbully.com" title="Discount Hotels">Hotels</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Vacation Packages">Flights+Hotels</a></li>
				<li><a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Cars">Cars</a></li>
				<li><a href="http://www.hostelbully.com/" target="_blank" title="Book Hostels" rel="nofollow">Hostels</a></li>
				<li><a href="http://www.limobully.com/" target="_blank" title="Limo Services" rel="nofollow">Limos</a></li>
				<li><a href="http://www.cruisedirect.com" target="_blank" title="Cruise Deals" rel="nofollow">Cruises</a></li>
				<li><a href="http://www.airportparkingreservations.com" target="_blank" title="Airport Parking Reservations" rel="nofollow">Airport Parking</a></li>
				<li><a href="http://www.tourbully.com/" target="_blank" title="Sightseeing Tours" rel="nofollow">Tours</a></li>
				<li><a href="http://www.eutrak.com/" target="_blank" title="Rail Passes" rel="nofollow">Rail Passes</a></li>
				<li><a href="http://www.coursereservations.com/" target="_blank" title="Golf Course Reservations" rel="nofollow">Golf Courses</a></li>
				<li><a href="../contact.html" title="Contact Us">Contact Us</a></li>



			</ul>
		</div>
				
	</div>

	
	</div>
	
	<div id="footerbottom">
	<div class="wrapfooter2">
		<p>Copyright © 2014 HotelBully.com Version 1.1 - <span class="spanyel">
		<a title="Site Map XML" href="../sitemap.xml">SITEMAP XML</a></span></p>
		
		
	</div>

	
	</div>




</body>

</html>
