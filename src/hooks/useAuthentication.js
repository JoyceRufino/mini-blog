// quando trabalhamos com autentificação no firebase, os usuários não ficam salvos no banco de dados da firestore , mas sim em outro serviço que é o Athentication Firebase 

// a unica coisa que salva no banco de dados do Firebase c autentificação é email e senha (configurei desta forma no inicio do projeto, no painel do firebase)

// até o displayName, eu preciso fazer uma atualização do usuário para salvar depois. Portanto, vamos criar um usuario com email e senha ( createUserWithEmailAndPassword), e depois vamos atualizar com o nome (updateProfile)

import { db } from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'
import { async } from '@firebase/util'

// vou criar a função do hook já com export para poder utlizar em outros lugares

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // instrução cleanup = neste projeto terei muitas mudanças de componentes entre páginas, e dessa forma não posso deixar resquicios de funções sendo executadas. 
    // deal with memory leak 
    // a função sera para cancelar as funções apos elas terem dado certo. 
    const [cancelled, setCancelled] = useState(false)


    //getAuth nada mais é do que uma requisição bem rapida para confirmar que o usuário esta logado, ai conseguimos prosseguir no sistema

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true);
        setError(null);

        try {

            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if (error.message.includes("Password")) {
                systemErrorMessage = "Asenha precisa conter pelo menos 6 caracteres!"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado!"
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde!"
            }
            setLoading(false)
            setError(systemErrorMessage)

        }


    };
    //logou - sign out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    //login - sinin

    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage;
            if (error.message.includes("Password")) {
                systemErrorMessage = 'Usuário não existe'
            } else if (error.message.includes("wrong-password")){
                systemErrorMessage = "senha incorreta"
            } else {
                systemErrorMessage = 'ocorreu um erro, por favor tente mais tarde'
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])


    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };

}

