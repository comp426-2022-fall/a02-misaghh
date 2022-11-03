#!/usr/bin/env node

//load builtins

import moment from 'moment-timezone';
import fetch from 'node-fetch';
import minimist from 'minimist';


//readme constant 
const args = minimist(process.argv.slice(2));

if(args.h){
    try{
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);
    process.exit(0);
  }catch(error){
    process.exit(1);
  }
}

  const timezone = moment.tz.guest()
  if(args.z){
    timezone = args.z;
  }

  let latitude = '35.910259';
  let longitude = '-79.055473';

  if(args.n){
    latitude = args.n;
  }else if(args.s){
    latitude = args.s;
  }else{
    console.log("lattitude out of range")
  }

  if(args.e){
    longitude = args.e;
  }else if(args.w){
    longitude = args.w;
  }else{
    console.log("longitude out of range")
  }

  const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m,relativehumidity_2m,rain&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone);
  const data = await response.json();

if(!args.h && !args.j){
  let day = 1;

  if(args.d){
    day = args.d;
  }

 
  if(data.daily.precipitation_hours[args.d] == 0){
    console.log("will need your galoshes");
  }else{
    console.log("you will not need your galoshes")
  }

  if(day == 0){
    console.log("today")
  }else if(day > 1){
    console.log("int" + day + "days.");
  }else{
    console.log("tomorrow")
  }

}
