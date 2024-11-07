import React, { useState } from 'react'
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useAppContext } from '../context/AppContext';

const Products = () => {
    const { products, setProducts } = useAppContext();
    const [formData, setFormData] = useState({
        id: Math.random() * 1000,
        name: '',
        description: '',
        quantity: 1,
        price: 0,
        total: 0,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setProducts([...products, formData]);
        setFormData({
            id: Math.random() * 1000,
            name: '',
            description: '',
            quantity: 1,
            price: 0,
            total: 0,
        });
    }

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    }

    return (
        <div>
            <div>
                {
                    products.map((product, index) =>
                        <Product key={product.id} handleDelete={handleDelete} product={product} setProducts={setProducts} />
                    )}
            </div>

            <div className='text-lg font-semibold py-5 pb-2'>New Item</div>

            <form onSubmit={handleSubmit} className='w-full flex lg:flex-nowrap flex-wrap gap-5 gap-y-0'>
                <div className="flex-1 min-w-[10rem]">
                    <label className="label">
                        <span className="label-text">Item</span>
                    </label>
                    <input value={formData.name} onChange={handleChange} required={true} id="name" type="text" placeholder="Name" className="input input-bordered input-primary w-full h-10" />
                    <textarea onChange={handleChange} value={formData.description} id="description" className="textarea textarea-primary w-full mt-3" placeholder="Description"></textarea>
                </div>

                <div className="">
                    <label className="label">
                        <span className="label-text">Qty</span>
                    </label>
                    <input value={formData.quantity} onChange={(e) => {
                        setFormData({ ...formData, quantity: parseInt(e.target.value), total: parseInt(e.target.value) * parseInt(formData.price) })
                    }} required={true} id="quantity" type="number" placeholder={1}
                        min={1}
                        className="input input-bordered input-primary w-[5rem] h-10" />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input value={formData.price} onChange={(e) => {
                        setFormData({ ...formData, price: parseInt(e.target.value), total: parseInt(e.target.value) * parseInt(formData.quantity) })
                    }} required={true} id="price" type="number" placeholder={0}
                        min={0}
                        className="input input-bordered input-primary lg:w-[6rem] w-[5rem] h-10" />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Sub Total</span>
                    </label>
                    <input value={formData.total} disabled={true} required={true} id="total" type="number" placeholder="0"
                        min={0}
                        className="input input-bordered input-primary lg:w-[6rem] w-[5rem] h-10" />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Action</span>
                    </label>
                    <button type="submit" className='bg-primary w-10 h-10 flex items-center justify-center rounded-full hover:scale-95'>
                        <FaPlus />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Products;

const Product = ({ product, handleDelete }) => {
    const { products, setProducts } = useAppContext();

    const handleChange = (e) => {
        let val = e.target.id === "quantity" || e.target.id === "price" ? parseInt(e.target.value) : e.target.value;
        setProducts(products.map((it) => it.id === product.id ? { ...it, [e.target.id]: val } : it));
    }

    return (
        <div className='w-full flex lg:flex-nowrap flex-wrap gap-5 gap-y-0'>
            <div className="flex-1 min-w-[10rem]">
                <label className="label">
                    <span className="label-text">Item</span>
                </label>
                <input id="name" onChange={handleChange} value={product.name} type="text" placeholder="Name" className="input input-bordered w-full h-10" />
                <textarea id="description" onChange={handleChange} value={product.description} className="textarea textarea-bordered w-full mt-3" placeholder="Description"></textarea>
            </div>

            <div className="">
                <label className="label">
                    <span className="label-text">Qty</span>
                </label>
                <input id="quantity" onChange={handleChange} value={product.quantity} type="number" placeholder="0"
                    min={1}
                    className="input input-bordered w-[5rem] h-10" />
            </div>

            <div className="">
                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <input id="price" onChange={handleChange} value={product.price} type="number" placeholder="0"
                    min={0}
                    className="input input-bordered w-[6rem] h-10" />
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Sub Total</span>
                </label>
                <input readOnly={true} value={product.total} type="number" placeholder="0"
                    min={0}
                    className="input input-bordered w-[6rem] h-10" />
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Action</span>
                </label>
                <button onClick={() => handleDelete(product.id)} className='bg-error w-10 h-10 flex items-center justify-center rounded-full hover:scale-95'>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}