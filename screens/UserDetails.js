import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native'
import db from '../db/firebase.config'
import inputStyles from '../styles/inputStyles'

const UserDetails = (props) => {
    const [ user, setUser] = useState({id:"", name:"", email:"", phone:""})
    const [ loading, setLoading] = useState(true)

    const getUserById = async (id) => {
        try {
            // Crear la query
            const query = db.collection('users').doc(id)
            // Obtener el documento
            const doc = await query.get()
            // Transformarlo a un objeto legible con las props que le establecimos
            const data = doc.data()
            setUser({...data, id})
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect( () => {
        getUserById(props.route.params.id)
    }, [])

    const handleChangeText = ( propertyName, value) => {
        setUser({...user, [propertyName]: value})
    }

    const updateUser = async () => {
        try {
            setLoading(true);
            const reference = db.collection('users').doc(user.id)
            await reference.set({
                name: user.name,
                email: user.email,
                phone: user.phone
            })
            setLoading(false)
            Alert.alert("Update succesfully completed!")
            props.navigation.navigate('UserList')
        } catch (error) {
            console.log(error)
        }
    }

    const openConfirmationAlert = async () => {
        Alert.alert("Remove the User", "Are you sure?", [
            { text: "Yes", onPress: () => deleteUser()},
            { text: "No"}
        ])
    }

    const deleteUser = async () => {
        try {
            setLoading(true);
            const reference = db.collection('users').doc(user.id)
            await reference.delete()
            props.navigation.navigate('UserList')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {
                loading? <Text>Loading...</Text> : 
                <ScrollView style={inputStyles.container}>
                    <View style={inputStyles.textInput}>
                        <TextInput
                            placeholder="Your name"
                            onChangeText={ (value) => handleChangeText("name", value) }
                            value={user.name}
                        />
                    </View>
                    <View style={inputStyles.textInput}>
                        <TextInput
                            placeholder="Your email"
                            onChangeText={ (value) => handleChangeText("email", value)}
                            value={user.email}
                            keyboardType='email-address'
                        />
                    </View>
                    <View style={inputStyles.textInput}>
                        <TextInput
                            placeholder="Your phone"
                            onChangeText={ (value) => handleChangeText("phone", value)}
                            value={user.phone}
                        />
                    </View>
                    <View>
                        <Button color="green" title="Update" onPress={() => updateUser()}/>
                    </View>
                    <View>
                        <Button color="red" title="Delete" onPress={() => openConfirmationAlert()}/>
                    </View>
                        
                </ScrollView>
            }
        </>
    )
}

export default UserDetails
