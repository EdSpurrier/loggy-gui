//
//  EXTENSIONS AND FUNCTIONS  
//

function GetSecondsDifferenceVisionCoreTimeAndNow(visioncore_datetime) {
    var date1 = ConvertStringToDatetime(visioncore_datetime);
    var date2 = Date.now();
    var diff_seconds = Math.round(date1 / 1000) - Math.round(date2 / 1000);
    var timespan = secondsTimeSpanToHMS(diff_seconds);

    //console.log("date1:" +  Math.round(date1 / 1000) + ", date2:" + Math.round(date2 / 1000) + " | diff_sec: " + diff_seconds + " >> " + timespan);
    return diff_seconds;
}

function GetTimeDifferenceVisionCoreTime(visioncore_datetime_1, visioncore_datetime_2) {
    var date1 = ConvertStringToDatetime(visioncore_datetime_1);
    var date2 = ConvertStringToDatetime(visioncore_datetime_2);
    var diff_seconds = Math.round(date1 / 1000) - Math.round(date2 / 1000);
    var timespan = secondsTimeSpanToHMS(diff_seconds);

    //console.log("date1:" +  Math.round(date1 / 1000) + ", date2:" + Math.round(date2 / 1000) + " | diff_sec: " + diff_seconds + " >> " + timespan);
    return timespan;
}

function ConvertStringToDatetime ( visioncore_datetime ) {
    return new Date(Date.parse(visioncore_datetime, "yyyy-MM-dd HH:mm:ss"));
}

function ConvertDatetimeVisionCore(datetime) {
    return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
}

function ConvertDatetimeToDate (visioncore_datetime) {
    var date = moment(visioncore_datetime, "DD/MM/YYYY hh:mm:ss a").toDate();
    return moment( date ).format('YYYY-MM-DD');
}

function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}

function GetDateAndTime( unixtimestamp ) {
    var dt = eval( unixtimestamp * 1000 );
    var myDate = new Date(dt);
    return( myDate.toLocaleString() );
}

function GetTimeFromSeconds (unixtimestamp) {
    //a day contains 60 * 60 * 24 = 86400 seconds
    //an hour contains 60 * 60 = 3600 seconds
    //a minut contains 60 seconds
    //the amount of seconds we have left
    var seconds = unixtimestamp;

    //how many full days fits in the amount of seconds seconds
    var days = Math.floor(seconds / 86400);

    //how many seconds are left
    seconds = seconds - (days * 86400);

    //how many full hours fits in the amount of seconds seconds
    var hours = Math.floor(seconds / 3600);

    //how many seconds are left
    seconds = seconds - (hours * 3600);

    //how many minutes fits in the amount of seconds seconds
    var minutes = Math.floor(seconds / 60);

    //how many seconds are left
    seconds = seconds - (minutes * 60);
    return days + ' days - ' + hours + ':' + minutes + ':' + seconds;
}



function GetTimeStamp( date ) {

    return( Math.floor( date / 1000) );
}

function AddLeadingZeros (n, length) {
    var str = (n > 0 ? n : -n) + "";
    var zeros = "";
    for (var i = length - str.length; i > 0; i--)
        zeros += "0";
    zeros += str;
    return n >= 0 ? zeros : "-" + zeros;
}


jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function parseDecimalRoundAndFixed(num,dec){
    var d =  Math.pow(10,dec);
    return (Math.round(num * d) / d).toFixed(dec);
  }


function FindStringAfterString(originalString, searchString)
{
    return originalString.substring( (originalString.indexOf(searchString) + searchString.length) );
}

function StringContains (stringToSearch, stringToFind) {
    if(stringToSearch.indexOf(stringToFind) != -1){
        return true;
    } else {
        return false;
    };
}


function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function CountProperties(obj) {
    var prop;
    var propCount = 0;

    for (prop in obj) {
        propCount++;
    }
    return propCount;
}

function Compare(string_1, string_2) {
    console.log("Compare: " + string_1 + " == " + string_2 + " >>> " + (string_1 == string_2));
    
}


function CleanString (string) {
    var newStr = string.replace(/\s+/g, '');

    return $.trim(newStr);
}



Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
  };

function GetCurrentDate () {
    var date = new Date();
    return date.yyyymmdd();
}