import style from './Home.module.css'

import React, { Component } from 'react'

import HeroSection from '../../layout/HeroSection/HeroSection'
import FormSection from '../../layout/FormSection/FormSection'

import { Container } from 'react-bootstrap'

export default class Home extends Component {

    render(){

        return (

            <Container>

                <HeroSection />
                <FormSection />

            </Container>

        )

    }

}