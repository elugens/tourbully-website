<?php
if(isset($_POST['send'])) {
$to = "elugens@gmail.com";
$subject = "Contact us";
$name_field = $_POST['fname'];
$email_field = $_POST['email'];
$message = $_POST['message'];
 
$body = "From: $name_field\n E-Mail: $email_field\n Message:\n $message";
mail($to, $subject, $body);
} else {
echo "blarg!";
}
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Contact Us: CarRentalBully.com - Message Sent</title>
<meta name="keywords" content="contact us"/>
<meta name="description" content="Please us this form contact us."/>
<meta content="INDEX,FOLLOW" name="ROBOTS"/>
<meta content="15 days" name="revisit-after"/>
<meta name="rating" content="General"/>
<link rel="icon" type="image/png"  href="images/favicon.png">
<link rel="canonical" href="http://www.carrentalbully.com/sendmail.php"/>


<!-- CSS Styles -->
<link rel="stylesheet" type="text/css" href="css/pages/contact.css" media="screen" />
<link rel="stylesheet" type="text/css" href="css/themes/default/default.css" media="screen" />
<link rel="stylesheet" type="text/css" href="css/themes/minimal/all.css" >
<link rel="stylesheet" type="text/css" href="css/modalbox.css" />
<link rel="stylesheet" type="text/css" href="css/select.css" />
<link rel="stylesheet" type="text/css" href="css/jquery.jscrollpane.css" />



</head>

<body class="noJS">

<div id="top">
	<div class="wraptop">
		<div id="bookbyphoneheader">
			<img alt="Book Hotels &amp; Rental Cars by Phone" height="11" src="images/mapphonesmall.png" width="8">&nbsp;
		Book Hotels &amp; Rental Cars by Phone:  <span class="spanyel">1-877-477-8594</span> mention promo code: <span class="spanyel">
			HBC6084</span>
		</div>
		
	<div class="clear"></div>
	</div>
</div><!-- end of #top -->

<div id="subtop">
	<div class="wrapsubtop">
		<div class="logo">
			<a href="http://www.tourbully.com" title="Tour Bully Home Page">
			<img alt="TourBully.com - Home Page" height="49" src="images/logo.png" width="243"></a></div>
		<div class="navmenu">
		<nav id="topNav">
			<ul>
				<li><a href="partners/flight-deals.html" title="Cheap Flights">FLIGHTS</a></li>
				<li><a href="partners/hotel-deals.html" title="Discount Hotels">HOTELS</a></li>
				<li><a href="partners/flight-hotel-combo-deal.html" title="Book Flights & Hotels">FLIGHTS+HOTELS</a></li>
				<li><a href="partners/rental-car-deals.html" title="Rental Cars">RENTAL CARS</a></li>
				<li><a href="http://www.tourbully.com" title="Tour Reservations">TOURS</a></li>
				<li><a href="partners/limos-reservations.html" title="Limo Services">LIMOS</a></li>
				<li><a href="partners/cruise-deals.html" title="Cruise Deals">Cruises</a></li>			
			</ul>
		</nav>
		</div>
		<div id="quoteengine"></div>
		<div class="clear"></div>
	</div>
</div>
<!-- end of #subtop -->
<div class="clear"></div>



<div id="header">
	<div class="wrapheader" style="left: 0px; top:0px">
		<div class="infobox">
			<div class="midbox">
				<h2>Car Rental Bully</h2>
				<div class="address">Merced, CA., 95348</div>
				<div class="phone">info@carrentalbully.com</div>
				<div class="arrow"></div>
				<div class="clear"></div>
				</div>
		</div>
		<img alt="contactmap" src="images/contactmap.jpg" />
	</div>
</div>

<div id="content">
		<div class="wrapcontent">
			<div class="left">
			<div class="title">
				<h2>Your Message has Been Sent...</h2>
			</div>
			<form action="sendmail.php" method="post" enctype="text/plain">
				<table class="sbox">
				<tr>
					<td><span class="text">Full Name</span></td>
					<td><span class="text">Email Address</span></td>
				</tr>
				<tr>
					<td><input type="text" name="fname" class="field1" value="John Smith" /></td>
					<td class="last"><input type="text" name="email" class="field1" value="johnsmith@hotmail.com" /></td>
				</tr>
				<tr>
					<td colspan="2"><span class="text">Write message here</span></td>
				</tr>
				<tr>
					<td class="last" colspan="2"><textarea class="field3"></textarea></td>
				</tr>
				</table>
				<input class="sendbtn" type="submit" name="send" value="Send" />
				</form>
			</div>
			<div class="right">
				<div class="box">
					<div class="top">
						<h2>Contact Us</h2>
					</div>
					<div class="mid">
						<ul>
							<li>Book Hotels &amp; Rental Cars<div class="subli">1-877-477-8594 - Promo Code: HBC 6084</div></li>
							<li>Address<div class="subli">Merced, CA. 95348</div></li>
							<li>Webmaster<div class="subli">webmaster@carrentalbully.com</div></li>
							<li>Email Address<div class="subli">info@carrentalbully.com</div></li>
							<li>Website<div class="subli">www.carrentalbully.com</div></li>
						</ul>
					</div>
				</div>			
			</div>
		<div class="clear"></div>
		</div>
</div><!-- end of #content -->

<div id="footer">
	  <div class="wrapfooter">
		<div class="links">
			<ul>
				<li><a href="http://www.tourbully.com" title="Tour Bully Home Page">Home</a></li>
				<li><a href="partners/flight-deals.html" title="Cheap Flights">Flights</a></li>
				<li><a href="partners/hotel-deals.html" title="Discount Hotels">Hotels</a></li>
				<li><a href="partners/flight-hotel-combo-deal.html" title="Vacation Packages">Flights+Hotels</a></li>
				<li><a href="partners/rental-car-deals.html" title="Rental Cars">Cars</a></li>
				<li><a href="partners/discount-hostels.html" title="Book Hostels">Hostels</a></li>
				<li><a href="partners/limos-reservations.html" title="Limo Services">Limos</a></li>
				<li><a href="partners/cruise-deals.html" title="Cruise Deals">Cruises</a></li>
				<li><a href="partners/airport-parking-reservations.html" title="Airport Parking Reservations">Airport Parking</a></li>
				<li><a href="http://www.tourbully.com/" title="Sightseeing Tours">Tours</a></li>
				<li><a href="partners/rail-passes.html" title="Rail Passes">Rail Passes</a></li>
				<li><a href="partners/golf-course-reservations.html" title="Golf Course Reservations">Golf Courses</a></li>
				<li><a href="contact.html" title="Contact Us">Contact Us</a></li>
			</ul>
		</div>
				
	</div>

	
	</div>
	
	<div id="footerbottom">
	<div class="wrapfooter2">
		<p>Copyright ?? 2014 CarRentalBully.com Version 1.1 - <span class="spanyel">
		<a title="Site Map XML" href="sitemap.xml">SITEMAP XML</a></span></p>
		
		
	</div>

	
	</div>


<!-- Javascripts -->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery-ui.js"></script>
<script type="text/javascript" src="js/jquery.icheck.min.js"></script>
<script type="text/javascript" src="js/jquery.fancybox.js"></script>
<script type="text/javascript" src="js/jquery.select.js"></script>
<script type="text/javascript" src="js/jScrollPane.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/classie.js"></script>
<script type="text/javascript" src="js/modalEffects.js"></script> 

</body>
</html>