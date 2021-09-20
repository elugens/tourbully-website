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
$hotelselect = "SELECT city.state_name, city.country_name, city.city_name, city.cityid, city.hotel_count, city.longitude, city.latitude, hotel.property_description, hotel.state_code, hotel.cityid, hotel.hotelid_t, hotel.hotel_name, hotel.hotel_address_full, hotel.thumbnail, hotel.lowrate, hotel.star_rating, hotel.nearbyhotels FROM city JOIN hotel ON city.cityid = hotel.cityid WHERE city.city_name='$city_name' AND city.cityid='$cityid' AND hotel.country_name='$country_name' AND active='1' ORDER by overall_rating DESC LIMIT 0,8";
$hotelquery = mysql_query($hotelselect) or die (mysql_error());
$hotelInfo = mysql_fetch_assoc($hotelquery);
?>
<!DOCTYPE html>
<html>

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<title>Untitled 1</title>
</head>

<body>
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

				
				<div id="hotellistings">
				<?php 	
					while ($hotelInfo = mysql_fetch_assoc($hotelquery)): {
					$hotel = $hotelInfo["hotel_name"];
					$propertydescription = $hotelInfo["property_description"];
					$city = $hotelInfo["city_name"];
					$image = $hotelInfo["thumbnail"];	
					}
				echo "<div id=\"hotelimages\"><img alt=\"\" src=\"$image\" width=\"90\" height=\"90\"></div>";
				echo "<div id=\"hotellistingsinfo\"><h2>$hotel</h2>";
				echo "<div id=\"hotellistingsaddress\"><p>$propertydescription</p>";
				
				endwhile;
				?>
				<?php echo "$city"; ?>
				</div>							
			</div>

</body>

</html>
