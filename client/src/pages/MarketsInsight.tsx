import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TimeframeSelector from '@/components/dashboard/TimeframeSelector';
import CategoryTabs from '@/components/dashboard/CategoryTabs';
import LineChartCard from '@/components/dashboard/LineChartCard';
import BarChartCard from '@/components/dashboard/BarChartCard';
import HeatmapCard from '@/components/dashboard/HeatmapCard';
import GaugeCard from '@/components/dashboard/GaugeCard';
import {
  dashboardCategories,
  timeframes,
  yieldCurveData,
  inflationData,
  gdpNowData,
  unemploymentData,
  fedFundsData,
  marketIndicesData,
  sectorPerformanceData,
  optionsData,
  yieldCurveFullData,
  creditSpreadData,
  moveIndexData,
  volatilityData,
  volRiskPremiumData,
  vixTermStructureData,
  commoditiesData,
  oilInventoryData,
  liquidityData,
  fedBalanceSheetData,
  etfFlowsData,
  sentimentData,
  positioningData,
  fundFlowsData
} from '@/lib/dashboardData';

export default function MarketsInsight() {
  const { t } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [activeCategory, setActiveCategory] = useState('Macro');

  // Funzione per ottenere il colore in base al valore (per heatmap)
  const getHeatmapColor = (value: number) => {
    if (value > 2) return { bg: '#10B981', text: 'white' }; // Verde forte
    if (value > 0) return { bg: '#A7F3D0', text: '#065F46' }; // Verde chiaro
    if (value > -2) return { bg: '#FEE2E2', text: '#7F1D1D' }; // Rosso chiaro
    return { bg: '#F43F5E', text: 'white' }; // Rosso forte
  };

  // Formato percentuale per i valori
  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  // Rendering condizionale in base alla categoria selezionata
  const renderDashboardContent = () => {
    switch(activeCategory) {
      case 'Macro':
        return renderMacroSection();
      case 'Equity': 
        return renderEquitySection();
      case 'Bond Market':
        return renderBondMarketSection();
      case 'Volatility':
        return renderVolatilitySection();
      case 'Commodities':
        return renderCommoditiesSection();
      case 'Credit':
        return renderCreditSection();
      case 'Sentiment':
        return renderSentimentSection();
      case 'Liquidity':
        return renderLiquiditySection();
      default:
        return renderMacroSection();
    }
  };

  // Sezione Macro
  const renderMacroSection = () => {
    // Dati per il timeframe selezionato
    const curveData = yieldCurveData[selectedTimeframe as keyof typeof yieldCurveData];
    const inflation = inflationData[selectedTimeframe as keyof typeof inflationData];
    const gdp = gdpNowData[selectedTimeframe as keyof typeof gdpNowData];
    const unemployment = unemploymentData[selectedTimeframe as keyof typeof unemploymentData];
    
    // Previsioni del tasso FED
    const fedProbData = {
      labels: fedFundsData.probabilities.dates,
      datasets: [
        {
          label: t('Cut Probability'),
          data: fedFundsData.probabilities.cut.map(v => v * 100),
          backgroundColor: '#10B981', // Verde
        },
        {
          label: t('No Change Probability'),
          data: fedFundsData.probabilities.noChange.map(v => v * 100),
          backgroundColor: '#6B7280', // Grigio
        },
        {
          label: t('Hike Probability'),
          data: fedFundsData.probabilities.hike.map(v => v * 100),
          backgroundColor: '#F43F5E', // Rosso
        }
      ]
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Yield Curve */}
        <LineChartCard
          title={t('Yield Curve (2y-10y Spread)')}
          subtitle={t('Percentage points')}
          labels={curveData.dates}
          datasets={[
            {
              label: t('2y-10y Spread'),
              data: curveData.values,
              borderColor: '#0033A0',
              fill: true
            }
          ]}
        />

        {/* Inflation */}
        <LineChartCard
          title={t('Inflation')}
          subtitle={t('Year-over-year percentage change')}
          labels={inflation.dates}
          datasets={[
            {
              label: t('CPI'),
              data: inflation.cpi,
              borderColor: '#F43F5E'
            },
            {
              label: t('Core CPI'),
              data: inflation.coreCpi,
              borderColor: '#FFB020'
            }
          ]}
        />

        {/* GDP Now */}
        <LineChartCard
          title={t('GDP Growth')}
          subtitle={t('Quarterly estimates, annualized')}
          labels={gdp.dates}
          datasets={[
            {
              label: t('USA'),
              data: gdp.usa,
              borderColor: '#0033A0'
            },
            {
              label: t('Eurozone'),
              data: gdp.eu,
              borderColor: '#1D7AFC'
            }
          ]}
        />

        {/* Unemployment */}
        <LineChartCard
          title={t('Unemployment Rate')}
          subtitle={t('Percentage of labor force')}
          labels={unemployment.dates}
          datasets={[
            {
              label: t('Unemployment Rate'),
              data: unemployment.rate,
              borderColor: '#0033A0'
            }
          ]}
        />

        {/* Unemployment Claims */}
        <LineChartCard
          title={t('Initial Jobless Claims')}
          subtitle={t('Thousands, weekly data')}
          labels={unemployment.dates}
          datasets={[
            {
              label: t('Claims'),
              data: unemployment.claims,
              borderColor: '#F43F5E'
            }
          ]}
        />

        {/* Fed Funds Probabilities */}
        <BarChartCard
          title={t('Fed Funds Rate Probabilities')}
          subtitle={t('Market-implied probabilities for upcoming meetings')}
          labels={fedProbData.labels}
          datasets={fedProbData.datasets}
          height={250}
          showLegend={true}
        />

        {/* Current Fed Rate Gauge */}
        <GaugeCard
          title={t('Current Fed Funds Rate')}
          subtitle={t('Next meeting: ') + fedFundsData.current.nextMeeting}
          value={fedFundsData.current.rate}
          min={0}
          max={7}
          format={(value) => `${value.toFixed(2)}%`}
          colorRanges={[
            { from: 0, to: 2, color: '#10B981' }, // Verde (tassi bassi)
            { from: 2, to: 4, color: '#FFB020' }, // Giallo (tassi medi)
            { from: 4, to: 7, color: '#F43F5E' }, // Rosso (tassi alti)
          ]}
          label={t('Current Rate')}
        />

        {/* Cut Probability Gauge */}
        <GaugeCard
          title={t('Rate Cut Probability')}
          subtitle={t('Next Fed meeting')}
          value={fedFundsData.current.cutProb * 100}
          format={(value) => `${value.toFixed(0)}%`}
          colorRanges={[
            { from: 0, to: 33, color: '#F43F5E' }, // Rosso (bassa probabilità)
            { from: 33, to: 67, color: '#FFB020' }, // Giallo (media probabilità)
            { from: 67, to: 100, color: '#10B981' }, // Verde (alta probabilità)
          ]}
          label={t('Probability')}
        />

        {/* Hike Probability Gauge */}
        <GaugeCard
          title={t('Rate Hike Probability')}
          subtitle={t('Next Fed meeting')}
          value={fedFundsData.current.hikeProb * 100}
          format={(value) => `${value.toFixed(0)}%`}
          colorRanges={[
            { from: 0, to: 33, color: '#10B981' }, // Verde (bassa probabilità)
            { from: 33, to: 67, color: '#FFB020' }, // Giallo (media probabilità)
            { from: 67, to: 100, color: '#F43F5E' }, // Rosso (alta probabilità)
          ]}
          label={t('Probability')}
        />
      </div>
    );
  };

  // Sezione Equity
  const renderEquitySection = () => {
    const indices = marketIndicesData[selectedTimeframe as keyof typeof marketIndicesData];
    const options = optionsData[selectedTimeframe as keyof typeof optionsData];
    
    // Utilizzo i dati settimanali per il performance sector
    const sectorData = sectorPerformanceData.weekly;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* S&P 500 */}
        <LineChartCard
          title="S&P 500"
          subtitle={t('Index value')}
          labels={indices.dates}
          datasets={[
            {
              label: "S&P 500",
              data: indices.sp500,
              borderColor: '#0033A0'
            }
          ]}
        />

        {/* NASDAQ */}
        <LineChartCard
          title="NASDAQ"
          subtitle={t('Index value')}
          labels={indices.dates}
          datasets={[
            {
              label: "NASDAQ",
              data: indices.nasdaq,
              borderColor: '#1D7AFC'
            }
          ]}
        />

        {/* EUROSTOXX */}
        <LineChartCard
          title="EUROSTOXX"
          subtitle={t('Index value')}
          labels={indices.dates}
          datasets={[
            {
              label: "EUROSTOXX",
              data: indices.eurostoxx,
              borderColor: '#4C9AFF'
            }
          ]}
        />

        {/* P/E Ratios */}
        <LineChartCard
          title={t('P/E Ratios')}
          subtitle={t('Price-to-earnings')}
          labels={indices.dates}
          datasets={[
            {
              label: "S&P 500 P/E",
              data: indices.pe.sp500,
              borderColor: '#0033A0'
            },
            {
              label: "NASDAQ P/E",
              data: indices.pe.nasdaq,
              borderColor: '#1D7AFC'
            },
            {
              label: "EUROSTOXX P/E",
              data: indices.pe.eurostoxx,
              borderColor: '#4C9AFF'
            }
          ]}
        />

        {/* Put/Call Ratio */}
        <LineChartCard
          title={t('Put/Call Ratio')}
          subtitle={t('Market sentiment indicator')}
          labels={options.dates}
          datasets={[
            {
              label: t('Put/Call Ratio'),
              data: options.putCallRatio,
              borderColor: '#F43F5E'
            }
          ]}
        />

        {/* Short Interest */}
        <LineChartCard
          title={t('Short Interest')}
          subtitle={t('Percentage of float')}
          labels={options.dates}
          datasets={[
            {
              label: t('Short Interest'),
              data: options.shortInterest,
              borderColor: '#FFB020'
            }
          ]}
        />

        {/* Sector Performance */}
        <HeatmapCard
          title={t('Sector Performance')}
          subtitle={t('Weekly change percentage')}
          items={sectorData}
          getColorForValue={getHeatmapColor}
          format={formatPercent}
          fullWidth={true}
        />
      </div>
    );
  };

  // Altre sezioni (renderizzazione base, mantenendo la stessa struttura di 9 riquadri per ogni categoria)
  const renderBondMarketSection = () => {
    // Ottieni i dati del credito e della volatilità obbligazionaria per il timeframe selezionato
    const creditData = creditSpreadData[selectedTimeframe as keyof typeof creditSpreadData];
    const moveData = moveIndexData[selectedTimeframe as keyof typeof moveIndexData];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Yield Curve */}
        <LineChartCard 
          title={t('Yield Curve')}
          subtitle={t('Maturity spectrum')}
          labels={yieldCurveFullData.current.maturities}
          datasets={[{
            label: t('Current Yields'),
            data: yieldCurveFullData.current.yields,
            borderColor: '#0033A0'
          },{
            label: t('Previous Month'),
            data: yieldCurveFullData.previousMonth.yields,
            borderColor: '#1D7AFC'
          },{
            label: t('Previous Year'),
            data: yieldCurveFullData.previousYear.yields,
            borderColor: '#4C9AFF'
          }]}
        />

        {/* IG Credit Spreads */}
        <LineChartCard 
          title={t('Investment Grade Credit Spreads')}
          subtitle={t('Percentage')}
          labels={creditData.dates}
          datasets={[{
            label: t('IG Spreads'),
            data: creditData.ig,
            borderColor: '#0033A0'
          }]}
        />

        {/* HY Credit Spreads */}
        <LineChartCard 
          title={t('High Yield Credit Spreads')}
          subtitle={t('Percentage')}
          labels={creditData.dates}
          datasets={[{
            label: t('HY Spreads'),
            data: creditData.hy,
            borderColor: '#F43F5E'
          }]}
        />

        {/* iTraxx */}
        <LineChartCard 
          title={t('iTraxx Europe')}
          subtitle={t('Basis points')}
          labels={creditData.dates}
          datasets={[{
            label: t('iTraxx Europe'),
            data: creditData.itraxx,
            borderColor: '#1D7AFC'
          }]}
        />

        {/* US & EU Spread Comparison */}
        <LineChartCard 
          title={t('US vs EU Credit Spreads')}
          subtitle={t('Percentage')}
          labels={creditData.dates}
          datasets={[{
            label: t('US IG'),
            data: creditData.ig,
            borderColor: '#0033A0'
          },{
            label: t('EU IG (iTraxx/100)'),
            data: creditData.itraxx.map(x => x/100),
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Global 10Y Yields */}
        <LineChartCard 
          title={t('Global 10Y Yields')}
          subtitle={t('Percentage')}
          labels={creditData.dates}
          datasets={[{
            label: t('US'),
            data: creditData.dates.map(() => 4.24 + Math.random() * 0.1 - 0.05),
            borderColor: '#0033A0'
          },{
            label: t('Germany'),
            data: creditData.dates.map(() => 2.40 + Math.random() * 0.1 - 0.05),
            borderColor: '#10B981'
          },{
            label: t('Japan'),
            data: creditData.dates.map(() => 1.02 + Math.random() * 0.1 - 0.05),
            borderColor: '#F43F5E'
          }]}
        />

        {/* Bond Volatility */}
        <BarChartCard 
          title={t('Bond Volatility (MOVE)')}
          subtitle={t('Index value')}
          labels={moveData.dates}
          datasets={[{
            label: t('MOVE Index'),
            data: moveData.values,
            backgroundColor: '#0033A0'
          }]}
        />

        {/* Term Premium */}
        <LineChartCard 
          title={t('Term Premium')}
          subtitle={t('Percentage')}
          labels={creditData.dates}
          datasets={[{
            label: t('10Y Term Premium'),
            data: creditData.dates.map(() => 0.15 + Math.random() * 0.05 - 0.025),
            borderColor: '#0033A0'
          }]}
        />

        {/* Bond Returns */}
        <HeatmapCard
          title={t('Bond Market Returns')}
          subtitle={t(`${selectedTimeframe} Performance`)}
          items={[
            { name: 'Treasury 1-3Y', change: 0.8 },
            { name: 'Treasury 7-10Y', change: -1.2 },
            { name: 'Treasury 20Y+', change: -3.5 },
            { name: 'TIPS', change: 0.4 },
            { name: 'Agency MBS', change: -0.9 },
            { name: 'IG Corporate', change: -0.5 },
            { name: 'HY Corporate', change: 1.2 },
            { name: 'EM $ Bonds', change: 0.3 }
          ]}
          getColorForValue={getHeatmapColor}
          format={formatPercent}
        />
      </div>
    );
  };

  const renderVolatilitySection = () => {
    // Ottieni i dati della volatilità per il timeframe selezionato
    const volData = volatilityData[selectedTimeframe as keyof typeof volatilityData];
    const volRiskPremium = volRiskPremiumData[selectedTimeframe as keyof typeof volRiskPremiumData];
    const vixTermStructure = vixTermStructureData;
    
    // Funzione per ottenere il colore in base al valore (per heatmap di volatilità)
    const getVolHeatmapColor = (value: number) => {
      if (value > 25) return { bg: '#F43F5E', text: 'white' }; // Rosso forte (alta volatilità)
      if (value > 15) return { bg: '#FEE2E2', text: '#7F1D1D' }; // Rosso chiaro
      if (value > 10) return { bg: '#FFF7AE', text: '#854D0E' }; // Giallo
      return { bg: '#D1FAE5', text: '#065F46' }; // Verde chiaro (bassa volatilità)
    };
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* VIX Index */}
        <LineChartCard 
          title={t('VIX Index')}
          subtitle={t('Implied volatility, percentage')}
          labels={volData.dates}
          datasets={[{
            label: t('VIX'),
            data: volData.vix,
            borderColor: '#F43F5E'
          }]}
        />

        {/* VIX Term Structure */}
        <LineChartCard 
          title={t('VIX Term Structure')}
          subtitle={t('By maturity, percentage')}
          labels={['1M', '2M', '3M', '4M', '5M', '6M']}
          datasets={[{
            label: t('Current'),
            data: [13, 14, 15, 16, 17, 18],
            borderColor: '#F43F5E'
          },{
            label: t('Previous Month'),
            data: [15, 16, 17, 18, 19, 20],
            borderColor: '#6B7280'
          }]}
        />

        {/* Volatility Risk Premium */}
        <LineChartCard 
          title={t('Volatility Risk Premium')}
          subtitle={t('VIX - Realized Vol, percentage points')}
          labels={sampleDates}
          datasets={[{
            label: t('Vol Premium'),
            data: [4.5, 4.3, 3.8, 3.2, 2.8, 2.5],
            borderColor: '#F43F5E'
          }]}
        />

        {/* S&P 500 Realized Volatility */}
        <LineChartCard 
          title={t('S&P 500 Realized Volatility')}
          subtitle={t('10, 30, 60-day, percentage')}
          labels={sampleDates}
          datasets={[{
            label: t('10-day'),
            data: [9, 11, 10, 8, 8, 7],
            borderColor: '#F43F5E'
          },{
            label: t('30-day'),
            data: [11, 12, 11, 10, 9, 8],
            borderColor: '#FFB020'
          },{
            label: t('60-day'),
            data: [13, 13, 12, 11, 10, 9],
            borderColor: '#0033A0'
          }]}
        />

        {/* SKEW Index */}
        <LineChartCard 
          title={t('SKEW Index')}
          subtitle={t('Tail risk indicator')}
          labels={sampleDates}
          datasets={[{
            label: t('SKEW'),
            data: [125, 130, 135, 140, 138, 135],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Equity Put/Call Ratio */}
        <LineChartCard 
          title={t('Equity Put/Call Ratio')}
          subtitle={t('Options market sentiment')}
          labels={sampleDates}
          datasets={[{
            label: t('Put/Call Ratio'),
            data: [0.85, 0.90, 0.95, 0.93, 0.90, 0.88],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Cross-Asset Volatility */}
        <BarChartCard 
          title={t('Cross-Asset Volatility')}
          subtitle={t('1-month realized, percentage')}
          labels={[t('Equity'), t('Rates'), t('FX'), t('Credit'), t('Commodities')]}
          datasets={[{
            label: t('Current'),
            data: [10, 7, 6, 8, 12],
            backgroundColor: '#0033A0'
          },{
            label: t('1Y Average'),
            data: [15, 10, 8, 12, 18],
            backgroundColor: '#6B7280'
          }]}
        />

        {/* Volatility of Volatility */}
        <LineChartCard 
          title={t('Volatility of Volatility')}
          subtitle={t('VVIX Index')}
          labels={sampleDates}
          datasets={[{
            label: t('VVIX'),
            data: [95, 100, 110, 105, 100, 95],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Vol Regimes Probability */}
        <GaugeCard
          title={t('Current Vol Regime')}
          subtitle={t('Market phase identification')}
          value={70}
          min={0}
          max={100}
          format={(value) => `${value}%`}
          colorRanges={[
            { from: 0, to: 33, color: '#F43F5E' }, // Alta volatilità
            { from: 33, to: 67, color: '#FFB020' }, // Media volatilità
            { from: 67, to: 100, color: '#10B981' }, // Bassa volatilità
          ]}
          label={t('Low Volatility Regime')}
        />
      </div>
    );
  };

  const renderCommoditiesSection = () => {
    const sampleDates = ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-05-15'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Crude Oil */}
        <LineChartCard 
          title={t('Crude Oil (WTI)')}
          subtitle={t('USD per barrel')}
          labels={sampleDates}
          datasets={[{
            label: t('WTI Crude'),
            data: [75, 78, 82, 80, 78, 77],
            borderColor: '#0033A0'
          }]}
        />

        {/* Natural Gas */}
        <LineChartCard 
          title={t('Natural Gas')}
          subtitle={t('USD per MMBtu')}
          labels={sampleDates}
          datasets={[{
            label: t('Natural Gas'),
            data: [2.8, 2.7, 2.5, 2.6, 2.7, 2.8],
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Gold */}
        <LineChartCard 
          title={t('Gold')}
          subtitle={t('USD per troy ounce')}
          labels={sampleDates}
          datasets={[{
            label: t('Gold'),
            data: [2100, 2150, 2200, 2250, 2300, 2350],
            borderColor: '#FFB020'
          }]}
        />

        {/* Silver */}
        <LineChartCard 
          title={t('Silver')}
          subtitle={t('USD per troy ounce')}
          labels={sampleDates}
          datasets={[{
            label: t('Silver'),
            data: [27, 28, 29, 30, 31, 32],
            borderColor: '#6B7280'
          }]}
        />

        {/* Copper */}
        <LineChartCard 
          title={t('Copper')}
          subtitle={t('USD per pound')}
          labels={sampleDates}
          datasets={[{
            label: t('Copper'),
            data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Agricultural Index */}
        <LineChartCard 
          title={t('Agricultural Index')}
          subtitle={t('Price index')}
          labels={sampleDates}
          datasets={[{
            label: t('Ag Index'),
            data: [120, 122, 125, 127, 126, 128],
            borderColor: '#10B981'
          }]}
        />

        {/* Oil Inventories */}
        <BarChartCard 
          title={t('US Oil Inventories')}
          subtitle={t('Millions of barrels')}
          labels={sampleDates}
          datasets={[{
            label: t('Crude Inventories'),
            data: [420, 415, 410, 405, 400, 395],
            backgroundColor: '#0033A0'
          }]}
        />

        {/* Gold/Oil Ratio */}
        <LineChartCard 
          title={t('Gold/Oil Ratio')}
          subtitle={t('Ounces per barrel')}
          labels={sampleDates}
          datasets={[{
            label: t('Gold/Oil Ratio'),
            data: [28, 27.5, 26.8, 28.1, 29.5, 30.5],
            borderColor: '#FFB020'
          }]}
        />

        {/* Commodity Returns */}
        <HeatmapCard
          title={t('Commodity YTD Returns')}
          subtitle={t('Percentage change')}
          items={[
            { name: 'WTI Crude', change: -5.2 },
            { name: 'Brent Crude', change: -4.8 },
            { name: 'Natural Gas', change: -12.5 },
            { name: 'Gold', change: 15.3 },
            { name: 'Silver', change: 18.6 },
            { name: 'Copper', change: 8.4 },
            { name: 'Aluminum', change: 3.2 },
            { name: 'Wheat', change: -2.5 },
            { name: 'Corn', change: -7.3 }
          ]}
          getColorForValue={getHeatmapColor}
          format={formatPercent}
        />
      </div>
    );
  };

  const renderCreditSection = () => {
    const sampleDates = ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-05-15'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Investment Grade Spreads */}
        <LineChartCard 
          title={t('Investment Grade Spreads')}
          subtitle={t('Percentage points')}
          labels={sampleDates}
          datasets={[{
            label: t('US IG Spread'),
            data: [1.1, 1.08, 1.06, 1.07, 1.09, 1.10],
            borderColor: '#0033A0'
          }]}
        />

        {/* High Yield Spreads */}
        <LineChartCard 
          title={t('High Yield Spreads')}
          subtitle={t('Percentage points')}
          labels={sampleDates}
          datasets={[{
            label: t('US HY Spread'),
            data: [3.8, 3.75, 3.7, 3.85, 4.0, 4.15],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Credit Default Swaps */}
        <LineChartCard 
          title={t('Credit Default Swaps')}
          subtitle={t('iTraxx Europe, basis points')}
          labels={sampleDates}
          datasets={[{
            label: t('iTraxx Europe'),
            data: [70, 68, 65, 67, 70, 73],
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Credit Ratings Migration */}
        <BarChartCard 
          title={t('Credit Ratings Migration')}
          subtitle={t('Net upgrades/downgrades')}
          labels={sampleDates}
          datasets={[{
            label: t('Net Changes'),
            data: [5, 8, 3, -2, -5, -3],
            backgroundColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value >= 0 ? '#10B981' : '#F43F5E';
            }
          }]}
        />

        {/* Corporate Default Rate */}
        <LineChartCard 
          title={t('Corporate Default Rate')}
          subtitle={t('Percentage')}
          labels={sampleDates}
          datasets={[{
            label: t('Default Rate'),
            data: [2.0, 2.1, 2.15, 2.2, 2.25, 2.3],
            borderColor: '#F43F5E'
          }]}
        />

        {/* IG vs Treasury Spreads */}
        <LineChartCard 
          title={t('IG vs Treasury Spreads')}
          subtitle={t('By rating, percentage points')}
          labels={sampleDates}
          datasets={[{
            label: t('AAA'),
            data: [0.4, 0.4, 0.41, 0.42, 0.43, 0.44],
            borderColor: '#10B981'
          },{
            label: t('AA'),
            data: [0.6, 0.61, 0.62, 0.63, 0.64, 0.65],
            borderColor: '#1D7AFC'
          },{
            label: t('A'),
            data: [0.9, 0.91, 0.92, 0.93, 0.94, 0.95],
            borderColor: '#FFB020'
          },{
            label: t('BBB'),
            data: [1.4, 1.42, 1.44, 1.46, 1.48, 1.50],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Credit Risk Premium */}
        <LineChartCard 
          title={t('Credit Risk Premium')}
          subtitle={t('Decomposition, percentage points')}
          labels={sampleDates}
          datasets={[{
            label: t('Default Risk'),
            data: [0.8, 0.82, 0.84, 0.85, 0.86, 0.87],
            borderColor: '#F43F5E'
          },{
            label: t('Liquidity Premium'),
            data: [0.3, 0.28, 0.26, 0.25, 0.24, 0.23],
            borderColor: '#FFB020'
          }]}
        />

        {/* EM vs DM Credit */}
        <LineChartCard 
          title={t('EM vs DM Credit Spreads')}
          subtitle={t('Percentage points')}
          labels={sampleDates}
          datasets={[{
            label: t('EM'),
            data: [3.2, 3.3, 3.4, 3.45, 3.5, 3.55],
            borderColor: '#F43F5E'
          },{
            label: t('DM'),
            data: [1.1, 1.08, 1.06, 1.07, 1.09, 1.10],
            borderColor: '#0033A0'
          }]}
        />

        {/* Sector Credit Spreads */}
        <HeatmapCard
          title={t('Sector Credit Spreads')}
          subtitle={t('Current levels')}
          items={[
            { name: 'Financial', change: 1.05 },
            { name: 'Energy', change: 1.45 },
            { name: 'Technology', change: 0.95 },
            { name: 'Healthcare', change: 0.85 },
            { name: 'Consumer', change: 1.10 },
            { name: 'Utilities', change: 1.25 },
            { name: 'Industrials', change: 1.15 },
            { name: 'Materials', change: 1.30 }
          ]}
          getColorForValue={(val) => {
            if (val < 1.0) return { bg: '#10B981', text: 'white' };
            if (val < 1.2) return { bg: '#A7F3D0', text: '#065F46' };
            if (val < 1.4) return { bg: '#FEE2E2', text: '#7F1D1D' };
            return { bg: '#F43F5E', text: 'white' };
          }}
          format={(val) => `${val.toFixed(2)}%`}
        />
      </div>
    );
  };

  const renderSentimentSection = () => {
    const sampleDates = ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-05-15'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* AAII Bull/Bear Ratio */}
        <LineChartCard 
          title={t('AAII Bull/Bear Ratio')}
          subtitle={t('Investor sentiment')}
          labels={sampleDates}
          datasets={[{
            label: t('Bull/Bear Ratio'),
            data: [1.5, 1.7, 1.9, 2.1, 2.0, 1.8],
            borderColor: '#10B981'
          }]}
        />

        {/* Investor Positioning */}
        <BarChartCard 
          title={t('Investor Positioning')}
          subtitle={t('Net non-commercial futures')}
          labels={[t('Equities'), t('Bonds'), t('USD'), t('Gold'), t('Oil')]}
          datasets={[{
            label: t('Net Positioning'),
            data: [25, -15, 10, 30, -5],
            backgroundColor: (context) => {
              const value = context.dataset.data[context.dataIndex];
              return value >= 0 ? '#10B981' : '#F43F5E';
            }
          }]}
        />

        {/* Fund Flows */}
        <LineChartCard 
          title={t('Fund Flows')}
          subtitle={t('Billions USD, 4-week moving avg')}
          labels={sampleDates}
          datasets={[{
            label: t('Equity Funds'),
            data: [3.5, 4.2, 2.8, 1.5, 0.8, 1.2],
            borderColor: '#0033A0'
          },{
            label: t('Bond Funds'),
            data: [5.2, 4.8, 5.5, 6.2, 5.8, 5.5],
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Economic Surprise Index */}
        <LineChartCard 
          title={t('Economic Surprise Index')}
          subtitle={t('Citi ESI')}
          labels={sampleDates}
          datasets={[{
            label: t('US'),
            data: [15, 10, 5, -5, -10, -5],
            borderColor: '#0033A0'
          },{
            label: t('Eurozone'),
            data: [-5, -10, -15, -10, -5, 0],
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Risk Appetite Index */}
        <LineChartCard 
          title={t('Risk Appetite Index')}
          subtitle={t('Proprietary metric')}
          labels={sampleDates}
          datasets={[{
            label: t('Risk Appetite'),
            data: [65, 68, 72, 75, 73, 70],
            borderColor: '#FFB020'
          }]}
        />

        {/* Put/Call Ratio */}
        <LineChartCard 
          title={t('Put/Call Ratio')}
          subtitle={t('Options sentiment')}
          labels={sampleDates}
          datasets={[{
            label: t('Put/Call'),
            data: [0.85, 0.88, 0.95, 0.92, 0.90, 0.87],
            borderColor: '#F43F5E'
          }]}
        />

        {/* CNN Fear & Greed */}
        <GaugeCard
          title={t('CNN Fear & Greed Index')}
          subtitle={t('Current market sentiment')}
          value={65}
          min={0}
          max={100}
          format={(value) => `${value}`}
          colorRanges={[
            { from: 0, to: 25, color: '#F43F5E' }, // Extreme Fear
            { from: 25, to: 45, color: '#FEE2E2' }, // Fear
            { from: 45, to: 55, color: '#FFB020' }, // Neutral
            { from: 55, to: 75, color: '#A7F3D0' }, // Greed
            { from: 75, to: 100, color: '#10B981' }, // Extreme Greed
          ]}
          label={t('Greed')}
        />

        {/* Short Interest */}
        <LineChartCard 
          title={t('Short Interest')}
          subtitle={t('Percentage of float')}
          labels={sampleDates}
          datasets={[{
            label: t('S&P 500'),
            data: [3.2, 3.3, 3.4, 3.5, 3.4, 3.3],
            borderColor: '#0033A0'
          },{
            label: t('Russell 2000'),
            data: [5.8, 5.9, 6.0, 6.1, 6.0, 5.9],
            borderColor: '#F43F5E'
          }]}
        />

        {/* Sentiment Indicators */}
        <HeatmapCard
          title={t('Sentiment Indicators')}
          subtitle={t('Current levels, percentile')}
          items={[
            { name: 'AAII Bulls', change: 65 },
            { name: 'AAII Bears', change: 35 },
            { name: 'Inst. Sentiment', change: 72 },
            { name: 'Retail Flows', change: 58 },
            { name: 'Media Sentiment', change: 62 },
            { name: 'Options Skew', change: 45 },
            { name: 'Volatility Term', change: 40 },
            { name: 'Short Interest', change: 30 }
          ]}
          getColorForValue={(val) => {
            if (val > 70) return { bg: '#10B981', text: 'white' }; // Bullish
            if (val > 50) return { bg: '#A7F3D0', text: '#065F46' }; // Somewhat bullish
            if (val > 30) return { bg: '#FEE2E2', text: '#7F1D1D' }; // Somewhat bearish
            return { bg: '#F43F5E', text: 'white' }; // Bearish
          }}
          format={(val) => `${val}%`}
        />
      </div>
    );
  };

  const renderLiquiditySection = () => {
    const sampleDates = ['2025-01-01', '2025-02-01', '2025-03-01', '2025-04-01', '2025-05-01', '2025-05-15'];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Fed Balance Sheet */}
        <LineChartCard 
          title={t('Fed Balance Sheet')}
          subtitle={t('Trillions USD')}
          labels={sampleDates}
          datasets={[{
            label: t('Total Assets'),
            data: [7.50, 7.48, 7.45, 7.42, 7.40, 7.38],
            borderColor: '#0033A0'
          }]}
        />

        {/* ECB Balance Sheet */}
        <LineChartCard 
          title={t('ECB Balance Sheet')}
          subtitle={t('Trillions EUR')}
          labels={sampleDates}
          datasets={[{
            label: t('Total Assets'),
            data: [6.8, 6.78, 6.76, 6.74, 6.72, 6.70],
            borderColor: '#1D7AFC'
          }]}
        />

        {/* M2 Money Supply */}
        <LineChartCard 
          title={t('M2 Money Supply')}
          subtitle={t('YoY change, percentage')}
          labels={sampleDates}
          datasets={[{
            label: t('US M2'),
            data: [2.5, 2.3, 2.1, 2.0, 1.8, 1.7],
            borderColor: '#0033A0'
          },{
            label: t('EU M2'),
            data: [3.2, 3.0, 2.8, 2.6, 2.5, 2.4],
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Reverse Repo */}
        <LineChartCard 
          title={t('Fed Reverse Repo')}
          subtitle={t('Billions USD')}
          labels={sampleDates}
          datasets={[{
            label: t('Reverse Repo'),
            data: [280, 260, 240, 220, 200, 180],
            borderColor: '#0033A0'
          }]}
        />

        {/* Banking Reserves */}
        <LineChartCard 
          title={t('Banking Reserves')}
          subtitle={t('Billions USD')}
          labels={sampleDates}
          datasets={[{
            label: t('Reserves'),
            data: [3200, 3180, 3160, 3140, 3120, 3100],
            borderColor: '#0033A0'
          }]}
        />

        {/* Treasury Issuance */}
        <BarChartCard 
          title={t('Treasury Issuance')}
          subtitle={t('Billions USD, monthly')}
          labels={['Dec-24', 'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25']}
          datasets={[{
            label: t('Issuance'),
            data: [320, 340, 330, 350, 360, 370],
            backgroundColor: '#0033A0'
          }]}
        />

        {/* Liquidity Conditions */}
        <LineChartCard 
          title={t('Liquidity Conditions')}
          subtitle={t('Index, 100=neutral')}
          labels={sampleDates}
          datasets={[{
            label: t('Liquidity Index'),
            data: [95, 94, 93, 92, 91, 90],
            borderColor: '#F43F5E'
          }]}
        />

        {/* ETF Flows */}
        <BarChartCard 
          title={t('ETF Flows')}
          subtitle={t('Billions USD, weekly')}
          labels={sampleDates}
          datasets={[{
            label: t('Equity ETFs'),
            data: [3.5, 2.8, 2.1, 1.5, 0.8, 1.2],
            backgroundColor: '#0033A0'
          },{
            label: t('Bond ETFs'),
            data: [2.2, 2.5, 2.8, 3.0, 3.2, 3.0],
            backgroundColor: '#1D7AFC'
          }]}
        />

        {/* Market Liquidity */}
        <HeatmapCard
          title={t('Market Liquidity')}
          subtitle={t('By asset class, Z-score')}
          items={[
            { name: 'US Treasuries', change: 0.8 },
            { name: 'IG Credit', change: 0.3 },
            { name: 'HY Credit', change: -0.5 },
            { name: 'EM Bonds', change: -0.8 },
            { name: 'Large Cap Eq', change: 1.0 },
            { name: 'Small Cap Eq', change: -0.2 },
            { name: 'FX', change: 0.5 },
            { name: 'Commodities', change: -0.4 }
          ]}
          getColorForValue={(val) => {
            if (val > 0.5) return { bg: '#10B981', text: 'white' }; // Alta liquidità
            if (val > -0.5) return { bg: '#A7F3D0', text: '#065F46' }; // Liquidità normale
            if (val > -1.5) return { bg: '#FEE2E2', text: '#7F1D1D' }; // Bassa liquidità
            return { bg: '#F43F5E', text: 'white' }; // Liquidità molto bassa
          }}
          format={(val) => val.toFixed(1)}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">{t('Markets Insight')}</h1>
      
      {/* Selettore di timeframe globale */}
      <TimeframeSelector 
        selectedTimeframe={selectedTimeframe}
        onTimeframeChange={setSelectedTimeframe}
      />
      
      {/* Tabs per le categorie della dashboard */}
      <CategoryTabs 
        categories={dashboardCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      {/* Contenuto della dashboard */}
      {renderDashboardContent()}
    </div>
  );
}