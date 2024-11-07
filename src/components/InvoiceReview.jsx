import React from 'react'
import { FaX, FaDownload } from 'react-icons/fa6'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAppContext } from '../context/AppContext';
import { getFormatedDate } from '../utils';

const InvoiceReview = () => {
    const { storeInfo, setShowReview, formData: buyer, products, getTotalAmount } = useAppContext();
    const [errorMessages, setErrorMessages] = React.useState([]);

    const generatePdfInvoice = async () => {
        let errors = formValidaion();
        setErrorMessages(errors);
        if (errors.length > 0) return;

        try {
            const element = document.getElementById('invoice');
            const canvas = await html2canvas(element, { scale: 2, logging: true, letterRendering: true, useCORS: true });

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: [612, 792],
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add first page
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            // Add subsequent pages (if any)
            const totalPages = Math.floor(canvas.height / pdf.internal.pageSize.getHeight()) - 1;
            for (let i = 1; i < totalPages; i++) {
                pdf.addPage();
                const y = -pdf.internal.pageSize.getHeight() * i;
                pdf.addImage(imgData, 'JPEG', 0, y, pdfWidth, pdfHeight);
            }

            pdf.save('invoice.pdf');
        } catch (error) {
            console.log(error);
        }
    };

    const totalVales = getTotalAmount();

    const formValidaion = () => {
        const errorMessages = [];
        if (buyer.buyerName.trim() === "") {
            errorMessages.push("Name is required.");
        }
        if (buyer.buyerEmail.trim() === "") {
            errorMessages.push("Email is required.");
        }
        if (buyer.buyerAddress.trim() === "") {
            errorMessages.push("Address is required.");
        }
        if (products.length === 0) {
            errorMessages.push("Add atleast one product.");
        }
        if (buyer.invoiceNumber.trim() === "") {
            errorMessages.push("Invoice number is required.");
        }
        if (storeInfo.logo === "") {
            errorMessages.push("No store logo found.");
        }
        if (storeInfo.name.trim() === "" || storeInfo.address.trim() === "" || storeInfo.email.trim() === "" || storeInfo.mobno.trim() === "" || storeInfo.pincode.trim() === "" || storeInfo.city.trim() === "" || storeInfo.state.trim() === "") {
            errorMessages.push("Please fill the store details.")
        }
        return errorMessages;
    }


    return (
        <div className='relative'>
            <button onClick={() => setShowReview((prev) => !prev)} className='fixed z-[1000] top-6 right-6'><FaX size={28} /></button>
            <button onClick={generatePdfInvoice} className="btn fixed bottom-5 shadow-md left-1 right-1 w-fit z-[1000] m-auto bg-opacity-100 btn-success">
                <FaDownload /> Download as PDF
            </button>
            {errorMessages.length > 0 &&
                <div className='fixed z-[100000] m-auto inset-0 bg-black bg-opacity-70 flex items-center justify-center'>
                    <div className="card w-96 bg-gray-900 text-primary-content">
                        <div className="card-body">
                            <h2 className="card-title text-error text-xl font-bold">Error!!</h2>
                            {errorMessages.map((msg, idx) => <li key={idx} className='text-left text-gray-300'>{msg}</li>)}
                            <div className="card-actions justify-center mt-4">
                                <button onClick={() => setErrorMessages([])} className="btn btn-primary">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='fixed bg-black bg-opacity-40 backdrop-blur-sm inset-0 z-[100] flex justify-center'>
                <div className='overflow-y-auto flex justify-center my-6 pr-1 rounded-lg'>
                    <div id="invoice" className="p-8 text-black bg-white w-[48rem] h-fit rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                {storeInfo.logo && <img src={storeInfo.logo} alt="logo" height={62} width={62} />}
                                <div className='mt-3'>
                                    <h1 className="text-base font-bold">{storeInfo.name}</h1>
                                    <div className='text-sm font-medium text-gray-700'>
                                        <p>{storeInfo.address}</p>
                                        <p>{storeInfo.city}, {storeInfo.pincode}, {storeInfo.state}</p>
                                        <p>{storeInfo.email}</p>
                                        <p>{storeInfo.mobno}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='text-right'>
                                <h1 className='text-3xl font-semibold'>INVOICE</h1>
                                <p className='text-gray-400 font-medium'># INV-{buyer.invoiceNumber}</p>
                                <div className='mt-6'>
                                    <p className='font-semibold'>Total Bill Amount</p>
                                    <p className='text-2xl font-bold'>{storeInfo.currency} {Intl.NumberFormat().format(totalVales.grandTotal)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-end justify-between pt-5">
                            <div>
                                <p className='text-gray-400 text-sm font-semibold'>Bill To</p>
                                <p className="text-base font-bold">{buyer.buyerName}</p>
                                <div className='text-sm font-medium text-gray-700'>
                                    <p>{buyer.buyerAddress}</p>
                                    <p>{buyer.buyerEmail}</p>
                                    <p>{buyer.buyerMobno}</p>
                                </div>
                            </div>
                            <div className='w-[12rem] text-sm'>
                                <div className='w-full flex justify-between'>
                                    <p className='font-semibold'>Invoice Date:</p>
                                    <p className='text-gray-500 font-medium'>{getFormatedDate(buyer.dateOfIssue ? buyer.dateOfIssue : new Date(), storeInfo.dateFormat)}</p>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <p className='font-semibold'>Due Date:</p>
                                    <p className='text-gray-500 font-medium'>{getFormatedDate(buyer.currentDate, storeInfo.dateFormat)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto pt-6">
                            <table className="w-full">
                                {/* head */}
                                <thead>
                                    <tr className='bg-gray-800 text-white'>
                                        <th className='p-2 pt-0 pb-4 font-semibold px-5'>#</th>
                                        <th className='p-2 pt-0 pb-4 font-semibold text-left'>Item & Description</th>
                                        <th className='p-2 pt-0 pb-4 font-semibold'>QTY</th>
                                        <th className='p-2 pt-0 pb-4 font-semibold'>Rate</th>
                                        <th className='p-2 pt-0 pb-4 font-semibold'>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product, idx) => (
                                            <tr key={product.id} className='font-medium border-b border-b-gray-500'>
                                                <th className='p-2'>{idx + 1}</th>
                                                <td className='p-2'>
                                                    <div className='max-w-[18rem]'>
                                                        <p className='font-semibold'>{product.name}</p>
                                                        <p className='text-xs text-gray-500'>{product.description}</p>
                                                    </div>
                                                </td>
                                                <td className='p-2 text-center'>{product.quantity}</td>
                                                <td className='p-2 text-center'>{new Intl.NumberFormat().format(product.price)}</td>
                                                <td className='p-2 text-center'>{new Intl.NumberFormat().format(product.total)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            {products.length === 0 && <p className='w-full h-32 p-10 text-center'>No Items.</p>}
                        </div>

                        <div className='flex justify-end text-sm'>
                            <div className='w-[16rem] flex gap-2 flex-col mt-8'>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Sub Total</p>
                                    <p className='text-gray-500 font-medium'>{storeInfo.currency}{new Intl.NumberFormat().format(totalVales.total)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Discount ({totalVales.discount.type === "percent" ? totalVales.discount.value + "%" : storeInfo.currency + totalVales.discount.value})</p>
                                    <p className='text-gray-500 font-medium'>{storeInfo.currency}{new Intl.NumberFormat().format(totalVales.discountAmount)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Tax ({totalVales.tax.type === "percent" ? totalVales.tax.value + "%" : storeInfo.currency + totalVales.tax.value})</p>
                                    <p className='text-gray-500 font-medium'>{storeInfo.currency}{new Intl.NumberFormat().format(totalVales.taxAmount)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Shipping</p>
                                    <p className='text-gray-500 font-medium'>{storeInfo.currency}{new Intl.NumberFormat().format(totalVales.shipping)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Total</p>
                                    <p className='text-gray-500 font-medium'>{storeInfo.currency}{new Intl.NumberFormat().format(totalVales.grandTotal)}</p>
                                </div>
                            </div>
                        </div>

                        <div className='text-sm mt-8'>
                            {storeInfo.showClientNotes && storeInfo.clientNotes.trim() !== "" && <div>
                                <p className='font-semibold text-gray-500'>Notes</p>
                                <p className=' text-gray-800 font-semibold'>{storeInfo.clientNotes}</p>
                            </div>}

                            {storeInfo.showTerms && storeInfo.terms.trim() !== "" && <div className='mt-3'>
                                <p className='font-semibold text-gray-500'>Terms</p>
                                <p className=' text-gray-800 font-semibold'>
                                    {storeInfo.terms}
                                </p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceReview