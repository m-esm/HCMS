
var  grgSumOfDays=Array(Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273,  304, 334, 365),Array(0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305,  335, 366));
var hshSumOfDays=Array(Array(0, 31, 62, 93, 124, 155,  186, 216, 246, 276, 306, 336, 365), Array(0, 31, 62, 93, 124, 155, 186,  216, 246, 276, 306, 336, 366));
 
function ToShamsi(grgYear,grgMonth,grgDay,Format)
{
	var hshYear = grgYear-621;
	var hshMonth,hshDay;
     
	var grgLeap=grgIsLeap (grgYear);
	var hshLeap=hshIsLeap (hshYear-1);
     
	var hshElapsed;
	var grgElapsed = grgSumOfDays[(grgLeap ? 1:0)][grgMonth-1]+grgDay;
 
	var XmasToNorooz = (hshLeap && grgLeap) ? 80 : 79;
 
	if (grgElapsed <= XmasToNorooz)
	{
		hshElapsed = grgElapsed+286;
		hshYear--;
		if (hshLeap && !grgLeap)
			hshElapsed++;
	}
	else
	{
		hshElapsed = grgElapsed - XmasToNorooz;
		hshLeap = hshIsLeap (hshYear);
	}
 
	for (var i=1; i <= 12 ; i++)
	{
		if (hshSumOfDays [(hshLeap ? 1:0)][i] >= hshElapsed)
		{
			hshMonth = i;
			hshDay = hshElapsed - hshSumOfDays [(hshLeap ? 1:0)][i-1];
			break;
		}
	}
 
 
	if (Format=="Long")
		return hshDayName (hshDayOfWeek(hshYear,hshMonth,hshDay)) + "  " +  hshDay + " " + calNames("hf", hshMonth-1) + " " + hshYear;
	else
		return hshYear + " /" + hshMonth + " /" + hshDay;
}
 
 
function ToGregorian (hshYear,hshMonth,hshDay)
{
	var grgYear = hshYear+621;
	var grgMonth,grgDay;
 
	var hshLeap=hshIsLeap (hshYear);
	var grgLeap=grgIsLeap (grgYear);
 
	var hshElapsed=hshSumOfDays [hshLeap ? 1:0][hshMonth-1]+hshDay;
	var grgElapsed;
 
	if (hshMonth > 10 || (hshMonth == 10 && hshElapsed > 286+(grgLeap ? 1:0)))
	{
		grgElapsed = hshElapsed - (286 + (grgLeap ? 1:0));
		grgLeap = grgIsLeap (++grgYear);
	}
	else
	{
		hshLeap = hshIsLeap (hshYear-1);
		grgElapsed = hshElapsed + 79 + (hshLeap ? 1:0) - (grgIsLeap(grgYear-1) ? 1:0);
	}
 
	for (var i=1; i <= 12; i++)
	{
		if (grgSumOfDays [grgLeap ? 1:0][i] >= grgElapsed)
		{
			grgMonth = i;
			grgDay = grgElapsed - grgSumOfDays [grgLeap ? 1:0][i-1];
			break;
		}
	}
 
	return grgYear+"-"+grgMonth+"-"+grgDay;
}
 
function grgIsLeap (Year)
{
	return ((Year%4) == 0 && ((Year%100) != 0 || (Year%400) == 0));
}
 
function hshIsLeap (Year)
{
	Year = (Year - 474) % 128;
	Year = ((Year >= 30) ? 0 : 29) + Year;
	Year = Year - Math.floor(Year/33) - 1;
	return ((Year % 4) == 0);
}
 
 
function hshDayOfWeek(hshYear, hshMonth, hshDay)
{
	var value;
	value = hshYear - 1376 + hshSumOfDays[0][hshMonth-1] + hshDay - 1;
 
	for (var i=1380; i<hshYear; i++)
		if (hshIsLeap(i)) value++;
	for (var i=hshYear; i<1380; i++)
		if (hshIsLeap(i)) value--;
 
	value=value%7;
	if (value<0) value=value+7;
 
	return (value);
}
 
function hshDayName(DayOfWeek)
{
	return calNames("df", DayOfWeek%7);
}
 
function calNames(calendarName, monthNo)
{
	switch (calendarName)
	{
		case "hf": return Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد",  "شهريور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند")[monthNo];
		case "ge": return Array(" January ", " February ", " March ", " April ",  " May ", " June ", " July ", " August ", " September ", " October ", "  November ", " December ")[monthNo];
		case "gf": return  Array("ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوثن", "ژوییه", "اوت",  "سپتامبر", "اكتبر", "نوامبر", "دسامبر")[monthNo];
		case "df": return Array("شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه")[monthNo];
		case "de": return Array("Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday")[monthNo];
	}
}
 
 
function UpdateCalendar(targetId, gregorianMonths, year, month)
{
	var newRow, newCell;
	var currentDay=1;
	var holidays=getHolidays(year, month);
	var lastDay=31;
	var dtToday=new Date();
	var strToday=dtToday.getFullYear()+"-"+(dtToday.getMonth()+1)+"-"+dtToday.getDate();
 
	if (month>6) lastDay--;
	if (month==12 && !hshIsLeap(year)) lastDay--;
 
 
	while (targetId.rows.length>0) targetId.deleteRow(0);
 
 
	newRow=targetId.insertRow(0);
	for (var i=0; i<hshDayOfWeek(year,month,1); i++) newRow.insertCell(-1).innerHTML=" ";
	for (var i=hshDayOfWeek(year,month,1); i<7; i++) {
		newCell=newRow.insertCell(-1);
		newCell.className="normalDay";
		newCell.innerHTML="<p class=ShamsiDayNo>" + currentDay +  "</p><p dir=ltr class=GregorianDayNo>" +  ToGregorian(year,month,currentDay).split("-")[2];
		if (holidays.substr(currentDay-1,1)=="x") newCell.className="Holiday";
		if (ToGregorian(year, month, currentDay)==strToday) newCell.className="Today";
		currentDay++;
	}
 
	while (currentDay<=lastDay) {
		newRow=targetId.insertRow(-1);
		for (var i=0; i<7; i++) {
			newCell=newRow.insertCell(-1);
			newCell.innerHTML="<p class=ShamsiDayNo>" + currentDay +  "</p><p dir=ltr class=GregorianDayNo>" +  ToGregorian(year,month,currentDay).split("-")[2];
			newCell.className="normalDay";
			if (holidays.substr(currentDay-1,1)=="x") newCell.className="Holiday";
			if (ToGregorian(year, month, currentDay)==strToday) newCell.className="Today";
			currentDay++;
			if (currentDay>lastDay) break;
		}
	}
	for (var i=newRow.cells.length; i<7; i++) newRow.insertCell(-1).innerHTML=" ";
 
	if (gregorianMonths != null) {
		gregorianMonths.getElementsByTagName('p')[0].innerHTML=calNames("ge",  ToGregorian (year,month,1).split("-")[1]-1)+" "+(ToGregorian  (year,month,1).split("-")[0])+" - "+calNames("ge", ToGregorian  (year,month,30).split("-")[1]-1)+" "+ToGregorian  (year,month,30).split("-")[0];
		gregorianMonths.getElementsByTagName('p')[1].innerHTML=calNames("gf",  ToGregorian (year,month,1).split("-")[1]-1)+" "+(ToGregorian  (year,month,1).split("-")[0])+" - "+calNames("gf", ToGregorian  (year,month,30).split("-")[1]-1)+" "+ToGregorian  (year,month,30).split("-")[0];
	}
}
 
function FillSelectWithMonthNames(targetId)
{
	for (var i=0; i<12; i++) {
		var mitem = document.createElement("OPTION");
		mitem.value=i+1;
		mitem.text=calNames("hf", i);
		targetId.options.add(mitem);
	}
}
 
function getHolidays(year, month)
{
	switch (year) {
		case 1380: return Array("xxxx56789x1xx4xxx890123x567890x",  "123456x890123x567890x234567x901", "x2xx567890x23xx67x9x1234x678901",  "x234567x901234x678901x345678x01", "1234x678901x345678x012345x78901",  "xx345678x012345x789012x456789x1", "12345x78x012x456789x12x456x890",  "123x56789xx234567x901234x67890", "1x345678x012345x789012x45x789x",  "123456x890123x56789xx234567x90", "1234x678901x345678x01x345x7890",  "12xx56789x1x3456x890123x5678x")[month-1];
		case 1381: return  Array("xxxxx678x01xx45x789012x456789x1",  "12345x789012x456789xx2x456x8901", "12x45678xx123xx6x890123x567890x",  "123456x890123x567890x234567x901", "123x567890x234567x90x234x678901",  "x234567x901234x678901x345678xx1", "1234x678901xx45678x012345x789x",  "12x456789x123456x890123x567890", "x234x67x901234x678901x345678x0",  "12345x78x012x456789x123456x890", "123x567890x234567x901xx4x67890",  "xx345678x012345x78901xx45678x")[month-1];
		case 1382: return  Array("xxxx567x901xx4x678901x345678x01",  "12x4x67890xx345678x012345x78x01", "1x345678x0123xxx789012x456789x1",  "12345x789012x456789x123456x8901", "12x456789xx23456x890123x567890x",  "123456x890123x5678x0x234567x901", "1x3x567890x234567x9x1234x67890",  "1x345678x012345x789012x4x6789x", "1234x6x890123x567890x234567xx0",  "1234x678901x345678x012345x7890", "12x456789x12x456x890xx3x567890",  "x234567x90xx34x678901x345678x")[month-1];
		case 1383: return  Array("xxxx56x8901xxx567890x234567x901",  "123x567890x234567x901234x678901", "x234567x90123xx678901x345678x01",  "1234x678901x345678x012345x78901", "1x345678x012345x789012x456789x1",  "12345x789012x456789x123456x8901", "12x456789x123456x890123x567890",  "x234567x901234x678901x345678x0", "12345x789012x456789x123456x890",  "123x567890x234567x901234x67890", "1x345678x012345x78901xx456789x",  "123456x890123x567890x234567xx0")[month-1];
	}
}
