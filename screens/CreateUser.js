import React, { useState } from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native'
import inputStyles from '../styles/inputStyles'
import db from '../db/firebase.config'

const CreateUser = (props) => { 
    /**el Stack Navigator le provee unas props a los componentes Screen para que puedan acceder
     * al stack de navegación y asi redirigir a otra pantalla */
    const [ input, setInput ] = useState({name: "", email: "", phone: ""})
    const [loading, setLoading] = useState(false)

    const handleChangeText = ( propertyName, value) => {
        setInput({...input, [propertyName]: value})
    }

    const createNewUser = async () => {
        if(input.name === "" || input.email === "" || input.phone === "") 
            Alert.alert("Provide complete the form");
        else{
            try {
                setLoading(true)
                await db.collection('users').add({
                    name: input.name,
                    email: input.email,
                    phone: input.phone
                })
                props.navigation.navigate('UserList'); 
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
        {
            loading? <Text>Saving user...</Text> :
                <ScrollView style={inputStyles.container}>
                    <View style={inputStyles.textInput}>
                        <TextInput
                            placeholder="Your name"
                            onChangeText={ (value) => handleChangeText("name", value) }
                        />
                    </View>
                    <View style={inputStyles.textInput}>
                        <TextInput
                            placeholder="Your email"
                            onChangeText={ (value) => handleChangeText("email", value)}
                            keyboardType='email-address'
                        />
                    </View>
                    <View style={inputStyles.textInput}>
                        <TextInput
                            placeholder="Your phone"
                            onChangeText={ (value) => handleChangeText("phone", value)}
                        />
                    </View>
                    <View>
                        <Button
                            title="Save User"
                            onPress={() => createNewUser()}/>
                    </View>
                </ScrollView>

        }
        </>
    )
}

export default CreateUser
