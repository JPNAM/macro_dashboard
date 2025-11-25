import React, { useEffect, useState } from 'react';
import { macroApi, marketApi, analyticsApi } from '../services/api';
import type { Indicator, Series, Contract } from '../types';
import KalshiFanChart from '../components/KalshiFanChart';
import OrderTicket from '../components/OrderTicket';
import MetricCard from '../components/MetricCard';
import { AlertCircle, Info } from 'lucide-react';

const MacroPage: React.FC = () => {
    const [indicators, setIndicators] = useState<Indicator[]>([]);
    const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
    const [series, setSeries] = useState<Series | null>(null);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [selectedContract, setSelectedContract] = useState<Contract | undefined>(undefined);
    const [fanData, setFanData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Indicators
                const indicatorsData = await macroApi.getIndicators();
                setIndicators(indicatorsData);

                if (indicatorsData.length > 0) {
                    const firstIndicator = indicatorsData[0];
                    setSelectedIndicator(firstIndicator);

                    // 2. Fetch Series for the first indicator
                    if (firstIndicator.series_ids.length > 0) {
                        const seriesId = firstIndicator.series_ids[0];
                        const seriesData = await macroApi.getSeries(seriesId);
                        setSeries(seriesData);

                        // 3. Fetch Fan Data
                        const fan = await analyticsApi.getProbabilityFan(seriesId);
                        // Transform fan data for chart
                        // Mock transformation as the backend returns a simplified structure
                        interface ChartDataPoint {
                            date: string;
                            value: number | null;
                            p50_lower: number | null;
                            p50_upper: number | null;
                            p90_lower: number | null;
                            p90_upper: number | null;
                        }

                        const chartData: ChartDataPoint[] = seriesData.history_dates.map((date, i) => ({
                            date,
                            value: seriesData.history_values[i],
                            p50_lower: null,
                            p50_upper: null,
                            p90_lower: null,
                            p90_upper: null,
                        }));

                        // Add future points from fan data (mock)
                        chartData.push({
                            date: '2023-12-01',
                            value: null,
                            p50_lower: fan.fan_bands['50%'].lower,
                            p50_upper: fan.fan_bands['50%'].upper,
                            p90_lower: fan.fan_bands['90%'].lower,
                            p90_upper: fan.fan_bands['90%'].upper,
                        });
                        setFanData(chartData);
                    }
                }

                // 4. Fetch Contracts
                const contractsData = await marketApi.getContracts();
                setContracts(contractsData);
                if (contractsData.length > 0) {
                    setSelectedContract(contractsData[0]);
                }

            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePlaceOrder = (side: 'Buy' | 'Sell', quantity: number, price: number) => {
        console.log(`Placing ${side} order for ${quantity} contracts at $${price}`);
        alert(`Order Placed: ${side} ${quantity} @ $${price}`);
    };

    if (loading) {
        return <div className="text-white">Loading market data...</div>;
    }

    return (
        <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Column: Navigator & Details (3 cols) */}
            <div className="col-span-3 space-y-6">
                <div className="bg-surface border border-zinc-800 rounded-xl p-4">
                    <h3 className="text-zinc-400 text-sm font-medium mb-3">Indicators</h3>
                    <div className="space-y-2">
                        {indicators.map(ind => (
                            <button
                                key={ind.id}
                                onClick={() => setSelectedIndicator(ind)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedIndicator?.id === ind.id
                                    ? 'bg-zinc-800 text-white'
                                    : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {ind.name}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedIndicator && (
                    <div className="bg-surface border border-zinc-800 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                                <h4 className="text-white font-medium text-sm">{selectedIndicator.name}</h4>
                                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                                    {selectedIndicator.description}
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                                        {selectedIndicator.region}
                                    </span>
                                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                                        {selectedIndicator.asset_class}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Center Column: Charts & Metrics (6 cols) */}
            <div className="col-span-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <MetricCard
                        label="Latest Release"
                        value={series?.history_values[series.history_values.length - 1] + "%" || "3.2%"}
                        change={0.1}
                    />
                    <MetricCard
                        label="Market Implied"
                        value="3.1%"
                        change={-0.2}
                    />
                    <MetricCard
                        label="Volatility (3Y)"
                        value={selectedIndicator?.volatility_3y + "%" || "1.2%"}
                    />
                </div>

                <KalshiFanChart
                    data={fanData}
                    title={series ? `${series.name} Projection` : "Probability Fan"}
                />

                <div className="bg-surface border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Contract Ladder</h3>
                    <div className="space-y-2">
                        {contracts.map(contract => (
                            <div
                                key={contract.id}
                                onClick={() => setSelectedContract(contract)}
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${selectedContract?.id === contract.id
                                    ? 'bg-zinc-800 border-primary/50'
                                    : 'bg-zinc-900/50 border-transparent hover:bg-zinc-800'
                                    }`}
                            >
                                <div>
                                    <div className="text-sm font-medium text-white">{contract.ticker}</div>
                                    <div className="text-xs text-zinc-500">Exp: {new Date(contract.expiration).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-emerald-400">{Math.round(contract.implied_probability * 100)}%</div>
                                    <div className="text-xs text-zinc-500">Implied Prob</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Execution (3 cols) */}
            <div className="col-span-3">
                <OrderTicket
                    contract={selectedContract}
                    onPlaceOrder={handlePlaceOrder}
                />

                <div className="mt-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
                        <div>
                            <h4 className="text-indigo-200 font-medium text-sm">Tail Risk Monitor</h4>
                            <p className="text-indigo-300/70 text-xs mt-1">
                                Market pricing implies a 15% chance of CPI exceeding 4.0% by year-end.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MacroPage;
