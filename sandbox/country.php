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
if (isset($_GET['Country'])) {
$Country = $_GET['Country'];
} else {

}
mysql_query("SET NAMES 'utf8'");
$tourselect = "SELECT DISTINCT Region FROM vapproducts WHERE Country='$Country' ORDER by Region ASC";
$tourquery = mysql_query($tourselect) or die (mysql_error());
$tourInfo = mysql_fetch_assoc($tourquery);
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
						<li><?php echo $tourInfo['Region'];?></li>
						<?php } while  ($tourInfo = mysql_fetch_assoc($tourquery));
						?>
						</ol>

</body>

</html>
