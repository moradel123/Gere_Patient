<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

try {
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if ($data === null || !isset($data['name'], $data['email'], $data['password'], $data['tel'], $data['address'], $data['cin'])) {
        throw new Exception("Données invalides");
    }

    $name = $data['name'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $tel = $data['tel'];
    $address = $data['address'];
    $cin = $data['cin'];

    $servername = "localhost";
    $username = "root";
    $dbpassword = "";
    $dbname = "hospital";

    $conn = new mysqli($servername, $username, $dbpassword, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    $sql_check = "SELECT * FROM users WHERE email = '$email' OR cin = '$cin'";
    $result_check = $conn->query($sql_check);

    if ($result_check->num_rows > 0) {
        throw new Exception("Email ou CIN déjà utilisé");
    }

    $sql = "INSERT INTO users (name, email, password, tel, address, cin) VALUES ('$name', '$email', '$password', '$tel', '$address', '$cin')";
    if ($conn->query($sql)) {
        echo json_encode(array("message" => "Inscription réussie"));
    } else {
        throw new Exception("Erreur lors de l'inscription : " . $conn->error);
    }

    $conn->close();
} catch (Exception $e) {
    echo json_encode(array("message" => $e->getMessage()));
}
?>