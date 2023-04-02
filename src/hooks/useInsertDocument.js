// logica de adição de dados do firebase
//hook de inserção de dados separados 
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

//funções que precisamos do firebase. Collection, pq no firebase não são tabelas, cada lugar que salvamos um dado nomeado de collection. 
//temos collection de posts, categorias de posts, etc...
// addDoc, vai fazer o insert do documento no banco de dados 
//Timestamp, vai marcar o horario que post foi criado
import { collection, addDoc, Timestamp } from "firebase/firestore";


//estado inicial para o useReducer
const initialState = {
    loading: null,
    error: null
}

//reducer, aceitando estado e ação que queremos executar 
const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSETED_DOC":
            return { loading: false, eror: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

//docColection, o programador quando vai inserir algo no sistema ele vai formar qual a collection assim conseguimos que o hookinsira qualquer elemento que precisaremos  
// passamos dentro do usereducer, qual a função que vai tratar dos eventos do reducer (inserReducer), e tmb o estado inicial (initialState) 
export const useInsertDocument = (docColection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak 
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }


    const InsertDocument = async (document) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        })
        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }

            const InsertDocument = await addDoc(
                collection(db, docColection),
                newDocument
            )

            checkCancelBeforeDispatch({
                type: "INSETED_DOC",
                payload: InsertDocument,
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }

    useEffect(() => {
        setCancelled(true)
    }, [])

    return { InsertDocument, response };
}