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
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<title>Untitled 1</title>
</head>

<body>
<?php 	
		while ($hotelInfo = mysql_fetch_assoc($hotelquery)): {
		$hotel = $hotelInfo["hotel_name"];
		$propertydiscription = $hotelInfo["property_description"];
		$city = $hotelInfo["city_name"];		
		}
		
		echo "<div><h2>$hotel</h2><div><br>";
		echo "$propertydiscription<br><br>";
		endwhile; 
		echo "$city";
?>
</body>

</html>
