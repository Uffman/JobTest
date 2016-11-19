using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JobTest.WCF;

namespace WcfTest
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebServiceProxy.localhost.WebService s = new WebServiceProxy.localhost.WebService();

            s.Url = “http://foo/webservice.asmx”;

            Console.WriteLine(s.HelloWorld());

        }

    }
