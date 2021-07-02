import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button, TouchableOpacity} from 'react-native'
import db from '../db/firebase.config'
import { ListItem, Avatar } from 'react-native-elements'

const UserList = (props) => {
    const [ users, setUsers ] = useState([])
    const [ loading, setLoading ] = useState(true);
    
    const getUsers = async () => {
        try {
            await db.collection('users').onSnapshot( query => {
                const usersTemp = []
                query.docs.forEach( doc => { 
                    const {name, email, phone} = doc.data()
                    usersTemp.push({name,email,phone,id:doc.id})
                })
                setUsers(usersTemp)
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserPressed = (id) => {
        props.navigation.navigate('UserDetails', {
            id
        })
    } 

    useEffect(() => {
        getUsers();
    }, [])
//el Chevron es el icono que va al inicio de la lista
    return (
        <ScrollView>
            { loading? <Text>Loading users...</Text> : 
                <>
                    {
                        users.map( user => 
                            <TouchableOpacity key={user.id} onPress={() => handleUserPressed(user.id)}>
                                <ListItem bottomDivider>
                                    <ListItem.Chevron/>
                                    <Avatar source={{uri: 'https://picsum.photos/128/128'}} rounded/>
                                    <ListItem.Content>
                                        <ListItem.Title>{user.name}</ListItem.Title>
                                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </TouchableOpacity>
                        )
                    }
                    <Button title="Create user" onPress={ () => props.navigation.navigate('CreateUser')}/>
                </>
            }
            
        </ScrollView>
    )
}

export default UserList
