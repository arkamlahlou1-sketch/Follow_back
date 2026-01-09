h<?php
include "config.php";

$user_id = $_SESSION['user_id'];

$conn->query("UPDATE users SET points = points + 1 WHERE id='$user_id'");
echo "تمت إضافة نقطة";
