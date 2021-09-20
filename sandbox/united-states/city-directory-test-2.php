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
if (isset($_GET['country_name'], $_GET['state_name'])) {
$country_name = $_GET['country_name'];
$state_name = $_GET['state_name'];
} else {
	echo 'This page is not Currently in Our Directory: Please visit Our Home Page <a href="http://www.hotelbully.com">HotelBully.com</a>';
	ini_set ('display_errors', FALSE);
}
$hotelselect = "SELECT DISTINCT city.state_name, city.country_name, city.city_name FROM city WHERE city.state_name='$state_name' AND city.country_name='$country_name' ORDER by city_name ASC";
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
<ol>
					<?php do {?>
					<li><?php echo $hotelInfo['city_name'];?></li>
					<?php } while  ($hotelInfo = mysql_fetch_assoc($hotelquery));
					?>
					</ol>

</body>

</html>
