import React from 'react'
import { Background } from '../../components/atoms/Background'
import { Logo } from '../../components/atoms/Logo'
import { Header } from '../../components/atoms/Header'
import { Button } from '../../components/atoms/Button'
import { Paragraph } from '../../components/atoms/Paragraph'

export default function StartScreen ({ navigation }) {
    return (
        <Background>
            <Logo />
            <Header>OptiFarm</Header>
            <Paragraph>
                A new way to manage your herd
            </Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
                Login
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate('RegisterScreen')}>
                Sign Up
            </Button>
        </Background>
    )
}