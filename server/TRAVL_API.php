<?php

	/*
		
		BERG-HANSEN HACKATHON 2019
		GROUP: TRAVL	
		
		API #1 is Flightstats.com, and is a paid API. That is why the KEY is removed from this file. 
		The Amadeus-API does have the information about the aircraft as well, but only in the 
		Enterprise-edition, and we did not get access to that.
		
		https://developer.flightstats.com/api-docs/flightstatus/v2/flight
		
		One limitation with this API is that we only get data for the next 4 days ahead of time, so 
		the Enterprise-API from Amadeus is probably a better solution to integrate, but we wanted to 
		have a demo of an actual working product, so we went for this one for now.
		
		API #2 is Brighterplanet.com, and is free for a small amount of API-calls. The KEY is also removed here, 
		so it hopefully will work during our presentation. This API is delivering us with the Co2-emission of our 
		flights.
		
		http://impact.brighterplanet.com/models/flight#
		http://impact.brighterplanet.com/flights?aircraft=A343&date=2019-04-06&destination_airport=CPH&origin_airport=SFO&timeframe=2019-01-01%2F2020-01-01
		
	*/
	
	header("Access-Control-Allow-Origin: *");	// Allowing access across domains
	
	$flight = $_GET['flight'];	// Gettting the flightnumber
	$y = $_GET['y'];				// Getting the year of the date
	$m = $_GET['m'];				// Getting the month of the date
	$d = $_GET['d'];				// Getting the day of the date
	$airport = $_GET['airport'];	// Getting the airport travelling from
	
	$airline = substr($flight, 0, 2);			// Stripping out the letters of the flightnumber for the API-call
	$flightnumber = substr($flight, 2, 4);		// Stripping out the numbers of the flightnumber for the API-call

	// API-call #1 --> Getting the destination airport and the aircraft	
	$apicall = file_get_contents('https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/'.$airline.'/'.$flightnumber.'/dep/'.$y.'/'.$m.'/'.$d.'?appId=[APP_ID]&appKey=[API_KEY]&utc=false&airport='.$airport.'');
	
	$json_a = json_decode($apicall, true);		// Decoding the JSON-result from the API
	
	$destination = $json_a['appendix']['airports']['1']['iata'];	// Getting the destination airport from the API-response
	$airplaneiata = $json_a['flightStatuses']['0']['flightEquipment']['scheduledEquipmentIataCode'];	// Getting the aircraft from the API-response
	
	
	// API-call #2 --> Getting the information about the emission
	$apicall_2 = file_get_contents('http://impact.brighterplanet.com/flights.json?key=[API_KEY]&date='.$y.'-'.$m.'-'.$d.'&origin_airport='.$airport.'&destination_airport='.$destination.'&aircraft='.$airplaneiata.'');
	
	print $apicall_2;	// Printing the API-call #2 as JSON and are then read by our extension
	
?>