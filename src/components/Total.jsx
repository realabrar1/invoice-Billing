import React, { useState } from 'react';
import { FaRotate } from 'react-icons/fa6';
import { useAppContext } from '../context/AppContext';

const Total = () => {
    const { products, discount, setDiscount, tax, setTax, shipping, setShipping, storeInfo, setStoreInfo, showBillingPercent, setShowBillingPercent, getTotalAmount } = useAppContext();

    const handleBillingPercent = (e) => {
        if (e.target.id === "discount") {
            setDiscount({
                type: 'percent',
                value: "0"
            })
        } else if (e.target.id === "tax") {
            setTax({
                type: 'percent',
                value: "0"
            })
        } else if (e.target.id === "shipping") {
            setShipping("0");
        }
        setShowBillingPercent({
            ...showBillingPercent,
            [e.target.id]: !showBillingPercent[e.target.id],
        });
    };

    const handleChange = (e, stateUpdater, prev) => {
        const value = e.target.value;

        // Regular expression to check for numeric input (including floating-point numbers)
        const isValidNumber = /^-?\d*\.?\d*$/.test(value);

        if (isValidNumber || value === "") {
            stateUpdater({ ...prev, value });
        }
    };

    return (
        <div className="flex lg:flex-row flex-col gap-8 w-full">
            <div className="flex flex-1 flex-col gap-5 lg:w-[42%] w-full">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Notes</span>
                    </label>
                    <textarea
                        onChange={(e) => {
                            const newInfo = {
                                ...storeInfo,
                                clientNotes: e.target.value
                            }
                            setStoreInfo(newInfo);
                            localStorage.setItem('storeInfo', JSON.stringify(newInfo));
                        }}
                        value={storeInfo.clientNotes}
                        placeholder="Visit again."
                        className="textarea textarea-bordered textarea-md w-full"
                    ></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Terms</span>
                    </label>
                    <textarea
                        onChange={(e) => {
                            const newInfo = {
                                ...storeInfo,
                                terms: e.target.value
                            }
                            setStoreInfo(newInfo);
                            localStorage.setItem('storeInfo', JSON.stringify(newInfo));
                        }}
                        value={storeInfo.terms}
                        placeholder="By using this.."
                        className="textarea textarea-bordered textarea-md w-full"
                    ></textarea>
                </div>
            </div>
            <div className='flex flex-col lg:w-[47%] w-full'>
                <div className="flex justify-between">
                    <div className="form-control w-32">
                        <label className="cursor-pointer label flex flex-col items-center justify-center gap-3">
                            <span className="label-text">Discount</span>
                            <input
                                onChange={handleBillingPercent}
                                id="discount"
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={showBillingPercent.discount}
                            />
                        </label>
                    </div>
                    <div className="form-control w-32">
                        <label className="cursor-pointer label flex flex-col items-center justify-center gap-3">
                            <span className="label-text">Tax</span>
                            <input
                                onChange={handleBillingPercent}
                                id="tax"
                                type="checkbox"
                                className="toggle toggle-secondary"
                                checked={showBillingPercent.tax}
                            />
                        </label>
                    </div>
                    <div className="form-control w-32">
                        <label className="cursor-pointer label flex flex-col items-center justify-center gap-3">
                            <span className="label-text">Shipping</span>
                            <input
                                onChange={handleBillingPercent}
                                id="shipping"
                                type="checkbox"
                                className="toggle toggle-accent"
                                checked={showBillingPercent.shipping}
                            />
                        </label>
                    </div>
                </div>
                <div className='py-2 w-full'>
                    <div className='flex justify-between font-medium px-1'>
                        <div>Subtotal</div>
                        <div>{storeInfo.currency} {products.reduce((acc, it) => acc + it.total, 0).toFixed(2)}</div>
                    </div>
                    <div className='flex flex-col font-medium gap-0.5 pt-4'>
                        <div className={`w-full flex items-center transition-all ease-in-out justify-between gap-2 ${showBillingPercent.discount ? 'flex' : 'hidden'}`}>
                            <label className="label">
                                <span className="label-text text-base font-normal">Discount :</span>
                            </label>
                            <div className='flex'>
                                <button onClick={() => {
                                    if (discount.type === "absolute") {
                                        setDiscount({ ...discount, type: "percent" })
                                    } else {
                                        setDiscount({ ...discount, type: "absolute" })
                                    }
                                }} className='px-4'><FaRotate /></button>
                                <div className='relative'>
                                    <input onChange={(e) => handleChange(e, setDiscount, discount)} value={discount.value} type="text" placeholder="0" className={`input input-bordered input-primary w-32 h-9 ${discount.type === "absolute" ? "pl-16" : "pr-16"}`} />
                                    {discount.type === "absolute" ? <div className='absolute top-1.5 left-2'>{storeInfo.currency}</div> :
                                        <div className='absolute top-1.5 right-2'>%</div>}
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex items-center transition-all ease-in-out justify-between gap-2 ${showBillingPercent.tax ? 'flex' : 'hidden'}`}>
                            <label className="label">
                                <span className="label-text text-base font-normal">Tax :</span>
                            </label>
                            <div className='flex'>
                                <button onClick={() => {
                                    if (tax.type === "absolute") {
                                        setTax({ ...tax, type: "percent" })
                                    } else {
                                        setTax({ ...tax, type: "absolute" })
                                    }
                                }} className='px-4'><FaRotate /></button>
                                <div className='relative'>
                                    <input onChange={(e) => handleChange(e, setTax, tax)} value={tax.value} type="text" placeholder="0" className={`input input-bordered input-primary w-32 h-9 ${tax.type === "absolute" ? "pl-16" : "pr-16"}`} />
                                    {tax.type === "absolute" ? <div className='absolute top-1.5 left-2'>{storeInfo.currency}</div> :
                                        <div className='absolute top-1.5 right-2'>%</div>}
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex items-center transition-all ease-in-out justify-between gap-2 ${showBillingPercent.shipping ? 'flex' : 'hidden'}`}>
                            <label className="label">
                                <span className="label-text text-base font-normal">Shipping :</span>
                            </label>
                            <input onChange={(e) => {
                                const value = e.target.value;
                                const isValidNumber = /^-?\d*\.?\d*$/.test(value);
                                if (isValidNumber || value === "") {
                                    setShipping(value);
                                }
                            }} value={shipping} type="text" placeholder="0" className="input input-bordered input-primary w-32 h-9" />
                        </div>
                    </div>
                    <div className="divider before:bg-gray-500 after:bg-gray-500 my-2"></div>
                    <div className='flex justify-between font-medium'>
                        <div>Total Amount</div>
                        <div>{storeInfo.currency} {getTotalAmount().grandTotal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Total;
