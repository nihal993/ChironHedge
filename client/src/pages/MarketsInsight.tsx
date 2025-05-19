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
  yieldCurveFullData
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

  // Altre sezioni (renderizzazione base, da completare con i dati specifici)
  const renderBondMarketSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineChartCard 
          title={t('Bond Market Dashboard')}
          subtitle={t('Under construction')}
          labels={['1M', '3M', '6M', '1Y', '2Y', '5Y', '10Y', '30Y']}
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
          fullWidth={true}
        />
      </div>
    );
  };

  const renderVolatilitySection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineChartCard 
          title={t('Volatility Dashboard')}
          subtitle={t('Under construction')}
          labels={['1', '2', '3', '4', '5', '6', '7']}
          datasets={[{
            label: 'VIX',
            data: [20, 22, 19, 24, 21, 18, 17],
            borderColor: '#F43F5E'
          }]}
          fullWidth={true}
        />
      </div>
    );
  };

  const renderCommoditiesSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineChartCard 
          title={t('Commodities Dashboard')}
          subtitle={t('Under construction')}
          labels={['1', '2', '3', '4', '5', '6', '7']}
          datasets={[{
            label: 'Gold',
            data: [1850, 1870, 1890, 1920, 1950, 1940, 1960],
            borderColor: '#FFB020'
          }]}
          fullWidth={true}
        />
      </div>
    );
  };

  const renderCreditSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineChartCard 
          title={t('Credit Dashboard')}
          subtitle={t('Under construction')}
          labels={['1', '2', '3', '4', '5', '6', '7']}
          datasets={[{
            label: 'IG Spread',
            data: [1.1, 1.12, 1.15, 1.18, 1.2, 1.19, 1.17],
            borderColor: '#0033A0'
          }]}
          fullWidth={true}
        />
      </div>
    );
  };

  const renderSentimentSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineChartCard 
          title={t('Sentiment Dashboard')}
          subtitle={t('Under construction')}
          labels={['1', '2', '3', '4', '5', '6', '7']}
          datasets={[{
            label: 'Bull/Bear Ratio',
            data: [1.5, 1.7, 1.9, 2.1, 2.0, 1.8, 1.7],
            borderColor: '#10B981'
          }]}
          fullWidth={true}
        />
      </div>
    );
  };

  const renderLiquiditySection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <LineChartCard 
          title={t('Liquidity Dashboard')}
          subtitle={t('Under construction')}
          labels={['1', '2', '3', '4', '5', '6', '7']}
          datasets={[{
            label: 'M2 Money Supply',
            data: [21.5, 21.4, 21.3, 21.4, 21.5, 21.6, 21.7],
            borderColor: '#0033A0'
          }]}
          fullWidth={true}
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