import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';

const FrontPage = () => {

    return (
        <section className='container'>
            <h1 className='large text-primary'>Review a course</h1>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input type='school' placeholder='Search by school' name='school' value={school} onChange={(e) => onChange(e)} />
                </div>
                <input type='submit' className='btn btn-primary' value='FrontPage' />
            </form>
        </section>
    )
}

export default Front - page
