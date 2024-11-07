import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Store = () => {
    const { storeInfo, setStoreInfo } = useAppContext();
    const handleStoreChange = (e) => {
        const newValue = { ...storeInfo, [e.target.id]: e.target.value };
        setStoreInfo(newValue);
        localStorage.setItem('storeInfo', JSON.stringify(newValue));
    }

    useEffect(() => {
        let storeInfo = JSON.parse(localStorage.getItem('storeInfo'));
        if (storeInfo) {
            setStoreInfo(storeInfo);
        }
    }, []);

    return (
        <div className='flex lg:flex-row flex-col gap-2 items-end lg:justify-between justify-center p-3'>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Store Logo</span>
                        {storeInfo.logo && <img src={storeInfo.logo} className="w-auto h-14" />}
                    </label>
                    <input onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                // Convert the blob to a data URL
                                const dataUrl = reader.result;
                                const newValue = { ...storeInfo, logo: dataUrl };
                                setStoreInfo(newValue);
                                localStorage.setItem('storeInfo', JSON.stringify(newValue));
                            };
                            reader.readAsDataURL(file);
                        }
                    }} id="logo" type="file" accept='image/*' className="file-input
                            file-input-md file-input-bordered file-input-primary lg:w-[18rem] w-[95%]" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Store Name</span>
                    </label>
                    <input value={storeInfo.name} id="name" onChange={handleStoreChange} type="text" placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Address</span>
                    </label>
                    <input value={storeInfo.address} id="address" type="text" onChange={handleStoreChange} placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pin Code</span>
                    </label>
                    <input value={storeInfo.pincode} id="pincode" onChange={handleStoreChange} type="text" placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email Id</span>
                    </label>
                    <input value={storeInfo.email} id="email" onChange={handleStoreChange} type="text" placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Mob No.</span>
                    </label>
                    <input value={storeInfo.mobno} id="mobno" onChange={handleStoreChange} type="text" placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">City</span>
                    </label>
                    <input value={storeInfo.city} id="city" onChange={handleStoreChange} type="text" placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">State</span>
                    </label>
                    <input value={storeInfo.state} id="state" onChange={handleStoreChange} type="text" placeholder="Type here" className="input input-bordered input-primary lg:w-[18rem] w-[95%]" />
                </div>
            </div>
        </div>
    )
}

export default Store