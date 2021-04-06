<?php
$page = $_GET['page'] ? $_GET['page']: 1;
$service_url     = 'https://www.pinkvilla.com/photo-gallery-feed-page/page/'.$page;
$curl            = curl_init($service_url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
$curl_response   = curl_exec($curl);
curl_close($curl);
$json_object    = json_decode($curl_response);

echo $curl_response;

?>