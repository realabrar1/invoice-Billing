import Products from './Products';
import Store from './Store';
import Total from './Total';
import ControlCentre from './ControlCentre';
import InvoiceReview from './InvoiceReview';
import { useAppContext } from '../context/AppContext';

export default function InvoiceForm() {
    const { formData, setFormData, showReview, setShowReview } = useAppContext();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    return (
        <div className='flex lg:flex-row flex-col-reverse m-auto lg:px-8 px-2 mt-4 mb-8 lg:items-start items-center lg:gap-10 gap-6 justify-center'>
            {showReview && <InvoiceReview />}
            <div className='bg-gray-900 lg:p-10 md:p-7 p-5 rounded-lg lg:min-w-[40rem] lg:w-[50rem] md:w-[45rem] w-[95%]'>
                <div className='flex lg:flex-row flex-col lg:items-center items-start gap-3 justify-between pb-2'>
                    <div className='flex gap-2 items-center'>
                        <h3 className=' font-semibold text-lg'>Current Date : </h3>
                        <p>{new Date().toDateString()}</p>
                    </div>

                    <div className='flex gap-2 items-center'>
                        <h3 className=' font-semibold text-lg'>Invoice # </h3>
                        <input onChange={handleChange} id="invoiceNumber" value={formData.invoiceNumber} type="number" placeholder="1234" className="input input-bordered input-primary w-[8rem] max-w-xs h-10" />
                    </div>
                </div>

                <div className="w-full max-w-xs flex items-center gap-2">
                    <label className="label">
                        <span className="label-text font-semibold text-lg">Billing Date :</span>
                    </label>
                    <input value={formData.dateOfIssue} id="dateOfIssue" onChange={handleChange} type="date" placeholder="Type here" className="input input-bordered input-primary w-full h-10 max-w-[12rem]" />
                </div>

                <div className="divider pt-8 pb-2">Store Info</div>

                <div className="collapse bg-base-100">
                    <input type="checkbox" />
                    <div className="collapse-title text-primary text-xl font-medium">
                        Click to show/hide Store Info
                    </div>
                    <div className="collapse-content">
                        <Store />
                    </div>
                </div>

                <div className="divider py-2">Buyer Info</div>

                <div className='flex lg:flex-row flex-col gap-2 items-center justify-between'>
                    <div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input onChange={handleChange} id="buyerName" value={formData.buyerName} type="text" placeholder="Type here" className="input input-bordered input-primary w-[19rem]" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input onChange={handleChange} id="buyerAddress" value={formData.buyerAddress} type="text" placeholder="Type here" className="input input-bordered input-primary w-[19rem]" />
                        </div>
                    </div>
                    <div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email Id</span>
                            </label>
                            <input onChange={handleChange} id="buyerEmail" value={formData.buyerEmail} type="text" placeholder="Type here" className="input input-bordered input-primary w-[19rem]" />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Mob No.</span>
                            </label>
                            <input onChange={handleChange} id="buyerMobno" value={formData.buyerMobno} type="text" placeholder="Type here" className="input input-bordered input-primary w-[19rem]" />
                        </div>
                    </div>
                </div>

                <div className="divider pt-8 pb-2">Products</div>
                <Products />

                <div className="divider pt-8 pb-2"></div>
                <Total />

            </div>
            <div className='bg-gray-900 p-5 rounded-lg min-w-[15rem] lg:w-[18rem] md:w-[45rem] w-[95%]'>
                <ControlCentre setShowReview={setShowReview} />
            </div>
        </div>
    )
}