using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using JobTest.Console.WebService;

namespace JobTest.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            CurrencyConvertorSoap soap = new CurrencyConvertorSoapClient("CurrencyConvertorSoap", "http://www.webservicex.net/currencyconvertor.asmx?WSDL");
            double value = soap.ConversionRate(Currency.EUR, Currency.USD);
            System.Console.WriteLine("1EUR = {0} USD", value);
            System.Console.Read();
        }
    }
}
