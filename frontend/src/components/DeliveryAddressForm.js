import React from 'react';

const DeliveryAddressForm = ({user, full_name, address, city, mobile,
                                 onChange, onSubmit
                             }) => (

    <form className='mt-3' onSubmit={e => onSubmit(e)}>
        {/*<h4 className='text-muted mb-3'>*/}
        {/*    Select Shipping Option:*/}
        {/*</h4>*/}
        {/*{renderShipping()}*/}
        <h5>Delivery Address:</h5>
        <div className='form-group'>
            <label htmlFor='full_name'>Full Name*</label>
            <input
                className='form-control'
                type='text'
                name='full_name'
                placeholder={`${user.username}`}
                onChange={e => onChange(e)}
                value={full_name}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='address'>Address*</label>
            <input
                className='form-control'
                type='text'
                name='address'
                placeholder={'Changping district, China'}
                onChange={e => onChange(e)}
                value={address}
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor='city'>City*</label>
            <input
                className='form-control'
                type='text'
                name='city'
                placeholder={`Beijing`}
                onChange={e => onChange(e)}
                value={city}
            />
        </div>

        <div className='form-group'>
            <label htmlFor='mobile'>Mobile*</label>
            <input
                className='form-control'
                type='tel'
                name='mobile'
                placeholder={'18519204393'}
                onChange={e => onChange(e)}
                value={mobile}
                required
            />
        </div>
        <div className="pt-2">
            <button type='submit' className="btn btn-success">
                Place an Order from DeliveryAddr:
            </button>
        </div>
    </form>
);

export default DeliveryAddressForm;