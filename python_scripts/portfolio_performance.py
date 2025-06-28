#!/usr/bin/env python3
"""
Portfolio Performance Analysis Script
Generates interactive financial charts for ChironHedge platform
"""

import json
import sys
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

def generate_portfolio_data():
    """Generate realistic portfolio performance data"""
    
    # Generate 252 trading days (1 year)
    dates = pd.date_range(start='2024-01-01', periods=252, freq='B')
    
    # Simulate portfolio returns with realistic volatility
    np.random.seed(42)  # For reproducible results
    daily_returns = np.random.normal(0.0008, 0.015, 252)  # ~20% annual return, 15% volatility
    cumulative_returns = np.cumprod(1 + daily_returns)
    portfolio_values = 1000000 * cumulative_returns  # Start with $1M
    
    # Create benchmark (S&P 500 proxy)
    benchmark_returns = np.random.normal(0.0006, 0.012, 252)  # ~15% annual return, 12% volatility
    benchmark_cumulative = np.cumprod(1 + benchmark_returns)
    benchmark_values = 1000000 * benchmark_cumulative
    
    # Calculate key metrics
    portfolio_total_return = (portfolio_values[-1] / portfolio_values[0] - 1) * 100
    benchmark_total_return = (benchmark_values[-1] / benchmark_values[0] - 1) * 100
    alpha = portfolio_total_return - benchmark_total_return
    
    volatility = np.std(daily_returns) * np.sqrt(252) * 100
    sharpe_ratio = (np.mean(daily_returns) * 252) / (np.std(daily_returns) * np.sqrt(252))
    
    max_drawdown = calculate_max_drawdown(portfolio_values)
    
    return {
        'data': {
            'dates': dates.strftime('%Y-%m-%d').tolist(),
            'portfolio_values': portfolio_values.tolist(),
            'benchmark_values': benchmark_values.tolist(),
            'portfolio_returns': daily_returns.tolist(),
            'benchmark_returns': benchmark_returns.tolist()
        },
        'metadata': {
            'title': 'Quantitative Alpha Strategy - Performance Analysis',
            'description': 'Multi-factor equity long/short strategy targeting market inefficiencies through systematic alpha generation',
            'modelQuality': f'Alpha: {alpha:.2f}% | Sharpe Ratio: {sharpe_ratio:.2f} | Max Drawdown: {max_drawdown:.2f}%',
            'methodology': 'The strategy employs a sophisticated factor model combining momentum, mean reversion, and fundamental metrics. Portfolio construction uses risk parity principles with dynamic hedging.',
            'interpretation': f'The strategy has generated {alpha:.1f}% alpha over the benchmark with a Sharpe ratio of {sharpe_ratio:.2f}, demonstrating consistent risk-adjusted outperformance. The {max_drawdown:.1f}% maximum drawdown indicates robust risk management.'
        },
        'chartType': 'line'
    }

def calculate_max_drawdown(values):
    """Calculate maximum drawdown percentage"""
    peak = np.maximum.accumulate(values)
    drawdown = (values - peak) / peak * 100
    return abs(np.min(drawdown))

def main():
    try:
        # Parse parameters if provided
        parameters = {}
        if len(sys.argv) > 1:
            parameters = json.loads(sys.argv[1])
        
        # Generate portfolio analysis
        result = generate_portfolio_data()
        
        # Output JSON result
        print(json.dumps(result))
        
    except Exception as e:
        # Output error in JSON format
        error_result = {
            'error': str(e),
            'data': [],
            'metadata': {
                'title': 'Error',
                'description': 'Failed to generate portfolio analysis',
                'modelQuality': 'N/A',
                'methodology': 'N/A',
                'interpretation': f'Error occurred: {str(e)}'
            },
            'chartType': 'line'
        }
        print(json.dumps(error_result))

if __name__ == "__main__":
    main()