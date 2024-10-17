import React, { useState, useEffect } from 'react';
import TableComponent from '../components/Table';
import ChartComponent from '../components/Chart';

const MainContainer = () => {
  const [data, setData] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({}); 
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseBenchmarks = await fetch('https://substantive.pythonanywhere.com/product_benchmarks', {
          headers: { 'auth-key': '590e3e17b6a26a8fcda726e2a91520e476e2c894' }
        });
        const benchmarks = await responseBenchmarks.json();
        // console.log('Benchmarks Data Structure:', benchmarks);

        const responseRates = await fetch('https://substantive.pythonanywhere.com/exchange_rates', {
          headers: { 'auth-key': '590e3e17b6a26a8fcda726e2a91520e476e2c894' }
        });
        const rates = await responseRates.json();
        // console.log('Exchange Rates Structure:', rates);

  
        setData(benchmarks.product_benchmarks);
        setExchangeRates(rates.exchange_rates);

        const calculatedTotals = calculateTotals(benchmarks.product_benchmarks, rates.exchange_rates);
        setTotals(calculatedTotals);

        const calculatedTrendData = calculateTrendData(benchmarks.product_benchmarks, rates.exchange_rates);
        setTrendData(calculatedTrendData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();

  }, []);

  // function to convert an amount to euros based on exchange rates and year
  function convertToEuros(amount, currencyId, toCurrencyId, exchangeRates, year) {
    for (let i = 0; i < exchangeRates.length; i++) {
      let rate = exchangeRates[i];
      console.log('Checking Rate:', rate);

      
      if (rate.from_currency_id === currencyId) {
        if (rate.to_currency_id === toCurrencyId) {
          if (rate.year === year) {
            // console.log(`Found Exchange Rate: ${rate.exchange_rate} for Year: ${year}`);
            return amount * rate.exchange_rate;
          }
        }
      }
    }
    console.log(`Converted Amount: ${amount}`);
    return amount;
  }


function initializeProvider(totals, providerName) {
  if (!(providerName in totals)) {
    totals[providerName] = { totalPayment: 0, totalBenchmark: 0 };
  }
}

// function to calculate total difference and status
function calculateDifferenceAndStatus(details) {
  const totalDifference = details.totalBenchmark - details.totalPayment;
  details.totalDifference = totalDifference;

  if (totalDifference > 0) {
    details.status = "Under Budget";
  } else {
    details.status = "Over Budget";
  }
}

//  function to calculate totals
function calculateTotals(data, exchangeRates, euroCurrencyId) {
  const totals = {};

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const year = new Date(item.end_date).getFullYear();
    const paymentInEuros = convertToEuros(item.payment, item.currency.id, euroCurrencyId, exchangeRates, year);
    const benchmarkInEuros = convertToEuros(item.benchmark, item.currency.id, euroCurrencyId, exchangeRates, year);

    initializeProvider(totals, item.provider_name);

    totals[item.provider_name].totalPayment += paymentInEuros;
    totals[item.provider_name].totalBenchmark += benchmarkInEuros;
  }

  for (let provider in totals) {
    if (totals.hasOwnProperty(provider)) {
      calculateDifferenceAndStatus(totals[provider]);
    }
  }

  return totals;
}


  // function to calculate trend data for each product
  function calculateTrendData(data, exchangeRates, euroCurrencyId) {
    const trendData = {}; 


    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const year = new Date(item.end_date).getFullYear(); 
      const paymentInEuros = convertToEuros(item.payment, item.currency.id, euroCurrencyId, exchangeRates, year); 

      if (!(item.product_name in trendData)) {
        trendData[item.product_name] = {};
      }

      if (!(year in trendData[item.product_name])) {
        trendData[item.product_name][year] = 0;
      }

      trendData[item.product_name][year] += paymentInEuros;
    }

    const result = [];
    for (let product in trendData) {
      if (trendData.hasOwnProperty(product)) {
        let yearsArray = [];
        for (let year in trendData[product]) {
          if (trendData[product].hasOwnProperty(year)) {
            yearsArray.push({
              year: Number(year),
              amount: trendData[product][year]
            });
          }
        }
        result.push({ product: product, years: yearsArray });
      }
    }

    return result; 
  }

  return (
    <>
      <nav>
        <h2 className='navbar__logo'>Substantive Research</h2>
      </nav>

      <main>
        {loading ? ( 
          <div>Loading...</div>
        ) : (
          <>
            <TableComponent
              data={data}
              exchangeRates={exchangeRates}
              convertToEuros={convertToEuros}
              totals={totals}
            />
            <ChartComponent trendData={trendData} />
          </>
        )}
      </main>
    </>
  );
};

export default MainContainer;
