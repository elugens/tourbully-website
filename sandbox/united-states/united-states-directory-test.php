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
if (isset($_GET['id'])) {
$id = $_GET['id'];
} else {

}
$hotelselect = "SELECT DISTINCT city.state_name, city.country_name FROM city WHERE city.country_name LIKE 'United States' ORDER by state_name ASC";
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
					<li><?php echo $hotelInfo['state_name'];?></li>
					<?php } while  ($hotelInfo = mysql_fetch_assoc($hotelquery));
					?>
					</ol>

</body>

</html>
