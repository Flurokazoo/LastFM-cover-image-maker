<?php

$key = "c4a37a4b7744e1b0e78c09be5cb8908f";
$secret = "4bb894f812e0c6ce17512ad92f6268fa";
$user = $_GET['user'];


$getAlbumListUrl = file_get_contents("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" . $user . "&api_key=" . $key . "&format=json&period=1month");
$json = json_decode($getAlbumListUrl, true);
$count = 0;
$array = array();

foreach ($json['topalbums']['album'] as $entry) {
    if($entry['image'][3]['#text']){
        $array[$count]['artist'] = $entry['artist']['name'];
        $array[$count]['albumname'] = $entry['name'];
        $array[$count]['img'] = $entry['image'][3]['#text'];
        $count++;
    }
}

$array = json_encode($array);
echo $array;
exit;