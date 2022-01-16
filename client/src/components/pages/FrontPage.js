import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import computerImg from '../../logo512.png'

const FrontPage = () => {
    const [formData, setFormData] = useState({
        school: '',
    });
    const { school } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
    }

    return (
        <section className='container'>
            <div className='container'>
                <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr" }}>
                    <div>
                        <h1 className='large text-primary'>Get Access to</h1>
                        <h1 className='large text-primary'>Hundreds of</h1>
                        <h1 className='large text-primary'>Reviews</h1>
                        <h4 className='text-secondary'>Student's #1 Trusted Source</h4>
                        <form className='form' onSubmit={e => onSubmit(e)}>
                            <div className='form-group'>
                                <input type='input' placeholder='Search by school' name='school' value={school} onChange={(e) => onChange(e)} />
                                <input type='submit' className='btn btn-primary' value='Search' />
                            </div>
                        </form>
                    </div>
                    <div style={{ width: '300px', height: '300px' }}>
                        <img src={computerImg} alt='Computer' />
                    </div>
                </div>
            </div>
            <div className='container' style={{ display: 'right', backgroundColor: '#497CFE', width: '50%' }}>
                <p style={{ color: 'white' }}>
                    A long long time ago
                    In a galaxy far away
                    Naboo was under an attack
                    And I thought me and Qui-Gon Jinn
                    Could talk the Federation into
                    Maybe cutting them a little slack
                    But their response, it didn't thrill us
                    They locked the doors and tried to kill us
                    We escaped from that gas
                    Then met Jar Jar and Boss Nass
                    We took a bongo from the scene
                    . . .
                    We were singin', my my, this here Anakin guy
                    May be Vader someday later, now he's just a small fry
                    And he left his home and kissed his mommy goodbye
                    Sayin' "Soon I'm gonna be a Jedi"
                </p>
            </div>
        </section>

    )
}

export default FrontPage;