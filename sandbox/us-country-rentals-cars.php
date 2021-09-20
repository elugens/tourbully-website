<?php 
 header('Content-type: text/html; charset=utf-8'); 
?>
<?php
$link = mysql_connect('localhost', 'root', '');
if (!$link) {
    die('Could not connect: ' . mysql_error());
}

// make cities the current db
$db_selected = mysql_select_db('carbully_carrentals', $link);
if (!$db_selected) {
    die ('Can\'t use foo : ' . mysql_error());
}
if (isset($_GET['country'])) {
$country = $_GET['country'];
} else {

}
mysql_query("SET NAMES 'utf8'");
$carselect = "SELECT DISTINCT city.state_name, city.state, city.country_name, city.country, city.city_name, city.city, city.cityid, city.hotel_count FROM city WHERE hotel_count>=1 AND city.country LIKE '$country' ORDER by city_name ASC";
$carquery = mysql_query($carselect) or die (mysql_error());
$carInfo = mysql_fetch_assoc($carquery);
?>
<!DOCTYPE html>
<html>

<head>
<meta content="en-us" http-equiv="Content-Language" />
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<title><?php echo $carInfo['country_name']; ?> Car Rentals Reservations - Rent A Car <?php echo $carInfo['country_name']; ?></title>
<meta name="keywords" content="<?php echo $carInfo['country_name']; ?>,<?php echo $carInfo['country_name']; ?> car rentals,car hire,rent a car,rentacar,discounts,cheap,companies"/>
<meta name="description" content="Looking for the best rates on rental cars & car rental reservations in <?php echo $carInfo['country_name']; ?>. Find the best prices on car rentals in <?php echo $carInfo['city_name']; ?>."/>
<meta content="INDEX,FOLLOW" name="ROBOTS"/>
<meta content="15 days" name="revisit-after"/>
<meta name="rating" content="General"/>
<link rel="icon" type="image/png"  href="../images/favicon.png">
<link rel="canonical" href=""/>
<link rel="stylesheet" type="text/css" href="../css/pages/content.css" media="screen" />
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
			<a href="http://www.carrentalbully.com" title="Hotel Bully">
			<img alt="HotelBully.com Logo" height="49" src="../images/logo.png" width="327"></a></div>
		<div class="navmenu">
		<nav id="topNav">
			<ul>
				<li><a href="http://go.farebully.com/air/home/?refid=6084" title="Cheap Flights">FLIGHTS</a></li>
				<li><a href="http://www.hotebully.com" title="Discount Hotels">HOTELS</a></li>
				<li><a href="http://go.farebully.com/vp/home/?refid=6084" title="Book Flights & Hotels">FLIGHTS+HOTELS</a></li>
				<li><a href="http://go.farebully.com/car_rentals/home/?refid=6084" title="Rental Cars">RENTAL CARS</a></li>
				<li><a href="http://www.tourbully.com" target="_blank" title="Sightseeing Tours" rel="nofollow">TOURS</a></li>
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
				
					<a href="http://www.carrentalbully.com/" title="Cheap Travel Search Engine">
				
					<img alt="Discount Travel Search - Search Now" height="329" src="../images/discount-search-box.png" width="260"></a></div>
				
				<div id="topcities">
				
				<div id="topcitiesimage">
					<img alt="Search for Top Cities" height="17" src="../images/booking.png" width="17"></div>
				<div id="topcitiestitle"><p>TOP CAR RENTAL CITIES</p></div>
				
				</div>
				
				<div id="topcitieslinks">
					<ul>
					<li>
					<a href="tours.php?city=seoul&amp;cityid=3000040019&amp;country=republic-of-korea" title="Rent A Car Seoul, South Korea">Rent A Car Seoul, South Korea</a></li>
					<li>
					<a href="tours.php?city=shanghai&amp;cityid=3000040015&amp;country=china" title="Car Rentals Shanghai, China">Car Rentals Shanghai, China</a></li>
					<li>
					<a href="tours.php?city=manila&amp;cityid=3000040031&amp;country=philippines" title="Rent A Car Manila, Philippines">Rent A Car Manila, Philippines</a></li>
					<li>
					<a href="../rentals-cars/us-city-rentals-cars.php?city=new-york-city&amp;cityid=3000016152&amp;country=united-States" title="Car Rentals New York, USA">Car Rentals New York City</a></li>
					<li>
					<a href="tours.php?city=sao-paulo&amp;cityid=5000457645&amp;country=brazil" title="Car Rentals Sao Paulo, Brazil">Rent A Car Sao Paulo, Brazil</a></li>
					<li>
					<a href="tours.php?city=mexico-city&amp;cityid=3000060262&amp;country=mexico" title="Rental Cars Mexico City, Mexico">Rental Cars Mexico City, Mexico</a></li>
					<li>
					<a href="tours.php?city=cairo&amp;cityid=3000080002&amp;country=egypt" title="Car Rentals Cairo, Egypt">Car Rentals Cairo, Egypt</a></li>
					<li>
					<a href="tours.php?city=moscow&amp;cityid=5000406639&amp;country=russia" title="Rental Cars Moscow, Russia">Rental Cars Moscow, Russia</a></li>
					<li>
					<a href="../rentals-cars/us-city-rentals-cars.php?city=los-angeles&amp;cityid=3000001947&amp;country=united-states" title="Car Rentals Los Angeles, USA">Car Rentals Los Angeles, USA</a></li>
					<li>
					<a href="tours.php?city=calcutta&amp;cityid=5000467571&amp;country=india" title="Rent A Car Calcutta, India">Rent A Car Calcutta, India</a></li>
					<li>
					<a href="../rentals-cars/us-city-rentals-cars.php?city=san-francisco&amp;cityid=3000002244&amp;country=united-states" title="Rental Cars San Francisco, California">Rental Cars San Francisco, CA</a></li>
					<li>
					<a href="tours.php?city=buenos-aires&amp;cityid=5000450066&amp;country=argentina" title="Car Rentals Buenos Aires, Argentina">Car Rentals Buenos Aires, AR</a></li>
					<li>
					<a href="tours.php?city=istanbul&amp;cityid=3000040045&amp;country=turkey" title="Rent A Car Istanbul, Turkey">Rent A Car Istanbul, Turkey</a></li>
					<li>
					<a href="tours.php?city=rio-de-janeiro&amp;cityid=5000457862&amp;country=brazil" title="Rental Cars Rio de Janeiro, Brazil">Rental Cars Rio de Janeiro, BR</a></li>
					<li>
					<a href="tours.php?city=paris&amp;cityid=3000035827&amp;country=france" title="Rental Cars Paris, France">Rental Cars Paris, France</a></li>
					<li>
					<a href="tours.php?city=lima&amp;cityid=3000070004&amp;country=peru" title="Rent A Car Lima, Peru">Rent A Car Lima, Peru</a></li>
					<li>
					<a href="../rentals-cars/us-city-rentals-cars.php?city=atlanta&amp;cityid=3000003496&amp;country=united-states" title="Rent A Car Atlanta, Georgia">Car Rental Atlanta, Georgia</a></li>
					<li>
					<a href="tours.php?city=rome&amp;cityid=3000035823&amp;country=italy" title="Car Rentals Rome, Italy">Rent A Car Rome, Italy</a></li>
					</ul>
					<p>
					<a href="../international-car-rentals-reservations.html" title="International Car Rentals">View More 
					Car Rental Cities</a></p>					
				</div>
				
				<div id="services">
				
				<div id="servicesimage">
					<img alt="More Great Deals from Hotel Bully" height="16" src="../images/deals.png" width="17"></div>
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
					<h1 style="text-align:center"><?php echo $carInfo['country_name']; ?> - Discount Car Rentals &amp; Rental Car Reservations</h1>
					<div id="pagination">
						<a href="../rentals-cars/us-regional-rentals-cars.php?country=united-states" title="U.S. Hotels">United States</a> | 
						<a href="../rentals-cars/regional-car-rentals.php?country=canada" title="Canadian Hotels">Canada</a> | 
						<a href="../rentals-cars/country-car-rentals.php?country=mexico" title="Mexican Hotels">Mexico</a> | 
						<a href="caribbean-car-rentals-reservations.html" title="Caribbean Hotels">Caribbean</a> | 
						<a href="central-america-car-rentals-reservations.html" title="Central American Hotels">Central America</a> | 
						<a href="europe-car-rentals-reservations.html" title="European Hotels">Europe</a> | 
						<a href="asia-car-rentals-reservations.html" title="Asian Hotels">Asia</a> |
						<a href="south-america-car-rentals-reservations.html" title="South American Hotels">South America</a> |
						<a href="australia-pacific-car-rentals-reservations.html" title="Australian Hotels">Australia &amp; Pacific</a> |
						<a href="africa-car-rentals-reservations.html" title="African Hotels">Africa</a>
					</div>
					<div id="airportparagraph">
					<p>Are you looking for discount deal on Hotels, Motels, 
					Inns, &amp; Resorts for hotels in <?php echo $carInfo['country_name']; ?>? We have
					Hotels, Motels, Inns, &amp; Resorts availabe in <?php echo $carInfo['country_name']; ?>, listed in our <?php echo $carInfo['country_name']; ?>
					travel guide. If, you are looking for hotels, motels, inns, 
					resorts, limo services, shuttle services, tours, and much more. 
					This is the right place for you to start. Below, we have listed discount hotel 
					destinations by region &amp; state in <?php echo $carInfo['country_name']; ?>.</p>
					</div>

									
					<div id="hotelscolumn3">
						<ul>
						<?php do {?>
						<li>
						<a href="tours.php?city=<?php echo $carInfo['city'];?>&amp;cityid=<?php echo $carInfo['cityid'];?>&amp;country=<?php echo $carInfo['country'];?>" title="<?php echo $carInfo['city_name'];?> Hotel, Motel, Inn, &amp; Resort Deals"><?php echo $carInfo['city_name'];?> Hotel, Motel, Inn, &amp; Resort Deals</a></li>
						<?php } while  ($carInfo = mysql_fetch_assoc($carquery));
						?>
						</ul>
					</div>
				
											
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
				<a href="http://www.bullytravel.com/" target="_blank" rel="nofollow" title="Bully Travel Magazine">VISIT OUR BLOG</a></div>
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
			<li><a href="../international-car-rentals-reservations.html" title="International Hotel Guide">Hotel Guide</a></li>
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
