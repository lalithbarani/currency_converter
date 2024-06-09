<?php
// Get the parameters from the URL
$amount = $_GET['amount'];
$from = $_GET['from'];
$to = $_GET['to'];

// API URL for getting the conversion rate
$apiUrl = "https://open.er-api.com/v6/latest/$from";

// Make API request and get the response
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

// Check for success
if ($data['result'] === 'success') {
    $rate = $data['rates'][$to];
    $result = $amount * $rate;
    echo json_encode(['result' => $result]);
} else {
    echo json_encode(['error' => 'Unable to fetch conversion rate']);
}
?>
