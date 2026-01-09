<?php
include "config.php";

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username,email,password) VALUES (?,?,?)");
$stmt->bind_param("sss", $username, $email, $password);
$stmt->execute();

echo "تم إنشاء الحساب بنجاح";
