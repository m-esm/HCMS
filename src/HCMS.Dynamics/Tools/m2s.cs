using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Dynamics.Tools
{

    public class shamsiDate
    {
        public int year { get; set; }
        public int day { get; set; }
        public int month { get; set; }

    }
    public class m2s
    {

        public static string miladi2shamsi(DateTime _date)
        {

            PersianCalendar pc = new PersianCalendar();

            StringBuilder sb = new StringBuilder();

            sb.Append(pc.GetYear(_date).ToString("0000"));

            sb.Append("/");

            sb.Append(pc.GetMonth(_date).ToString("00"));

            sb.Append("/");

            sb.Append(pc.GetDayOfMonth(_date).ToString("00"));

            return sb.ToString();

        }


        public static shamsiDate miladi2shamsiObject(DateTime _date)
        {
            var model = new shamsiDate();

            PersianCalendar pc = new PersianCalendar();

            StringBuilder sb = new StringBuilder();

            model.year = pc.GetYear(_date);
            model.month = pc.GetMonth(_date);
            model.day = pc.GetDayOfMonth(_date);

            return model;

        }

        public static string miladi2shamsiMahDarAkhar(DateTime _date)
        {

            PersianCalendar pc = new PersianCalendar();

            StringBuilder sb = new StringBuilder();

            sb.Append(pc.GetMonth(_date).ToString("00"));

            sb.Append("/");

            sb.Append(pc.GetDayOfMonth(_date).ToString("00"));

            sb.Append("/");

            sb.Append(pc.GetYear(_date).ToString("0000"));

            return sb.ToString();

        }

        public static DateTime ShamsiTogregorian(DateTime shamsi)
        {
            //PersianCalendar p = new PersianCalendar();
            //var year = int.Parse(shamsi.Split('/')[2]);
            //var mon = int.Parse(shamsi.Split('/')[1]);
            //var day = int.Parse(shamsi.Split('/')[0]);
            var year = shamsi.Year;
            var mon = shamsi.Month;
            var day = shamsi.Day;
            DateTime dt = new DateTime(year, mon, day, new PersianCalendar());
            return dt;
        }

      

        public string m2sMM(DateTime _date)
        {
            PersianCalendar pc = new PersianCalendar();
            StringBuilder sb = new StringBuilder();
            sb.Append(pc.GetDayOfMonth(_date).ToString("00"));
            sb.Append(' ');
            switch (pc.GetMonth(_date))
            {
                case 1:
                    sb.Append("فروردین");
                    break;
                case 2:
                    sb.Append("اردیبهشت");
                    break;
                case 3:
                    sb.Append("خرداد");
                    break;
                case 4:
                    sb.Append("تیر");
                    break;
                case 5:
                    sb.Append("مرداد");
                    break;
                case 6:
                    sb.Append("شهریور");
                    break;
                case 7:
                    sb.Append("مهر");
                    break;
                case 8:
                    sb.Append("آبان");
                    break;
                case 9:
                    sb.Append("آذر");
                    break;
                case 10:
                    sb.Append("دی");
                    break;
                case 11:
                    sb.Append("بهمن");
                    break;
                case 12:
                    sb.Append("اسفند");
                    break;
            }
            sb.Append(' ');
            sb.Append(pc.GetYear(_date).ToString("0000"));
            return sb.ToString();

        }

        public static string m2sJustMonthAndDay(DateTime _date)
        {
            PersianCalendar pc = new PersianCalendar();
            StringBuilder sb = new StringBuilder();
            sb.Append(pc.GetDayOfMonth(_date).ToString("00"));
            sb.Append(' ');
            switch (pc.GetMonth(_date))
            {
                case 1:
                    sb.Append("فروردین");
                    break;
                case 2:
                    sb.Append("اردیبهشت");
                    break;
                case 3:
                    sb.Append("خرداد");
                    break;
                case 4:
                    sb.Append("تیر");
                    break;
                case 5:
                    sb.Append("مرداد");
                    break;
                case 6:
                    sb.Append("شهریور");
                    break;
                case 7:
                    sb.Append("مهر");
                    break;
                case 8:
                    sb.Append("آبان");
                    break;
                case 9:
                    sb.Append("آذر");
                    break;
                case 10:
                    sb.Append("دی");
                    break;
                case 11:
                    sb.Append("بهمن");
                    break;
                case 12:
                    sb.Append("اسفند");
                    break;
            }

            return sb.ToString();

        }

        public static string m2sWithHours(DateTime _date)
        {
            PersianCalendar pc = new PersianCalendar();

            StringBuilder sb = new StringBuilder();

            sb.Append(pc.GetYear(_date).ToString("0000"));

            sb.Append("/");

            sb.Append(pc.GetMonth(_date).ToString("00"));

            sb.Append("/");

            sb.Append(pc.GetDayOfMonth(_date).ToString("00"));

            sb.Append(" ");

            sb.Append(pc.GetHour(_date) + ":" + pc.GetMinute(_date));

            return sb.ToString();
        }

        public static string m2sMMWithHours(DateTime _date)
        {
            PersianCalendar pc = new PersianCalendar();
            StringBuilder sb = new StringBuilder();
            sb.Append(pc.GetDayOfMonth(_date).ToString("00"));
            sb.Append(' ');
            switch (pc.GetMonth(_date))
            {
                case 1:
                    sb.Append("فروردین");
                    break;
                case 2:
                    sb.Append("اردیبهشت");
                    break;
                case 3:
                    sb.Append("خرداد");
                    break;
                case 4:
                    sb.Append("تیر");
                    break;
                case 5:
                    sb.Append("مرداد");
                    break;
                case 6:
                    sb.Append("شهریور");
                    break;
                case 7:
                    sb.Append("مهر");
                    break;
                case 8:
                    sb.Append("آبان");
                    break;
                case 9:
                    sb.Append("آذر");
                    break;
                case 10:
                    sb.Append("دی");
                    break;
                case 11:
                    sb.Append("بهمن");
                    break;
                case 12:
                    sb.Append("اسفند");
                    break;
            }
            sb.Append(' ');
            sb.Append(pc.GetYear(_date).ToString("0000"));
            sb.Append(" ساعت ");
            sb.Append(pc.GetHour(_date) + ":" + pc.GetMinute(_date));
            return sb.ToString();

        }

        public static string FamiliarDateTime(DateTime dt)
        {
            StringBuilder result = new StringBuilder();
            //difference

            TimeSpan dif = DateTime.Now - dt;

            bool past = true;

            if (dif.TotalDays < 0)
            {
                past = false;
                dif = dt - DateTime.Now;
            }

            if ((int)dif.TotalDays > 0)
            {
                result.Append((int)dif.TotalDays + " روز ");
            }

            if (result.ToString().Contains("روز"))
                result.Append(" و ");

            if ((int)dif.TotalHours > 0)
            {
                result.Append((int)dif.TotalHours - ((int)dif.TotalDays * 24) + " ساعت ");
            }
            else
            {
                if ((int)dif.TotalMinutes > 0)
                {
                    result.Append((int)dif.TotalMinutes + " دقیقه ");
                }
                else
                {
                    if ((int)dif.TotalSeconds > 0)
                    {
                        result.Append((int)dif.TotalSeconds + " ثانیه ");
                    }
                    else
                    {
                        result.Append((int)dif.TotalMilliseconds + " میلی ثانیه ");
                    }

                }
            }

            if (past)
            {
                result.Append(" پیش ");
            }
            else
            {
                result.Append(" دیگر ");

            }

            return result.ToString();

        }

    }
}
