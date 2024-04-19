<?php
$servername = "localhost";
$username = "root";
$password = "Isg7192909#";
$dbname = "hotels";

// Get user-entered destination location name
$destinationName = $_GET['destination_name']; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL query with a dynamically changing table name based on the destination
$sql = "SELECT * FROM " . $destinationName;

$result = $conn->query($sql);

// Prepare an array to store locations
$locations = [];

while ($row = $result->fetch_assoc()) {
    $locations[] = $row;
}

// Close the connection
$conn->close();

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($locations);
?>
