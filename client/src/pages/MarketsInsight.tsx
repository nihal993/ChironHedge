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

  // Bond Market Section con dati dinamici basati sul timeframe
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

  // Volatility Section con dati dinamici
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
    
    // Prepara dati aggiuntivi per la visualizzazione
    const realizedVol = volData.dates.map((_, i) => Math.max(5, volData.vix[i] - 2 - Math.random() * 3));
    const putCallRatio = volData.dates.map(() => 0.85 + Math.random() * 0.3);
    const currentRegime = 35; // Valore medio (regime di volatilità normale)
    
    // Asset class volatility
    const assetClassVolatility = [
      { name: 'US Equities', change: 14 },
      { name: 'EU Equities', change: 18 },
      { name: 'EM Equities', change: 23 },
      { name: 'US Treasuries', change: 6 },
      { name: 'Corporate Bonds', change: 8 },
      { name: 'Currencies', change: 10 },
      { name: 'Commodities', change: 22 },
      { name: 'Crypto', change: 45 }
    ];
    
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
          subtitle={t('Curve comparison')}
          labels={vixTermStructure.current.months}
          datasets={[{
            label: t('Current'),
            data: vixTermStructure.current.values,
            borderColor: '#F43F5E'
          },{
            label: t('Previous Month'),
            data: vixTermStructure.previousMonth.values,
            borderColor: '#FFB020'
          },{
            label: t('Previous Year'),
            data: vixTermStructure.previousYear.values,
            borderColor: '#10B981'
          }]}
        />

        {/* Volatility Risk Premium */}
        <LineChartCard 
          title={t('Volatility Risk Premium')}
          subtitle={t('VIX - Realized volatility')}
          labels={volRiskPremium.dates}
          datasets={[{
            label: t('Risk Premium'),
            data: volRiskPremium.premium,
            borderColor: '#0033A0'
          }]}
        />

        {/* VVIX Index */}
        <LineChartCard 
          title={t('VVIX Index')}
          subtitle={t('Volatility of VIX')}
          labels={volData.dates}
          datasets={[{
            label: t('VVIX'),
            data: volData.vvix,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Skew */}
        <LineChartCard 
          title={t('SKEW Index')}
          subtitle={t('Tail risk indicator')}
          labels={volData.dates}
          datasets={[{
            label: t('SKEW'),
            data: volData.skew,
            borderColor: '#FFB020'
          }]}
        />

        {/* Implied vs Realized Vol */}
        <LineChartCard 
          title={t('Implied vs Realized Volatility')}
          subtitle={t('S&P 500, percentage')}
          labels={volData.dates}
          datasets={[{
            label: t('Implied (VIX)'),
            data: volData.vix,
            borderColor: '#F43F5E'
          },{
            label: t('Realized (20D)'),
            data: realizedVol,
            borderColor: '#0033A0'
          }]}
        />

        {/* Put/Call Ratio */}
        <LineChartCard 
          title={t('CBOE Put/Call Ratio')}
          subtitle={t('Options market sentiment')}
          labels={volData.dates}
          datasets={[{
            label: t('P/C Ratio'),
            data: putCallRatio,
            borderColor: '#FFB020'
          }]}
        />

        {/* Vol Regime */}
        <GaugeCard
          title={t('Volatility Regime')}
          subtitle={t('Current market conditions')}
          value={currentRegime}
          min={0}
          max={100}
          format={(value) => 
            value < 33 ? t('Low Vol') : 
            value < 67 ? t('Normal Vol') : 
            t('High Vol')}
          colorRanges={[
            { from: 0, to: 33, color: '#10B981' }, // Verde (volatilità bassa)
            { from: 33, to: 67, color: '#FFB020' }, // Giallo (volatilità normale)
            { from: 67, to: 100, color: '#F43F5E' }, // Rosso (volatilità alta)
          ]}
          label={t('Current Level')}
        />

        {/* Vol by Asset Class */}
        <HeatmapCard
          title={t('Volatility by Asset Class')}
          subtitle={t(`${selectedTimeframe} implied volatility levels`)}
          items={assetClassVolatility}
          getColorForValue={getVolHeatmapColor}
          format={(value) => `${value}%`}
        />
      </div>
    );
  };

  // Commodities Section con dati dinamici
  const renderCommoditiesSection = () => {
    const commoData = commoditiesData[selectedTimeframe as keyof typeof commoditiesData];
    const oilData = oilInventoryData[selectedTimeframe as keyof typeof oilInventoryData];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Crude Oil */}
        <LineChartCard 
          title={t('Crude Oil Prices')}
          subtitle={t('USD per barrel')}
          labels={commoData.dates}
          datasets={[{
            label: t('WTI'),
            data: commoData.wti,
            borderColor: '#0033A0'
          },{
            label: t('Brent'),
            data: commoData.brent,
            borderColor: '#1D7AFC'
          }]}
        />

        {/* Natural Gas */}
        <LineChartCard 
          title={t('Natural Gas')}
          subtitle={t('USD per MMBtu')}
          labels={commoData.dates}
          datasets={[{
            label: t('Natural Gas'),
            data: commoData.natgas,
            borderColor: '#10B981'
          }]}
        />

        {/* Gold & Silver */}
        <LineChartCard 
          title={t('Precious Metals')}
          subtitle={t('USD per ounce')}
          labels={commoData.dates}
          datasets={[{
            label: t('Gold'),
            data: commoData.gold,
            borderColor: '#FFB020'
          },{
            label: t('Silver (x10)'),
            data: commoData.silver.map(val => val * 10),
            borderColor: '#6B7280'
          }]}
        />

        {/* Copper & Aluminum */}
        <LineChartCard 
          title={t('Industrial Metals')}
          subtitle={t('USD per pound/metric ton')}
          labels={commoData.dates}
          datasets={[{
            label: t('Copper'),
            data: commoData.copper,
            borderColor: '#F43F5E'
          },{
            label: t('Aluminum (x1000)'),
            data: commoData.aluminum.map(val => val * 1000),
            borderColor: '#6B7280'
          }]}
        />

        {/* Oil Inventories */}
        <LineChartCard 
          title={t('US Oil Inventories')}
          subtitle={t('Million barrels')}
          labels={oilData.dates}
          datasets={[{
            label: t('Crude Oil Stocks'),
            data: oilData.crudeStocks,
            borderColor: '#0033A0'
          },{
            label: t('Gasoline Stocks'),
            data: oilData.gasolineStocks,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Commodity Index */}
        <LineChartCard 
          title={t('Bloomberg Commodity Index')}
          subtitle={t('Index value')}
          labels={commoData.dates}
          datasets={[{
            label: t('BCOM Index'),
            data: commoData.bcom,
            borderColor: '#0033A0'
          }]}
        />

        {/* Agriculture */}
        <LineChartCard 
          title={t('Agricultural Commodities')}
          subtitle={t('Price index, rebased')}
          labels={commoData.dates}
          datasets={[{
            label: t('Wheat'),
            data: commoData.wheat,
            borderColor: '#FFB020'
          },{
            label: t('Corn'),
            data: commoData.corn,
            borderColor: '#10B981'
          },{
            label: t('Soybeans'),
            data: commoData.soybeans,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Energy vs Metals Relative Performance */}
        <LineChartCard 
          title={t('Energy vs Metals Performance')}
          subtitle={t('Relative performance, rebased')}
          labels={commoData.dates}
          datasets={[{
            label: t('Energy/Metals Ratio'),
            data: commoData.dates.map((_, i) => 
              (commoData.wti[i] + commoData.natgas[i]) / 
              (commoData.gold[i]/500 + commoData.copper[i]*10)
            ),
            borderColor: '#0033A0'
          }]}
        />

        {/* Commodity Performance Heatmap */}
        <HeatmapCard
          title={t('Commodity Performance')}
          subtitle={t(`${selectedTimeframe} change percentage`)}
          items={[
            { name: 'WTI Crude', change: commoData.returns.wti },
            { name: 'Brent Crude', change: commoData.returns.brent },
            { name: 'Natural Gas', change: commoData.returns.natgas },
            { name: 'Gold', change: commoData.returns.gold },
            { name: 'Silver', change: commoData.returns.silver },
            { name: 'Copper', change: commoData.returns.copper },
            { name: 'Aluminum', change: commoData.returns.aluminum },
            { name: 'Wheat', change: commoData.returns.wheat }
          ]}
          getColorForValue={getHeatmapColor}
          format={formatPercent}
        />
      </div>
    );
  };

  // Credit Section con dati dinamici
  const renderCreditSection = () => {
    const creditData = creditSpreadData[selectedTimeframe as keyof typeof creditSpreadData];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* IG vs HY Ratio */}
        <LineChartCard 
          title={t('IG vs HY Spread Ratio')}
          subtitle={t('Ratio value')}
          labels={creditData.dates}
          datasets={[{
            label: t('IG/HY Ratio'),
            data: creditData.ig.map((val, i) => val / creditData.hy[i]),
            borderColor: '#FFB020'
          }]}
        />

        {/* EU Credit Spreads */}
        <LineChartCard 
          title={t('European Credit')}
          subtitle={t('iTraxx indices, bps')}
          labels={creditData.dates}
          datasets={[{
            label: t('iTraxx Europe'),
            data: creditData.itraxx,
            borderColor: '#0033A0'
          },{
            label: t('iTraxx Crossover'),
            data: creditData.dates.map(() => 350 + Math.random() * 50 - 25),
            borderColor: '#F43F5E'
          }]}
        />

        {/* US vs EU Credit */}
        <LineChartCard 
          title={t('US vs EU Credit')}
          subtitle={t('Spread differential, bps')}
          labels={creditData.dates}
          datasets={[{
            label: t('US-EU IG Differential'),
            data: creditData.ig.map((val, i) => (val * 100) - creditData.itraxx[i]),
            borderColor: '#0033A0'
          }]}
        />

        {/* Credit Quality Breakdown */}
        <BarChartCard 
          title={t('Credit Quality Distribution')}
          subtitle={t('Index weight percentage')}
          labels={['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', '<CCC']}
          datasets={[{
            label: t('Weight'),
            data: [5, 10, 25, 35, 12, 8, 4, 1],
            backgroundColor: [
              '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', 
              '#FEF3C7', '#FDE68A', '#FEE2E2', '#F87171'
            ]
          }]}
        />

        {/* Default Rates */}
        <LineChartCard 
          title={t('Default Rates')}
          subtitle={t('Trailing 12-month, percentage')}
          labels={creditData.dates}
          datasets={[{
            label: t('IG Default Rate'),
            data: creditData.dates.map(() => 0.2 + Math.random() * 0.2 - 0.1),
            borderColor: '#0033A0'
          },{
            label: t('HY Default Rate'),
            data: creditData.dates.map(() => 2.5 + Math.random() * 1.0 - 0.5),
            borderColor: '#F43F5E'
          }]}
        />

        {/* Credit Technicals */}
        <LineChartCard 
          title={t('Credit Technicals')}
          subtitle={t('Cumulative Flows, $ billions')}
          labels={creditData.dates}
          datasets={[{
            label: t('IG Fund Flows'),
            data: creditData.dates.map((_, i) => 20 + i * 2 + Math.random() * 5 - 2.5),
            borderColor: '#0033A0'
          },{
            label: t('HY Fund Flows'),
            data: creditData.dates.map((_, i) => 10 + i * 0.5 + Math.random() * 2 - 1),
            borderColor: '#F43F5E'
          }]}
        />

        {/* Credit Performance Heatmap */}
        <HeatmapCard
          title={t('Credit Performance')}
          subtitle={t(`${selectedTimeframe} total return`)}
          items={[
            { name: 'US IG', change: 1.2 },
            { name: 'US HY', change: 2.5 },
            { name: 'EU IG', change: 0.8 },
            { name: 'EU HY', change: 1.7 },
            { name: 'EM $ Bonds', change: -0.5 },
            { name: 'US CLOs', change: 1.3 },
            { name: 'EU CLOs', change: 0.9 },
            { name: 'Converts', change: 3.2 }
          ]}
          getColorForValue={getHeatmapColor}
          format={formatPercent}
        />
      </div>
    );
  };

  // Sentiment Section con dati dinamici
  const renderSentimentSection = () => {
    const sentiment = sentimentData[selectedTimeframe as keyof typeof sentimentData];
    const positioning = positioningData[selectedTimeframe as keyof typeof positioningData];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* AAII Sentiment */}
        <BarChartCard 
          title={t('AAII Sentiment Survey')}
          subtitle={t('Percentage')}
          labels={sentiment.dates}
          datasets={[
            {
              label: t('Bullish'),
              data: sentiment.aaii.bullish,
              backgroundColor: '#10B981'
            },
            {
              label: t('Neutral'),
              data: sentiment.aaii.neutral,
              backgroundColor: '#6B7280'
            },
            {
              label: t('Bearish'),
              data: sentiment.aaii.bearish,
              backgroundColor: '#F43F5E'
            }
          ]}
          horizontal={false}
        />

        {/* Bull-Bear Spread */}
        <LineChartCard 
          title={t('Bull-Bear Spread')}
          subtitle={t('Bullish minus bearish, percentage')}
          labels={sentiment.dates}
          datasets={[{
            label: t('Spread'),
            data: sentiment.aaii.bullish.map((val, i) => val - sentiment.aaii.bearish[i]),
            borderColor: '#0033A0'
          }]}
        />

        {/* Options Sentiment */}
        <LineChartCard 
          title={t('Options Sentiment')}
          subtitle={t('Put/Call Ratio')}
          labels={sentiment.dates}
          datasets={[{
            label: t('P/C Ratio'),
            data: sentiment.putCallRatio,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Fund Manager Survey */}
        <LineChartCard 
          title={t('Fund Manager Survey')}
          subtitle={t('Net equity allocation, percentage')}
          labels={sentiment.dates}
          datasets={[{
            label: t('Equity Allocation'),
            data: sentiment.fundManagerSurvey.equityAllocation,
            borderColor: '#0033A0'
          }]}
        />

        {/* Risk Appetite */}
        <GaugeCard
          title={t('Risk Appetite Index')}
          subtitle={t('Current level')}
          value={sentiment.riskAppetite}
          min={0}
          max={100}
          format={(value) => 
            value < 20 ? t('Extreme Fear') : 
            value < 40 ? t('Fear') : 
            value < 60 ? t('Neutral') : 
            value < 80 ? t('Greed') : 
            t('Extreme Greed')}
          colorRanges={[
            { from: 0, to: 20, color: '#F43F5E' }, // Rosso (paura estrema)
            { from: 20, to: 40, color: '#FEE2E2' }, // Rosso chiaro (paura)
            { from: 40, to: 60, color: '#6B7280' }, // Grigio (neutrale)
            { from: 60, to: 80, color: '#A7F3D0' }, // Verde chiaro (avidità)
            { from: 80, to: 100, color: '#10B981' }, // Verde (avidità estrema)
          ]}
          label={t('Sentiment Level')}
        />

        {/* Positioning - Net Speculative */}
        <BarChartCard 
          title={t('Net Speculative Positioning')}
          subtitle={t('CFTC data, normalized')}
          labels={positioning.assets}
          datasets={[{
            label: t('Net Position'),
            data: positioning.netSpeculative,
            backgroundColor: positioning.netSpeculative.map(val => 
              val > 0 ? '#10B981' : '#F43F5E'
            )
          }]}
          horizontal={true}
        />

        {/* Fund Flows */}
        <LineChartCard 
          title={t('Global Fund Flows')}
          subtitle={t('Weekly, $ billions')}
          labels={fundFlowsData.dates}
          datasets={[{
            label: t('Equity Funds'),
            data: fundFlowsData.equity,
            borderColor: '#0033A0'
          },{
            label: t('Bond Funds'),
            data: fundFlowsData.bond,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Short Interest */}
        <LineChartCard 
          title={t('Short Interest')}
          subtitle={t('Percentage of float')}
          labels={sentiment.dates}
          datasets={[{
            label: t('S&P 500'),
            data: sentiment.shortInterest.sp500,
            borderColor: '#0033A0'
          },{
            label: t('Russell 2000'),
            data: sentiment.shortInterest.russell2000,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Sentiment Indicators Heatmap */}
        <HeatmapCard
          title={t('Sentiment Indicators')}
          subtitle={t('Current readings')}
          items={[
            { name: t('Retail Sentiment'), value: (sentiment.aaii.bullish[sentiment.aaii.bullish.length-1] - sentiment.aaii.bearish[sentiment.aaii.bearish.length-1]) },
            { name: t('Risk Appetite'), value: sentiment.riskAppetite - 50 },
            { name: t('Put/Call Ratio'), value: -(sentiment.putCallRatio[sentiment.putCallRatio.length-1] - 1) * 100 },
            { name: t('Fund Mgr Bullishness'), value: sentiment.fundManagerSurvey.equityAllocation[sentiment.fundManagerSurvey.equityAllocation.length-1] },
            { name: t('Short Interest'), value: -sentiment.shortInterest.sp500[sentiment.shortInterest.sp500.length-1] * 10 },
            { name: t('CNN Fear & Greed'), value: sentiment.riskAppetite - 50 },
            { name: t('Equity Fund Flows'), value: fundFlowsData.equity[fundFlowsData.equity.length-1] * 2 },
            { name: t('Margin Debt Change'), value: sentiment.marginDebt[sentiment.marginDebt.length-1] }
          ]}
          getColorForValue={(context) => context > 0 ? '#10B981' : '#F43F5E'}
          format={(val) => val.toFixed(1)}
        />
      </div>
    );
  };

  // Liquidity Section con dati dinamici
  const renderLiquiditySection = () => {
    const liquidity = liquidityData[selectedTimeframe as keyof typeof liquidityData];
    const fedBalance = fedBalanceSheetData[selectedTimeframe as keyof typeof fedBalanceSheetData];
    const etfFlows = etfFlowsData[selectedTimeframe as keyof typeof etfFlowsData];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Liquidity */}
        <LineChartCard 
          title={t('Global Liquidity Conditions')}
          subtitle={t('Index, higher = more liquidity')}
          labels={liquidity.dates}
          datasets={[{
            label: t('Liquidity Index'),
            data: liquidity.globalIndex,
            borderColor: '#0033A0'
          }]}
        />

        {/* Central Bank Assets */}
        <LineChartCard 
          title={t('Central Bank Balance Sheets')}
          subtitle={t('Trillion USD')}
          labels={fedBalance.dates}
          datasets={[{
            label: t('Fed'),
            data: fedBalance.fed,
            borderColor: '#0033A0'
          },{
            label: t('ECB'),
            data: fedBalance.ecb,
            borderColor: '#1D7AFC'
          },{
            label: t('BoJ'),
            data: fedBalance.boj,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Fed Balance Sheet Breakdown */}
        <BarChartCard 
          title={t('Fed Balance Sheet Components')}
          subtitle={t('Trillion USD')}
          labels={[t('UST'), t('MBS'), t('Other')]}
          datasets={[{
            label: t('Amount'),
            data: [
              fedBalance.fed[fedBalance.fed.length-1] * 0.7,
              fedBalance.fed[fedBalance.fed.length-1] * 0.25,
              fedBalance.fed[fedBalance.fed.length-1] * 0.05
            ],
            backgroundColor: ['#0033A0', '#1D7AFC', '#4C9AFF']
          }]}
        />

        {/* Money Supply */}
        <LineChartCard 
          title={t('US Money Supply (M2)')}
          subtitle={t('Trillion USD')}
          labels={liquidity.dates}
          datasets={[{
            label: t('M2'),
            data: liquidity.m2,
            borderColor: '#0033A0'
          }]}
        />

        {/* Money Market Funds */}
        <LineChartCard 
          title={t('Money Market Fund Assets')}
          subtitle={t('Trillion USD')}
          labels={liquidity.dates}
          datasets={[{
            label: t('MMF Assets'),
            data: liquidity.moneyMarket,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Bank Reserves */}
        <LineChartCard 
          title={t('Bank Reserves at Fed')}
          subtitle={t('Billion USD')}
          labels={liquidity.dates}
          datasets={[{
            label: t('Reserves'),
            data: liquidity.bankReserves,
            borderColor: '#10B981'
          }]}
        />

        {/* Repo Market */}
        <LineChartCard 
          title={t('Repo Market Volume')}
          subtitle={t('Billion USD')}
          labels={liquidity.dates}
          datasets={[{
            label: t('Repo Volume'),
            data: liquidity.repoVolume,
            borderColor: '#FFB020'
          }]}
        />

        {/* ETF Flows */}
        <LineChartCard 
          title={t('ETF Flows')}
          subtitle={t('Monthly, Billion USD')}
          labels={etfFlows.dates}
          datasets={[{
            label: t('Equity ETFs'),
            data: etfFlows.equity,
            borderColor: '#0033A0'
          },{
            label: t('Bond ETFs'),
            data: etfFlows.bond,
            borderColor: '#F43F5E'
          }]}
        />

        {/* Asset Liquidity Heatmap */}
        <HeatmapCard
          title={t('Market Liquidity Conditions')}
          subtitle={t('By asset class')}
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
          getColorForValue={(context) => {
            if (context > 0.5) return { bg: '#10B981', text: 'white' }; // Alta liquidità
            if (context > -0.5) return { bg: '#A7F3D0', text: '#065F46' }; // Liquidità normale
            if (context > -1.5) return { bg: '#FEE2E2', text: '#7F1D1D' }; // Bassa liquidità
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
      
      {/* Tabs per le diverse categorie di dashboard */}
      <div className="mt-6 mb-8">
        <CategoryTabs 
          categories={dashboardCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
      
      {/* Contenuto dinamico in base alla categoria selezionata */}
      {renderDashboardContent()}
    </div>
  );
}