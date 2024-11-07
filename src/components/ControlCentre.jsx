import React, { useEffect, useState } from 'react';
import { FaDownload, FaTrash } from 'react-icons/fa6';
import { FaSave } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { formatTime, getFormatedDate } from '../utils';

const ControlCentre = () => {
    const { storeInfo, setStoreInfo, setShowReview, getBillJSONData, loadInvoiceFromJSON, resetAll } = useAppContext();
    const [invoices, setInvoices] = useState([]);
    const currenciesWithSymbol = [
        { symbol: '₹', code: 'INR' },
        { symbol: '€', code: 'EUR' },
        { symbol: '$', code: 'USD' },
        { symbol: '£', code: 'GBP' },
        { symbol: '₩', code: 'KRW' }
    ]

    const dateFormats = [
        'DD/MM/YYYY',
        'MM/DD/YYYY',
        'YYYY/MM/DD',
        'DD-MM-YYYY',
        'MM-DD-YYYY',
        'YYYY-MM-DD',
    ]

    const downloadFile = () => {
        const myData = getBillJSONData();
        myData.id = Math.floor(Math.random() * 100000);

        // create file in browser
        const fileName = `invoice-#${myData.id}`;
        const json = JSON.stringify(myData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    const saveInvoice = () => {
        const invoiceData = getBillJSONData();
        invoiceData.id = Math.floor(Math.random() * 100000);
        let prevItems = localStorage.getItem('invoices') ? JSON.parse(localStorage.getItem('invoices')) : [];
        prevItems = [invoiceData, ...prevItems]
        localStorage.setItem('invoices', JSON.stringify(prevItems));
        setInvoices(prevItems);
    }

    const deleteSavedInvoice = (id) => {
        let prevItems = localStorage.getItem('invoices') ? JSON.parse(localStorage.getItem('invoices')) : [];
        prevItems = prevItems.filter((item) => item.id !== id);
        localStorage.setItem('invoices', JSON.stringify(prevItems));
        setInvoices(prevItems);
    }

    useEffect(() => {
        const invoices = localStorage.getItem('invoices') ? JSON.parse(localStorage.getItem('invoices')) : [];
        setInvoices(invoices);
    }, []);

    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Process the file, e.g., read its content
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                // Now you can use the file content as needed
                loadInvoiceFromJSON(JSON.parse(fileContent));
            };
            reader.readAsText(file);
        }
    }

    return (
        <div className="flex w-full flex-col items-center justify-center gap-4 pb-5">
            <button onClick={resetAll} className="btn btn-primary btn-lg btn-outline w-full">
                + New Invoice
            </button>
            <button onClick={()=>{
                saveInvoice();
                resetAll();
            }} className="btn btn-primary btn-warning btn-lg w-full">
                <FaSave /> Save Invoice
            </button>
            <div className="flex w-full justify-between">
                <button onClick={() => setShowReview(prev => !prev)} className="btn w-full btn-info">
                    <FaDownload /> Preview & Download
                </button>
            </div>
            <div className="flex w-full justify-between">
                <button className='relative btn w-[47%] btn-secondary'>
                    Import
                    <input onChange={onFileChange} type='file' accept='.json' placeholder='Import' className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer" />
                </button>
                <button onClick={downloadFile} className="btn w-[47%] btn-accent">Export</button>
            </div>
            <div className="form-control w-full max-w-xs -mt-2">
                <label className="label">
                    <span className="label-text">Currency</span>
                </label>
                <select value={storeInfo.currency} onChange={(e) => {
                    const newVal = { ...storeInfo, currency: e.target.value };
                    setStoreInfo(newVal);
                    localStorage.setItem('storeInfo', JSON.stringify(newVal));
                }} className="select select-bordered">
                    {currenciesWithSymbol.map((currency, index) => (
                        <option key={index} value={currency.symbol}>{currency.symbol} - {currency.code}</option>
                    ))}
                </select>
            </div>
            <div className="form-control w-full max-w-xs -mt-2">
                <label className="label">
                    <span className="label-text">Date Format</span>
                </label>
                <select value={storeInfo.dateFormat} onChange={(e) => {
                    const newVal = { ...storeInfo, dateFormat: e.target.value };
                    setStoreInfo(newVal);
                    localStorage.setItem('storeInfo', JSON.stringify(newVal));
                }} className="select select-bordered">
                    {dateFormats.map((format, index) => (
                        <option key={index} value={format}>{format}</option>
                    ))}
                </select>
            </div>

            <div className='w-full'>
                <span className="label-text font-medium text-primary">Saved Invoices</span>
                <div className='flex items-center justify-between gap-2 flex-col w-full mt-4'>
                    {
                        invoices.length === 0 ? <div className='text-gray-500 text-sm font-medium px-2'>No saved invoices.</div> : invoices.map((invoice, index) => (
                            <div onClick={() => {
                                loadInvoiceFromJSON(invoice);
                                deleteSavedInvoice(invoice.id);
                            }} key={index} className="flex w-full items-center justify-between gap-2 rounded-lg bg-neutral hover:bg-neutral-700 p-2 px-3 cursor-pointer">
                                <div className="flex items-center justify-between w-full gap-1">
                                    <span className="label-text">#{invoice.id}</span>
                                    <div className='flex gap-2'>
                                        <span className="label-text p-1 border rounded-md border-primary text-primary py-0.5 text-xs font-medium">{getFormatedDate(invoice.currentDate, storeInfo.dateFormat) + " " + formatTime(invoice.currentDate)}</span>
                                        <button onClick={() => deleteSavedInvoice(invoice.id)} className='flex text-rose-500 p-1 rounded-md cursor-pointer'>
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="divider mb-0"></div>

            <div className="flex flex-col w-full">
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text">Payments Terms</span>
                        <input
                            onChange={(e) => {
                                let newVal = { ...storeInfo, showTerms: e.target.checked };
                                setStoreInfo(newVal);
                                localStorage.setItem('storeInfo', JSON.stringify(newVal));
                            }}
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={storeInfo.showTerms}
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text">Client Notes</span>
                        <input
                            onChange={(e) => {
                                let newVal = { ...storeInfo, showClientNotes: e.target.checked };
                                setStoreInfo(newVal);
                                localStorage.setItem('storeInfo', JSON.stringify(newVal));
                            }}
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={storeInfo.showClientNotes}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ControlCentre;
