<?php
// API URL for getting the currency codes
$apiUrl = 'https://open.er-api.com/v6/latest/USD';

// Make API request and get the response
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

// Check for success
if ($data['result'] === 'success') {
    echo json_encode($data['rates']);
} else {
    echo json_encode(['error' => 'Unable to fetch currencies']);
}
?>
