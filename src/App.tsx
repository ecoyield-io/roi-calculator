import { useState, useEffect } from 'react';

const presaleTiers = [
    { name: 'Early Investor', price: 0.015, stage: 1 },
    { name: 'Tier 1', price: 0.025, stage: 2 },
    { name: 'Tier 2', price: 0.035, stage: 3 },
    { name: 'Tier 3', price: 0.050, stage: 4 },
    { name: 'Tier 4', price: 0.075, stage: 5 },
    { name: 'Tier 5', price: 0.100, stage: 6 },
    { name: 'Tier 6', price: 0.125, stage: 7 },
    { name: 'Tier 7', price: 0.150, stage: 8 },
    { name: 'Tier 8', price: 0.200, stage: 9 },
    { name: 'Tier 9', price: 0.250, stage: 10 },
    { name: 'Tier 10', price: 0.300, stage: 11 },
];

function App() {
    const [investmentAmount, setInvestmentAmount] = useState('25,000');
    const [launchPrice, setLaunchPrice] = useState(0.50);
    const [futurePrice, setFuturePrice] = useState(0.50);
    const [stakingApy, setStakingApy] = useState(25);
    const [selectedTier, setSelectedTier] = useState(presaleTiers[0]);

    const [tokensReceived, setTokensReceived] = useState(0);
    const [launchValue, setLaunchValue] = useState(0);
    const [futureValue, setFutureValue] = useState(0);
    const [totalRoi, setTotalRoi] = useState(0);
    const [stakingRewards, setStakingRewards] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(num);
    };

    const formatCurrency = (num: number) => {
        if (num < 1) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(num);
        } else {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(num);
        }
    };

    const parseInvestmentAmount = (value: string) => {
        return parseFloat(value.replace(/,/g, '')) || 0;
    };

    const handleInvestmentChange = (e: any) => {
        const value = e.target.value;
        const numericValue = value.replace(/[^0-9.]/g, '');
        let parts = numericValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setInvestmentAmount(parts.join('.'));
    };

    useEffect(() => {
        const amount = parseInvestmentAmount(investmentAmount);
        const tokens = amount / selectedTier.price;
        const launchVal = tokens * launchPrice;
        const futureVal = tokens * futurePrice;
        const roi = futureVal > 0 && amount > 0 ? ((futureVal - amount) / amount) * 100 : 0;
        const rewards = (amount * stakingApy) / 100;
        const monthly = rewards / 12;

        setTokensReceived(tokens);
        setLaunchValue(launchVal);
        setFutureValue(futureVal);
        setTotalRoi(roi);
        setStakingRewards(rewards);
        setMonthlyIncome(monthly);
    }, [investmentAmount, launchPrice, futurePrice, stakingApy, selectedTier]);

    return (
        <div className="container">
            <div className="header">
                <img src="https://img.notionusercontent.com/ext/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2F6be38298-9766-4311-a2b0-ea54c56056b8%2Fecoyieldio_logo.jpeg/size/w=160?exp=1756766133&sig=WnB50O_byEZrBp81BtK_7bDIRPadyhlhIY0jtOTXF9Y&id=2591752a-41f6-80cf-ae71-007a17b6e7b5&table=custom_emoji" alt="EcoYield Logo" className="logo" />
                <h1>EcoYield Investment Calculator</h1>
                <p>Calculate your potential returns from the EcoYield presale</p>
            </div>

            <div className="calculator-container">
                <div className="calculator-card">
                    <div className="input-group">
                        <label>Select Presale Tier</label>
                        <div className="presale-selector">
                            {presaleTiers.map(tier => (
                                <div
                                    key={tier.stage}
                                    className={`presale-option ${selectedTier.stage === tier.stage ? 'active' : ''}`}
                                    onClick={() => setSelectedTier(tier)}
                                >
                                    <div>{tier.name}</div>
                                    <div className="price">${tier.price.toFixed(3)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Investment Amount (USDC)</label>
                        <div className="input-wrapper has-prefix">
                            <span className="input-prefix">$</span>
                            <input type="text" value={investmentAmount} onChange={handleInvestmentChange} placeholder="25,000" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Expected Launch Price</label>
                        <div className="input-wrapper has-prefix">
                            <span className="input-prefix">$</span>
                            <input type="number" value={launchPrice} onChange={e => setLaunchPrice(parseFloat(e.target.value))} placeholder="0.50" step="0.01" min="0.001" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Expected 1-Year Price</label>
                        <div className="input-wrapper has-prefix">
                            <span className="input-prefix">$</span>
                            <input type="number" value={futurePrice} onChange={e => setFuturePrice(parseFloat(e.target.value))} placeholder="0.50" step="0.01" min="0.001" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Staking APY (%)</label>
                        <div className="input-wrapper">
                            <input type="number" value={stakingApy} onChange={e => setStakingApy(parseFloat(e.target.value))} placeholder="25" min="0" max="500" />
                        </div>
                    </div>

                    <div className="disclaimer">
                        <h4>⚠️ Important Disclaimer</h4>
                        <p>This calculator is for illustrative purposes only and does not constitute financial advice. All projections are estimates based on assumptions and actual results may vary significantly. Cryptocurrency investments carry substantial risk and you should conduct your own research and consult with qualified financial advisors before making any investment decisions. Past performance does not guarantee future results.</p>
                    </div>
                </div>

                <div className="results-card">
                    <h2 style={{ marginBottom: '25px', fontSize: '20px', color: 'white' }}>Investment Analysis</h2>

                    <div className="results">
                        <div className="result-card">
                            <h3>Tokens Received</h3>
                            <div className="value">{formatNumber(tokensReceived)}</div>
                            <div className="subtitle">EcoYield tokens</div>
                        </div>

                        <div className="result-card">
                            <h3>Value at Launch</h3>
                            <div className="value">{formatCurrency(launchValue)}</div>
                            <div className="subtitle">Expected Q1 2026</div>
                        </div>

                        <div className="result-card">
                            <h3>Value at 1 Year</h3>
                            <div className="value">{formatCurrency(futureValue)}</div>
                            <div className="subtitle">12 months post-launch</div>
                        </div>

                        <div className="result-card highlight">
                            <h3>Total ROI (1 Year)</h3>
                            <div className="value">{Math.round(totalRoi)}%</div>
                            <div className="subtitle">Return on investment</div>
                        </div>

                        <div className="result-card">
                            <h3>Annual Staking Rewards</h3>
                            <div className="value">{formatCurrency(stakingRewards)}</div>
                            <div className="subtitle">Based on current APY</div>
                        </div>

                        <div className="result-card">
                            <h3>Monthly Staking Income</h3>
                            <div className="value">{formatCurrency(monthlyIncome)}</div>
                            <div className="subtitle">From staking rewards</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;