import React, { useState } from 'react';
import clsx from 'clsx';
import type { Contract } from '../types';

interface OrderTicketProps {
    contract?: Contract;
    onPlaceOrder: (side: 'Buy' | 'Sell', quantity: number, price: number) => void;
}

const OrderTicket: React.FC<OrderTicketProps> = ({ contract, onPlaceOrder }) => {
    const [side, setSide] = useState<'Buy' | 'Sell'>('Buy');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0.50);

    if (!contract) {
        return (
            <div className="bg-surface border border-zinc-800 rounded-xl p-6 h-full flex items-center justify-center text-zinc-500">
                Select a contract to trade
            </div>
        );
    }

    const totalCost = quantity * price;
    const maxPayout = quantity * 1.00;
    const maxProfit = side === 'Buy' ? maxPayout - totalCost : totalCost; // Simplified logic

    return (
        <div className="bg-surface border border-zinc-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Order Ticket</h3>

            <div className="mb-6">
                <div className="text-sm text-zinc-400 mb-1">Contract</div>
                <div className="text-white font-medium">{contract.ticker}</div>
                <div className="text-xs text-zinc-500 mt-1">{contract.strike_condition} {contract.strike_value}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                    onClick={() => setSide('Buy')}
                    className={clsx(
                        "py-2 rounded-lg font-medium transition-colors",
                        side === 'Buy'
                            ? "bg-emerald-500 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    )}
                >
                    Buy (Yes)
                </button>
                <button
                    onClick={() => setSide('Sell')}
                    className={clsx(
                        "py-2 rounded-lg font-medium transition-colors",
                        side === 'Sell'
                            ? "bg-rose-500 text-white"
                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    )}
                >
                    Sell (No)
                </button>
            </div>

            <div className="space-y-4 mb-6">
                <div>
                    <label className="block text-xs text-zinc-400 mb-1">Quantity</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                        className="w-full bg-background border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                    />
                </div>
                <div>
                    <label className="block text-xs text-zinc-400 mb-1">Limit Price</label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-zinc-500">$</span>
                        <input
                            type="number"
                            min="0.01"
                            max="0.99"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                            className="w-full bg-background border border-zinc-800 rounded-lg pl-6 pr-3 py-2 text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900/50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-zinc-400">Total Cost</span>
                    <span className="text-white">${totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-zinc-400">Max Profit</span>
                    <span className="text-emerald-400">+${maxProfit.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={() => onPlaceOrder(side, quantity, price)}
                className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
                Place {side} Order
            </button>
        </div>
    );
};

export default OrderTicket;
