import React from 'react'

const Upcoming = () => {
    return (
        <div className='m-auto max-w-[80%] bg-gray-900 my-6 rounded-xl'>
            <div className='px-36 py-8 flex flex-col gap-4 text-gray-300'>
                <p>
                    You want to run your business running smoothly, right? Then you must keep your bills updated. A free invoice generator can be helpful in this situation.
                </p>
                <p>
                    This invoice generator is free and privacy-based. Here are the features offered to you:
                </p>

                <div>
                    <li className='font-semibold text-white'>Import and Export Support:</li>
                    <p>The tool supports importing and exporting invoices in a simple text file format, making it convenient to transfer invoice data across platforms or keep backups of essential records.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>Custom Fields and Notes:</li>
                    <p>Users can include custom fields like VAT, bank information, and other relevant details. Additionally, fields for notes and terms allow for clear communication and additional information in the invoice.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>Local Save and Load Functionality:</li>
                    <p>By enabling users to save and load their invoices locally, the solution improves accessibility and gradually makes effective invoice administration easier.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>PDF Invoice Generation:</li>
                    <p>The tool offers the ability to generate professional-looking PDF invoices. I'm currently working on additional templates for PDFs with different layouts.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>Multi-Currency Support:</li>
                    <p>I included all world currencies to ensure that users from all over the world can utilize the tool. Now it's a flexible and universally applicable billing solution.</p>
                </div>
            </div>
        </div>
    )
}

export default Upcoming