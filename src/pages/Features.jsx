import React from 'react'

const Features = () => {
    return (
        <div className='m-auto lg:max-w-[80%] max-w-[90%] bg-gray-900 mt-6 mb-10 rounded-xl'>
            <div className='lg:px-36 md:px-20 px-8 py-8 flex flex-col gap-4 text-gray-300'>
                <p>
                    You want to run your business running smoothly, right? Then you must keep your bills updated. A free invoice generator can be helpful in this situation.
                </p>
                <p>
                    This invoice generator is free and privacy-based. Here are the features offered to you:
                </p>

                <div>
                    <li className='font-semibold text-white'>Define Sender and Recipient:</li>
                    <p>The invoice generator allows users to input their information as the sender and recipient effortlessly. All crucial fields are included: Name, Address, City, and Country. If you need additional information like VAT number, email, etc., you can use custom fields for this.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>Invoice Date and Due Date:</li>
                    <p>Users can set the invoice and due dates, ensuring clarity and timeliness in payment expectations. This function helps with better money management and makes it less likely that payments will be late (hopefully :)).</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>Local Storage and Privacy:</li>
                    <p>Data privacy is paramount, and this invoice generator addresses this concern by saving the data in local storage. Users can confidently create and manage invoices, knowing their information is kept secure.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>PDF Invoice Generation:</li>
                    <p>The tool offers the ability to generate professional-looking PDF invoices. I'm currently working on additional templates for PDFs with different layouts.</p>
                </div>

                <div>
                    <li className='font-semibold text-white'>Discounts, Taxes, and Shipping Prices:</li>
                    <p>This invoice generator offers a complete invoicing solution by supporting shipping costs, taxes, and discounts. Both percentage and amount are supported.</p>
                </div>
            </div>
        </div>
    )
}

export default Features