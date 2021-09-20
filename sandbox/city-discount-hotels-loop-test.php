<?php
$link = mysql_connect('localhost', 'root', '');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make cities the current db
$db_selected = mysql_select_db('hotelbully', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (isset($_GET['city_name'], $_GET['cityid'], $_GET['country_name'])) {
$city_name = $_GET['city_name'];
$cityid = $_GET['cityid'];
$country_name = $_GET['country_name'];
} else {
	echo 'This page is not Currently in Our Directory: Please visit Our Home Page <a href="http://www.farebully.com">FareBully.com</a>';
	ini_set ('display_errors', FALSE);
}
$hotelselect = "SELECT city.state_name, city.country_name, city.city_name, city.cityid, city.hotel_count, city.longitude, city.latitude, hotel.property_description, hotel.state_code, hotel.cityid, hotel.hotelid_t, hotel.hotel_name, hotel.hotel_address_full, hotel.thumbnail, hotel.lowrate, hotel.star_rating, hotel.nearbyhotels FROM city JOIN hotel ON city.cityid = hotel.cityid WHERE city.city_name='$city_name' AND city.cityid='$cityid' AND hotel.country_name='$country_name' AND active='1' ORDER by overall_rating DESC LIMIT 0,7";
$hotelquery = mysql_query($hotelselect) or die (mysql_error());
$hotelInfo = mysql_fetch_assoc($hotelquery);
?>
<!DOCTYPE html>
<html>

<head>
<meta content="en-us" http-equiv="Content-Language" />
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title>International Airport Travel Directory of Resources &amp; Services</title>
<meta name="keywords" content="directory,airports,hotels,sightseeing tours,rental cars"/>
<meta name="description" content="Are you looking for information about airports and travel services that are provided near and around major airports? Find information about flights to and from Airports world wide."/>
<meta content="INDEX,FOLLOW" name="ROBOTS"/>
<meta content="15 days" name="revisit-after"/>
<meta name="rating" content="General"/>
<link rel="icon" type="image/png"  href="../images/favicon.png">
<link rel="canonical" href="http://www.farebully.com/international-airport-directory.html"/>
<link rel="stylesheet" type="text/css" href="../css/pages/content.css" media="screen" />
<script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <script>
      function initialize() {
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
          center: new google.maps.LatLng(<?php echo $hotelInfo['latitude'];?>, <?php echo $hotelInfo['longitude'];?>),
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
			<a href="http://www.farebully.com">
			<img alt="FareBully.com" height="49" src="../images/logo.png" width="240"></a></div>
		<div class="navmenu">
		<nav id="topNav">
			<ul>
				<li><a href="http://go.farebully.com/air/home/?refid=6084" title="Cheap Flights">FLIGHTS</a></li>
				<li><a href="http://go.farebully.com/home/?refid=6084" title="Discount Hotels">HOTELS</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Book Flights & Hotels">FLIGHTS+HOTELS</a></li>
				<li><a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Cars">RENTAL CARS</a></li>
				<li><a href="http://www.tourbully.com" target="_blank" title="Limo Services">TOURS</a></li>
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
				
					<a href="http://www.farebully.com/">
				
					<img alt="Discount Travel Search - Search Now" height="329" src="../images/discount-search-box.png" width="260"></a></div>
				
				<div id="topcities">
				
				<div id="topcitiesimage">
					<img alt="Search for Top Cities" height="17" src="../images/booking.png" width="17"></div>
				<div id="topcitiestitle"><p>TOP CITIES TO FLY TO &amp; FROM</p></div>
				
				</div>
				
				<div id="topcitieslinks">
					<ul>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Tokyo&amp;cityid=3000040035&amp;country_name=Japan" title="Hotels in Tokyo, Japan">Hotels in Tokyo, Japan</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Jakarta&amp;cityid=3000040026&amp;country_name=Indonesia" title="Hotels in Jakarta, Indonesia">Hotels in Jakarta, Indonesia</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Seoul&amp;cityid=3000040019&amp;country_name=Republic%20Of%20Korea" title="Hotels in Seoul, South Korea">Hotels in Seoul, South Korea</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=New%20Delhi&amp;cityid=3000040029&amp;country_name=India" title="Hotels in Delhi, India">Hotels in Delhi, India</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Shanghai&amp;cityid=3000040015&amp;country_name=China" title="Hotels in Shanghai, China">Hotels in Shanghai, China</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Manila&amp;cityid=3000040031&amp;country_name=Philippines" title="Hotels in Manila, Philippines">Hotels in Manila, Philippines</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Karachi&amp;cityid=5000467289&amp;country_name=Pakistan" title="Hotels in Karachi, Pakistan">Hotels in Karachi, Pakistan</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=New%20York%20City&amp;cityid=3000016152&amp;country_name=United%20States" title="Hotels in New York, USA">Hotels in New York City</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Sao%20Paulo&amp;cityid=5000457645&amp;country_name=Brazil" title="Hotels in Sao Paulo, Brazil">Hotels in Sao Paulo, Brazil</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Mexico%20City&amp;cityid=3000060262&amp;country_name=Mexico" title="Hotels in Mexico City, Mexico">Hotels in Mexico City, Mexico</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Cairo&amp;cityid=3000080002&amp;country_name=Egypt" title="Hotels in Cairo, Egypt">Hotels in Cairo, Egypt</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Beijing&amp;cityid=3000040013&amp;country_name=China" title="Hotels in Beijing, China">Hotels in Beijing, China</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Osaka&amp;cityid=3000040036&amp;country_name=Japan" title="Hotels in Osaka, Japan">Hotels in Osaka, Japan</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Mumbai&amp;cityid=3000040030&amp;country_name=India" title="Hotels in Mumbai (Bombay), India">Hotels in Mumbai, India</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Guangzhou&amp;cityid=3000040014&amp;country_name=China" title="Hotels in Guangzhou, China">Hotels in Guangzhou, China</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Moscow&amp;cityid=5000406639&amp;country_name=Russia" title="Hotels in Moscow, Russia">Hotels in Moscow, Russia</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Los%20Angeles&amp;cityid=3000001947&amp;country_name=United%20States" title="Hotels in Los Angeles, USA">Hotels in Los Angeles, USA</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Calcutta&amp;cityid=5000467571&amp;country_name=India" title="Hotels in Calcutta, India">Hotels in Calcutta, India</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Dhaka&amp;cityid=5000041709&amp;country_name=Bangladesh" title="Hotels in Dhaka, Bangladesh">Hotels in Dhaka, Bangladesh</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Buenos%20Aires&amp;cityid=5000450066&amp;country_name=Argentina" title="Hotels in Buenos Aires, Argentina">Hotels in Buenos Aires, AR</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Istanbul&amp;cityid=3000040045&amp;country_name=Turkey" title="Hotels in Istanbul, Turkey">Hotels in Istanbul, Turkey</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Rio%20De%20Janeiro&amp;cityid=5000457862&amp;country_name=Brazil" title="Hotels in Rio de Janeiro, Brazil">Hotels in Rio de Janeiro, BR</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Shenzhen&amp;cityid=5000494495&amp;country_name=China" title="Hotels in Shenzhen, China">Hotels in Shenzhen, China</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Lagos&amp;cityid=5000489319&amp;country_name=Nigeria" title="Hotels in Lagos, Nigeria">Hotels in Lagos, Nigeria</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Paris&amp;cityid=3000035827&amp;country_name=France" title="Hotels in Paris, France">Hotels in Paris, France</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Nagoya&amp;cityid=5000479669&amp;country_name=Japan" title="Hotels in Nagoya, Japan">Hotels in Nagoya, Japan</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Lima&amp;cityid=3000070004&amp;country_name=Peru" title="Hotels in Lima, Peru">Hotels in Lima, Peru</a></li>
					<li>
					<a href="http://localhost/hotelbully/hotels-motels-resorts-inns/city-discount-hotels.php?city_name=Chicago&amp;cityid=3000005381&amp;country_name=United%20States" title="Hotels in Chicago, USA">Hotels in Chicago, USA</a></li>
					</ul>
					<p>
					<a href="../../international-hotel-directory.html" title="International Airport Directory">View More 
					HOTEL Destinations</a></p>						
				</div>
				
				<div id="services">
				
				<div id="servicesimage">
					<img alt="More Great Deals from Fare Bully" height="16" src="../images/deals.png" width="17"></div>
				<div id="servicestitle"><p>MORE SERVICES WE PROVIDE..</p></div>
				
				</div>
				
				<div id="serviceslinks">
					<ul>
					<li><a href="http://go.farebully.com/home/?refid=6084">Book Discount Hotels</a></li>
					<li><a href="http://www.hostelbully.com" target="_blank" rel="nofollow">Book Cheap Hostels</a></li>
					<li><a href="http://www.limobully.com" target="_blank" rel="nofollow">Reserve Limo Services</a></li>
					<li><a href="http://www.eutrak.com" target="_blank" rel="nofollow">Order European Rail Passes</a></li>
					<li><a href="http://www.coursereservations.com" rel="nofollow">Golf Course Reservations</a></li>
					<li>
					<a href="http://go.farebully.com/car_rentals/home/?refid=6084">Rental Car Reservations</a></li>
					<li><a href="http://www.airportparkingreservations.com" target="_blank">Airport Parking Reservations</a></li>
					<li><a href="http://www.tourbully.com" target="_blank" rel="nofollow">Discount Sightseeing Tours</a></li>
					</ul>					
				</div>

				
				<div id="bookbyphone">
				
					<img alt="Book Hotels &amp; Rental Cars by Phone" height="144" src="../images/book-hotels-car-rentals-by-phone-260x144.png" width="260"></div>
				
				</div>
				
				<div id="maincontent">	
					<div id="hotelheader">				
					<h1><?php echo $hotelInfo['city_name'];?> - Discount Hotels, Motels Inns &amp; Resorts</h1>
					</div>
				<div id="leftsideparagraph">
						<p>Are you looking for discount flights to or from 
						Los Angeles United States. Try out our cheap flights search engine to find some the best prices for flights to 
						Los Angeles.<br/><br/>
						Whether your visiting family or on a business trip flying with the right airline at the right price is always important when your are flying to an overseas destination.<br/><br/>
						You can rest assured that FareBully.com has the best prices on flights to or from 
						Los Angeles, United States online. 
						Thank you for choosing FareBully.com and we hope that you 
						enjoy your flight.</p>
					</div>
					
					<div id="hotelcitymap">
						<div id="map_canvas" style="width:275px;height:200px;"></div>
					</div>
					
					<div id="hotelresults">
						<p>Total Number of Hotels in <?php echo $hotelInfo['city_name'];?>, <?php echo $hotelInfo['state_code'];?> <?php echo $hotelInfo['country_name'];?>: <?php echo $hotelInfo['hotel_count'];?></p>
					</div>

				
				<?php 	
					while ($hotelInfo = mysql_fetch_assoc($hotelquery)): {
					$hotel = $hotelInfo['hotel_name'];
					$address = $hotelInfo['hotel_address_full'];
					$propertydescription = (substr($hotelInfo ['property_description'],0,245));
					$city = $hotelInfo["city_name"];
					$statecode = $hotelInfo['state_code'];
					$country = $hotelInfo['country_name'];
					$image = $hotelInfo['thumbnail'];
					$star = $hotelInfo['star_rating'];
					$hid = $hotelInfo['hotelid_t'];
					}
				echo "<div id=\"hotellistings\">";
				
				echo "<div id=\"hotelimages\">";
				echo "<img alt=\"\" src=\"$image\" width=\"90\" height=\"90\">";
				echo "</div>";
				
				echo "<div id=\"hotellistingsinfo\">";
				echo "<h2>$hotel</h2>";
				echo "<div id=\"hotellistingsaddress\">";
				echo "<div id=\"starrating_4\">";
				echo "<img alt=\"\" src=\"../images/starrating_$star.png\"><p>&nbsp; - $address, $city, $statecode $country</p>";
				echo "</div>";
				echo "<div id=\"hoteldescription\">";
				echo "<p>$propertydescription</p>";
				echo "</div>";
									
				echo "</div>";

									
				echo "</div>";
				echo "<div id=\"hotelinfosale\">";
				echo	"<div id=\"hotelcheckrate\"><p>Check the Current Hotel Rate by Clicking Below</p></div>";
				echo	"<a href=\"http://go.farebully.com/hotel/?refid=6084&rs_hid=$hid\"><input type=\"submit\" name=\"booknow\" class=\"booknow\" value=\"View Prices\" /><a/>";
					
					
					
				echo "</div>";
				
				echo "</div>";

				endwhile; ?>
				
				 

				<div id="viewmoreresults">
				<p>View More Hotels in <?php echo "$city"; ?> - CLICK HERE</p>
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
				<a href="http://www.bullytravel.com/" target="_blank">VISIT OUR BLOG</a></div>
			</div>
			
			
		</div>
		
		<div id="quicklinkbox">
			<div id="socialinvite">
			<h2>FOLLOW US!</h2>		
				<img alt="Follow Us on Facebook &amp; Twitter" height="35" src="../images/social-links-header-bg.png" width="206">
			<ul>
			<li>
			<a href="http://www.facebook.com/pages/Bully-Travel/1416130925293766" target="_blank" rel="nofollow">
			<img alt="FaceBook" height="32" src="../images/facebook.png" width="32" class="auto-style2"></a></li>
			<li><a href="https://twitter.com/bullytravel" target="_blank" rel="nofollow">
			<img alt="Twitter" height="32" src="../images/twitter_2.png" width="32" class="auto-style2"></a></li>
			<li>
			<a href="http://www.youtube.com/channel/UCRhBHCbC3xTz0E_pJe6dDUQ" target="_blank" rel="nofollow">
			<img alt="YouTube" height="32" src="../images/youtube_1.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://www.plurk.com/bullytravel" target="_blank" rel="nofollow">
				<img alt="Plurk Social" height="32" src="../images/plurk.png" width="32"></a></li>
			</ul>
			<ul>
				<li>
				<a href="http://www.stumbleupon.com/stumbler/bullytravel" target="_blank" rel="nofollow">
				<img alt="Stumble Upon" height="32" src="../images/stumbleupon_1.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://bullytravel.yelp.com/" target="_blank" rel="nofollow">
				<img alt="Yelp" height="32" src="../images/yelp.png" width="32" class="auto-style2"></a></li>
				<li>
				<a href="http://www.flickr.com/photos/bullytravel/" target="_blank" rel="nofollow">
				<img alt="Flicker" height="32" src="../images/flickr_2.png" width="32" class="auto-style2"></a></li>
				<li>
				<a href="http://www.pinterest.com/bullytravel/" target="_blank" rel="nofollow">
				<img alt="Pinterest" height="32" src="../images/pinterest_2.png" width="32" class="auto-style2"></a></li>
			</ul>
			<ul>
				<li>
				<a href="http://plus.google.com/b/103249185798274921413/103249185798274921413/posts" target="_blank" rel="nofollow">
				<img alt="Google Plus" height="32" src="../images/google+_1.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://instagram.com/bullytravel/" target="_blank" rel="nofollow">
				<img alt="Instagram" height="32" src="../images/instagram.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://bullytravel.blogspot.com/" target="_blank" rel="nofollow">
				<img alt="Blogger" height="32" src="../images/blogger.png" width="32" class="auto-style2"></a></li>
				<li><a href="http://bullytravel.tumblr.com/" target="_blank" rel="nofollow">
				<img alt="Tumblr" class="auto-style2" height="32" src="../images/tumblr.png" width="32"></a></li>
			</ul>

			</div>
		
		</div>		
		
		
		<div id="quicklinkbox">
			<div id="quicklinks">
			<h2>QUICK LINKS</h2>
				<img alt="Quick Links to Customer Support" height="35" src="../images/quick-links-header-bg.png" width="206">
			<ul>
			<li>
			<a href="../contact.html" title="Contact Us">Contact Us</a></li>
			<li>
			<a href="http://go.farebully.com/help/contact/" title="Customer Support">Customer Support</a></li>
			<li>
			<a href="http://go.farebully.com/help/review/" title="Review or Cancel Reservations">Review/Cancel Reservation</a></li>
			<li>
			<a href="http://go.farebully.com/help/faq/" title="Frequently Asked Questions">Get the FAQ's</a></li>
			<li>
			<a href="http://go.farebully.com/help/privacy/" title="Privacy Policy">Privacy Policy</a></li>
			<li>
			<a href="http://go.farebully.com/help/terms/" title="Terms &amp; Conditions">Terms &amp; Conditions</a></li>
			<li><a href="../international-hotel-directory.html">Hotel Directory</a></li>

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
				<li><a href="http://www.farebully.com/" title="Fare Bully Home Page">Home</a></li>
				<li><a href="http://www.farebully.com" title="Cheap Flights">Flights</a></li>
				<li><a href="http://go.farebully.com/home/?refid=6084" title="Discount Hotels">Hotels</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Vacation Packages">Flights+Hotels</a></li>
				<li>
				<a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Cars">Cars</a></li>
				<li>
				<a href="http://www.hostelbully.com/" target="_blank" title="Book Hostels" rel="nofollow">Hostels</a></li>
				<li>
				<a href="http://www.limobully.com/" target="_blank" title="Limo Services" rel="nofollow">Limos</a></li>
				<li>
				<a href="http://www.cruisedirect.com" target="_blank" title="Cruise Deals" rel="nofollow">Cruises</a></li>
				<li>
				<a href="http://www.airportparkingreservations.com" target="_blank" title="Airport Parking Reservations" rel="nofollow">Airport Parking</a></li>
				<li>
				<a href="http://www.tourbully.com/" target="_blank" title="Sightseeing Tours" rel="nofollow">Tours</a></li>
				<li>
				<a href="http://www.eutrak.com/" target="_blank" title="Rail Passes" rel="nofollow">Rail Passes</a></li>
				<li>
				<a href="http://www.coursereservations.com/" target="_blank" title="Golf Course Reservations" rel="nofollow">Golf Courses</a></li>
				<li>
				<a href="../contact.html" title="Contact Us">Contact Us</a></li>



			</ul>
		</div>
				
	</div>

	
	</div>
	
	<div id="footerbottom">
	<div class="wrapfooter2">
		<p>Copyright © 2014 FareBully.com Version 1.1 - <span class="spanyel">
		<a title="Site Map XML" href="../sitemap.xml">SITEMAP XML</a></span></p>
		
		
	</div>

	
	</div>




</body>

</html>
