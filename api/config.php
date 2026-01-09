<?php
$conn = new mysqli("localhost", "root", "", "follow_exchange");
if ($conn->connect_error) {
  die("فشل الاتصال");
}
session_start();
?>
