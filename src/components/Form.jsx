import React, { useEffect, useState } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
    });

    const [output, setOutput] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            setOutput(JSON.parse(storedData));
        }
    }, []);

    function handleSubmits(e) {
        e.preventDefault();
        const newData = [...output, formData];
        setOutput(newData);
        localStorage.setItem('data', JSON.stringify(newData));
        setFormData({ firstName: '', lastName: '', email: '', address: '' });
    }

    const deleteData = (index) => {
        const updatedData = output.filter((_, i) => i !== index);
        setOutput(updatedData);
        localStorage.setItem('data', JSON.stringify(updatedData));
    };

    const deleteAllData = () => {
        localStorage.removeItem('data');
        setOutput([]);
    };

    return (
        <div className='flex justify-center items-center flex-col min-h-screen px-5'>
            <form onSubmit={handleSubmits} className='flex flex-col max-w-[400px] gap-2 border border-solid border-black p-4 rounded-lg'>
                <input required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} type="text" placeholder='First Name ' className='py-2 px-3 outline-none border border-solid border-black shadow-lg rounded-lg' />
                <input required value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} type="text" placeholder='Last Name ' className='py-2 px-3 outline-none border border-solid border-black shadow-lg rounded-lg' />
                <input required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="text" placeholder='Email ' className='py-2 px-3 outline-none border border-solid border-black shadow-lg rounded-lg' />
                <input required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" placeholder='Address ' className='py-2 px-3 outline-none border border-solid border-black shadow-lg rounded-lg' />
                <button type='submit' className='py-2 px-3 shadow-lg rounded-lg bg-blue-600 text-white font-bold'>Submit</button>
            </form>
            <div className='mt-10 flex  gap-5 justify-center  gap-y-5 w-full flex-wrap'>
                {output.map((item, index) => (
                    <div className='relative  max-w-[400px]' key={index}>
                        <button onClick={() => deleteData(index)} className='absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center'>❌</button>
                        <table className='space-2 border border-solid rounded-xl max-w-[400px] w-full border-black flex p-5'>
                            <tbody className='flex flex-col gap-y-2'>
                                <tr>
                                    <th className='text-left'>First Name :</th>
                                    <td className='text-left'>{' '}{item.firstName}</td>
                                </tr>
                                <tr>
                                    <th className='text-left'>Last Name : </th>
                                    <td className='text-left'>{' '}{item.lastName}</td>
                                </tr>
                                <tr>
                                    <th className='text-left'>Email : </th>
                                    <td className='text-left'>{' '}{item.email}</td>
                                </tr>
                                <tr>
                                    <th className='text-left'>Address : </th>
                                    <td className='text-left'>{' '}{item.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
                {output.length === 0 ? (
                    <h1 className='text-2xl font-bold text-center mt-2'>No Data</h1>
                ) : (
                    <button onClick={deleteAllData} className='py-2 mt-2 px-3 shadow-lg rounded-lg bg-red-600 text-white font-bold'>Delete All</button>
                )}
        </div>
    );
};

export default Form;