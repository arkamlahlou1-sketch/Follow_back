<?php
include "config.php";

$user_id = $_SESSION['user_id'];
$platform = $_POST['platform'];
$url = $_POST['url'];

$conn->query("INSERT INTO accounts (user_id,platform,profile_url)
VALUES ('$user_id','$platform','$url')");

echo "تمت الإضافة";
