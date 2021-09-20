<?php
$tomorrow = mktime(0, 0, 0, date("m"), date("d")+1, date("y"));
echo date("m/d/y", $tomorrow); 
?>

<?php
$tomorrow2 = mktime(0, 0, 0, date("m"), date("d")+2, date("y"));
echo date("m/d/y", $tomorrow2); 
?>