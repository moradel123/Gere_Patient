<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($data === null || !isset($data['email'], $data['password'])) {
    echo json_encode(array("message" => "Données invalides"));
    exit;
}

$email = $data['email'];
$password = $data['password'];

$servername = "localhost";
$username = "root";
$dbpassword = "";
$dbname = "hospital";

$conn = new mysqli($servername, $username, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        unset($row['password']);
        echo json_encode(array("message" => "Connexion réussie", "user" => $row));
    } else {
        echo json_encode(array("message" => "Mot de passe incorrect"));
    }
} else {
    echo json_encode(array("message" => "Utilisateur non trouvé"));
}

$conn->close();
?>