<?php 
 header('Content-type: text/html; charset=utf-8'); 
?>
<?php
$link = mysql_connect('localhost', 'carbully_elugens', 'Goodday69');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make cities the current db
$db_selected = mysql_select_db('carbully_carrentals', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (isset($_GET['city'], $_GET['cityid'], $_GET['country'])) {
$city = $_GET['city'];
$cityid = $_GET['cityid'];
$country = $_GET['country'];
} else {
	echo 'This page is not Currently in Our Directory: Please visit Our Home Page <a href="http://www.carrentalbully.com">CarRentalBully.com</a>';
	ini_set ('display_errors', FALSE);
}
mysql_query("SET NAMES 'utf8'");
$carselect = "SELECT city.state_name, city.state, city.country_name, city.country_code, city.state_code, city.country, city.city_name, city.city, city.cityid, city.longitude, city.latitude, types.id, types.description, types.max_passengers, types.transmission, types.vehicle_images, types.type_description FROM city, types WHERE city.city='$city' AND city.cityid='$cityid' AND city.country='$country'";
$carquery = mysql_query($carselect) or die (mysql_error());
$carInfo = mysql_fetch_assoc($carquery); 
?>
<!DOCTYPE html>
<html>

<head>
<meta content="en-us" http-equiv="Content-Language" />
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title><?php echo $carInfo['city_name']; ?> Rental Cars Reservations - Rent A Car <?php echo $carInfo['city_name']; ?>, <?php echo $carInfo['state_code']; ?> <?php echo $carInfo['country_name']; ?></title>
<meta name="keywords" content="<?php echo $carInfo['city_name']; ?>,<?php echo $carInfo['city_name']; ?> car rentals,car hire,,<?php echo $carInfo['country_name']; ?>,rent a car,rentacar,discounts,cheap,<?php echo $carInfo['state_name']; ?>,companies"/>
<meta name="description" content="Looking for the best prices on rental cars & car rental reservations in <?php echo $carInfo['city_name']; ?>, <?php echo $carInfo['state_code']; ?> <?php echo $carInfo['country_name']; ?>. Find the best deals on car rentals in <?php echo $carInfo['city_name']; ?>, <?php echo $carInfo['state_code']; ?> <?php echo $carInfo['country_name']; ?>."/>
<meta content="INDEX,FOLLOW" name="ROBOTS"/>
<meta content="15 days" name="revisit-after"/>
<meta name="rating" content="General"/>
<link rel="icon" type="image/png"  href="../images/favicon.png">
<link rel="canonical" href="http://www.carrentalbully.com/rentals-cars/city-car-reservations.php?city=<?php echo $carInfo['city']; ?>&cityid=<?php echo $carInfo['cityid']; ?>&country=<?php echo $carInfo['country']; ?>"/>
<link rel="stylesheet" type="text/css" href="../css/pages/content.css" media="screen" />
<script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <script>
      function initialize() {
        var map_canvas = document.getElementById('map_canvas');
        var map_options = {
          center: new google.maps.LatLng(<?php echo $carInfo['latitude'];?>, <?php echo $carInfo['longitude'];?>),
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
			<a href="http://www.carrentalbully.com" title="Car Rental Bully Home Page">
			<img alt="CarRentalBully.com" height="49" src="../images/logo.png" width="327"></a></div>
		<div class="navmenu">
		<nav id="topNav">
			<ul>
				<li><a href="http://go.farebully.com/air/home/?refid=6084" title="Cheap Flights" rel="nofollow">FLIGHTS</a></li>
				<li><a href="http://www.hotelbully.com" title="Discount Hotels" rel="nofollow">HOTELS</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Book Flights & Hotels" rel="nofollow">FLIGHTS+HOTELS</a></li>
				<li><a href="http://www.carrentalbully.com" title="Rental Cars">RENTAL CARS</a></li>
				<li><a href="http://www.tourbully.com" target="_blank" title="Tour Services" rel="nofollow">TOURS</a></li>
				<li><a href="http://www.limobully.com" target="_blank" title="Limo Services" rel="nofollow">LIMOS</a></li>
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
				
					<a href="http://www.carrentalbully.com/" title="Car Rental Search Engine">
				
					<img alt="Discount Travel Search - Search Now" height="329" src="../images/discount-search-box.png" width="260"></a></div>
				
				<div id="topcities">
				
				<div id="topcitiesimage">
					<img alt="Search for Top Cities" height="17" src="../images/booking.png" width="17"></div>
				<div id="topcitiestitle"><p>TOP CAR RENTAL CITIES</p></div>
				
				</div>
				
				<div id="topcitieslinks">
					<ul>
					<li><a href="tours.php?city=seoul&amp;cityid=3000040019&amp;country=republic-of-korea" title="Rent A Car Seoul, South Korea">Rent A Car Seoul, South Korea</a></li>
					<li><a href="tours.php?city=shanghai&amp;cityid=3000040015&amp;country=china" title="Car Rentals Shanghai, China">Car Rentals Shanghai, China</a></li>
					<li><a href="tours.php?city=manila&amp;cityid=3000040031&amp;country=philippines" title="Rent A Car Manila, Philippines">Rent A Car Manila, Philippines</a></li>
					<li><a href="../rentals-cars/us-city-rentals-cars.php?city=new-york-city&amp;cityid=3000016152&amp;country=united-States" title="Car Rentals New York, USA">Car Rentals New York City</a></li>
					<li><a href="tours.php?city=sao-paulo&amp;cityid=5000457645&amp;country=brazil" title="Car Rentals Sao Paulo, Brazil">Rent A Car Sao Paulo, Brazil</a></li>
					<li><a href="tours.php?city=mexico-city&amp;cityid=3000060262&amp;country=mexico" title="Rental Cars Mexico City, Mexico">Rental Cars Mexico City, Mexico</a></li>
					<li><a href="tours.php?city=cairo&amp;cityid=3000080002&amp;country=egypt" title="Car Rentals Cairo, Egypt">Car Rentals Cairo, Egypt</a></li>
					<li><a href="tours.php?city=moscow&amp;cityid=5000406639&amp;country=russia" title="Rental Cars Moscow, Russia">Rental Cars Moscow, Russia</a></li>
					<li><a href="../rentals-cars/us-city-rentals-cars.php?city=los-angeles&amp;cityid=3000001947&amp;country=united-states" title="Car Rentals Los Angeles, USA">Car Rentals Los Angeles, USA</a></li>
					<li><a href="tours.php?city=calcutta&amp;cityid=5000467571&amp;country=india" title="Rent A Car Calcutta, India">Rent A Car Calcutta, India</a></li>
					<li><a href="../rentals-cars/us-city-rentals-cars.php?city=san-francisco&amp;cityid=3000002244&amp;country=united-states" title="Rental Cars San Francisco, California">Rental Cars San Francisco, CA</a></li>
					<li><a href="tours.php?city=buenos-aires&amp;cityid=5000450066&amp;country=argentina" title="Car Rentals Buenos Aires, Argentina">Car Rentals Buenos Aires, AR</a></li>
					<li><a href="tours.php?city=istanbul&amp;cityid=3000040045&amp;country=turkey" title="Rent A Car Istanbul, Turkey">Rent A Car Istanbul, Turkey</a></li>
					<li><a href="tours.php?city=rio-de-janeiro&amp;cityid=5000457862&amp;country=brazil" title="Rental Cars Rio de Janeiro, Brazil">Rental Cars Rio de Janeiro, BR</a></li>
					<li><a href="tours.php?city=paris&amp;cityid=3000035827&amp;country=france" title="Rental Cars Paris, France">Rental Cars Paris, France</a></li>
					<li><a href="tours.php?city=lima&amp;cityid=3000070004&amp;country=peru" title="Rent A Car Lima, Peru">Rent A Car Lima, Peru</a></li>
					<li><a href="../rentals-cars/us-city-rentals-cars.php?city=atlanta&amp;cityid=3000003496&amp;country=united-states" title="Rent A Car Atlanta, Georgia">Car Rental Atlanta, Georgia</a></li>
					<li><a href="tours.php?city=rome&amp;cityid=3000035823&amp;country=italy" title="Car Rentals Rome, Italy">Rent A Car Rome, Italy</a></li>
					</ul>
					<p>
					<a href="../international-car-rentals-reservations.html" title="International Car Rentals">View More 
					Car Rental Cities</a></p>						
				</div>
				
				<div id="services">
				
				<div id="servicesimage">
					<img alt="More Great Deals from Car Rental Bully" height="16" src="../images/deals.png" width="17"></div>
				<div id="servicestitle"><p>DISCOUNT TRAVEL SERVICES</p></div>
				
				</div>
				
				<div id="serviceslinks">
					<ul>
					<li><a href="http://www.farebully.com" target="_blank" rel="nofollow" title="Cheap Airline Tickets">Cheap Airline Tickets</a></li>
					<li><a href="http://www.hostelbully.com" target="_blank" rel="nofollow" title="Book Cheap Hostels">Book Cheap Hostels</a></li>
					<li><a href="http://www.limobully.com" target="_blank" rel="nofollow" title="Reserve Limo Services">Reserve Limo Services</a></li>
					<li><a href="http://www.eutrak.com" target="_blank" rel="nofollow" title="Order European Rail Passes">Order European Rail Passes</a></li>
					<li><a href="http://www.coursereservations.com" rel="nofollow" title="Golf Course Reservations">Golf Course Reservations</a></li>
					<li><a href="http://www.hotelbully.com" title="Book Discount Hotels" rel="nofollow">Book Discount Hotels</a></li>
					<li><a href="http://www.airportparkingreservations.com" target="_blank" rel="nofollow" title="Airport Parking Reservations">Airport Parking Reservations</a></li>
					<li><a href="http://www.tourbully.com" target="_blank" rel="nofollow" title="Discount Sightseeing Tours">Discount Sightseeing Tours</a></li>
					</ul>					
				</div>

				
				<div id="bookbyphone">
				
					<img alt="Book Hotels &amp; Rental Cars by Phone" height="144" src="../images/book-hotels-car-rentals-by-phone-260x144.png" width="260"></div>
				
				</div>
				
				<div id="maincontent">	
					<div id="hotelheader">				
					<h1><?php echo $carInfo['city_name'];?> - Discount Car Rentals &amp; Rental Car Reservations</h1>
					</div>
				<div id="leftsideparagraph">
						<p>Making rental car reservations in <?php echo $carInfo['city_name']; ?> has never been so easy.  Our rental service providers include Avis, Hertz, Sixt, Enterprise, Dollar, Budget, Payless, Alamo, U-Save, Fox, National, and more reputable rental car agencies with offices located in <?php echo $carInfo['city_name']; ?>, <?php echo $carInfo['state_code']; ?> <?php echo $carInfo['country_name']; ?>.<br><br>
						Finding the right website to make rental car reservations can be difficult, but 
						we have made every effort to insure that your experience is easy and efficient. You have two options available for making rental car reservations. You can book your car rental by phone at 1-877-477-8594 Discount Code: 6084 or you can make reservations through our online reservation system.</p>
					</div>
					
					<div id="hotelcitymap">
						<div id="map_canvas" style="width:275px;height:200px;"></div>
					</div>
					
					<div id="hotelresults">
						<p>Total Number of Rental Car Types available in <?php echo $carInfo['city_name'];?>, <?php echo $carInfo['state_code'];?> <?php echo $carInfo['country_name'];?>: 12</p>
					</div>
					
				
				<?php
				
					$i = 1;
					
					do { $i++;
						$cartype = $carInfo['description'];
						$doors = $carInfo['type_description'];
						$city = $carInfo["city_name"];
						$cityurl = $carInfo["city"];
						$statecode = $carInfo['state_code'];
						$country = $carInfo['country_name'];
						$countryurl = $carInfo['country'];
						$countrycode = $carInfo['country_code'];
						$image = $carInfo['vehicle_images'];
						$passengers = $carInfo['max_passengers'];
						$cid = $carInfo['cityid'];
						$tomorrow = mktime(0, 0, 0, date("m"), date("d")+1, date("y"));
						$pickup = date("m/d/Y", $tomorrow);
						$tomorrow2 = mktime(0, 0, 0, date("m"), date("d")+2, date("y"));
						$dropoff = date("m/d/Y", $tomorrow2);



					
				
				
				echo "<div id=\"hotellistings\">				\n"; 
				echo "<div id=\"hotelimages\"><img alt=\"$cartype\" height=\"90\" src=\"../$image\" width=\"90\"></div>\n"; 
				echo "<div id=\"hotellistingsinfo\"><h2>$cartype Rental Reservations</h2>\n"; 
				echo "<div id=\"hotellistingsaddress\"><p>$cartype Rental Reservations in $city, $statecode $country</p>\n"; 
				echo "<div id=\"hoteldescription\"><p><span style=\"font-weight:bold\">Type:</span> $cartype&nbsp; <span style=\"font-weight:bold\">Doors:</span> $doors&nbsp; <br><span style=\"font-weight:bold\">Transmission:</span> Automatic or Manual<br><span style=\"font-weight:bold\">Passengers:</span> $passengers Passenger $cartype&nbsp; </p></div>\n"; 
				echo "</div>\n"; 
				echo "</div>\n"; 
				echo "<div id=\"hotelinfosale\"><div id=\"hotelcheckrate\"><p>Check Daily Rates, Make Reservations or Book By Phone</p></div><a href=\"http://go.farebully.com/car_rentals/results/?rs_pu_city=$city%2C+$countrycode&rs_pu_cityid=&rs_do_city=&rs_pu_time=10%3A00&rs_pu_date=$pickup&rs_do_time=10%3A00&rs_do_date=$dropoff&refid=6084&rs_company=&rs_cartype=&rs_company_code=&refid=6084\" title=\"$cartype Reservations\"><input type=\"submit\" name=\"booknow\" class=\"booknow\" value=\"RESERVE NOW\" /></a>\n"; 
				echo "</div>\n"; 
				echo "</div>\n";
				}
				
				while ($carInfo = mysql_fetch_assoc($carquery)); {
					
				}

				
				 ?>
				
				 

				<div id="viewmoreresults">
				<p>* Car fleet information including capacities is based on the latest information provided to us by the supplier and is subject to change.
					† Map locations and distances are provided by the supplier and cannot be verified by CarRentalBully.com.</p>
				</div>
				
				<div id="moretravelheader">
				<h2>Tours, Hotels &amp; Limo Services in <?php echo "$city"; ?></h2>
				</div>
				
				<div id="hotellistings">
				
				<div id="hotelimages">
					<img alt="Book Hotels in <?php echo "$city"; ?>, <?php echo "$statecode"; ?> <?php echo "$country"; ?>" height="90" src="../images/690702.jpg" width="90">
				</div>
				
				<div id="hotellistingsinfo">
				<h2>Discount Hotels in <?php echo "$city"; ?>, <?php echo "$statecode"; ?> <?php echo "$country"; ?></h2>
				
				<div id="hoteldescription">
				<p>Are you searching for the best prices on the top hotel properties in <?php echo "$city"; ?>. Find Discount Hotels in <?php echo "$city"; ?>, <?php echo "$statecode"; ?> <?php echo "$country"; ?> by visiting HotelBully.com</p>
				</div>
									
				

									
				</div>
				<div id="hotelinfosale">
					<div id="hotelcheckrate"><p>Check Rates &amp; Make Hotel Reservations: Save Now!</p></div>
					<a href="http://www.hotelbully.com/hotels-motels-resorts-inns/city-discount-hotels.php?city=<?php echo "$cityurl"; ?>&cityid=<?php echo "$cid"; ?>&country=<?php echo "$countryurl"; ?>" target="_blank" title="<?php echo "$city"; ?> Hotel Reservations"><input type="submit" name="booknow" class="booknow" value="View Hotels" /><a/>				
					
					
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
					<a href="http://www.partner.viator.com/en/2451/search/<?php echo "$country";?> Tours" target="_blank" title="<?php echo "$city"; ?> Tours"><input type="submit" name="booknow" class="booknow" value="View Tours" /><a/>				
					
					
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
					<a href="http://www.limobully.com" target="_blank" rel="nofollow" title="Limo Services in <?php echo "$city"; ?>"><input type="submit" name="booknow" class="booknow" value="Book Limos" /><a/>				
					
					
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
			<li><a href="http://go.farebully.com/help/contact/" title="Customer Support" rel="nofollow">Customer Support</a></li>
			<li><a href="http://go.farebully.com/help/review/" title="Review or Cancel Reservations" rel="nofollow">Review/Cancel Reservation</a></li>
			<li><a href="http://go.farebully.com/help/faq/" title="Frequently Asked Questions" rel="nofollow">Get the FAQ's</a></li>
			<li><a href="http://go.farebully.com/help/privacy/" title="Privacy Policy" rel="nofollow">Privacy Policy</a></li>
			<li><a href="http://go.farebully.com/help/terms/" title="Terms &amp; Conditions" rel="nofollow">Terms &amp; Conditions</a></li>
			<li><a href="../international-car-rentals-reservations.html" title="Car Rental Guide">Car Rental Guide</a></li>
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
				<li><a href="http://www.carrentalbully.com" title="Car Rental Bully Home Page">Home</a></li>
				<li><a href="http://www.farebully.com" title="Cheap Flights" rel="nofollow">Flights</a></li>
				<li><a href="http://www.hotelbully.com" title="Discount Hotels" rel="nofollow">Hotels</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Vacation Packages" rel="nofollow">Flights+Hotels</a></li>
				<li><a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Cars" rel="nofollow">Cars</a></li>
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
		<p>Copyright © 2014 CarRentalBully.com Version 1.1 - <span class="spanyel">
		<a title="Site Map XML" href="../sitemap.xml">SITEMAP XML</a></span></p>
		
		
	</div>

	
	</div>

</div>

</div>


</body>

</html>
