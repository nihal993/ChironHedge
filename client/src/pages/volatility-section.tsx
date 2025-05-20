import { useLanguage } from "@/contexts/LanguageContext";
import LineChartCard from "@/components/dashboard/LineChartCard";
import BarChartCard from "@/components/dashboard/BarChartCard";
import HeatmapCard from "@/components/dashboard/HeatmapCard";
import GaugeCard from "@/components/dashboard/GaugeCard";
import { volatilityData, volRiskPremiumData, vixTermStructureData } from "@/lib/dashboardData";

export const renderVolatilitySection = (selectedTimeframe: string) => {
  const { t } = useLanguage();
  
  // Ottieni i dati della volatilità per il timeframe selezionato
  const volData = volatilityData[selectedTimeframe as keyof typeof volatilityData];
  const volRiskPremium = volRiskPremiumData[selectedTimeframe as keyof typeof volRiskPremiumData];
  const vixTermStructure = vixTermStructureData;
  
  // Funzione per ottenere il colore in base al valore (per heatmap)
  const getHeatmapColor = (value: number) => {
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
        subtitle={t('Curve comparison')}
        labels={vixTermStructure.maturities}
        datasets={[{
          label: t('Current'),
          data: vixTermStructure.current,
          borderColor: '#F43F5E'
        },{
          label: t('Previous Month'),
          data: vixTermStructure.previousMonth,
          borderColor: '#FFB020'
        },{
          label: t('Previous Year'),
          data: vixTermStructure.previousYear,
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
          data: volRiskPremium.values,
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
          data: volData.realizedVol,
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
          data: volData.putCallRatio,
          borderColor: '#FFB020'
        }]}
      />

      {/* Vol Regime */}
      <GaugeCard
        title={t('Volatility Regime')}
        subtitle={t('Current market conditions')}
        value={volData.currentRegime}
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
        items={volData.assetClassVol.map(item => ({name: item.assetClass, change: item.level}))}
        getColorForValue={getHeatmapColor}
        format={(value) => `${value}%`}
      />
    </div>
  );
};