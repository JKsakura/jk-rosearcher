<?php
    $data = $_GET["data"];
    $fp = fopen("data.json", "w+") or die("Can't load file"); // overwrite file, or create if it does not exist
    fwrite($fp, $data);
    fclose($fp);
?>