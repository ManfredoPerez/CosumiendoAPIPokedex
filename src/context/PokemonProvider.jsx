// import React from 'react'

import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm"

export const PokemonProvider = ({ children }) => {

    const [allPokemons, setALlPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)

    //Utilizacion CustomHook 
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: ''
    })


    //Estados Simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)


    //Llama 50 pokemones de la API
    const getAllPokemons = async(limit = 50) => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon?limit${limit}&offset=${offset}`)
        const data = await res.json();
        // console.log(data)

        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)

        setALlPokemons([
            ...allPokemons,
            ...results
        ])
        setLoading(false)

    }

    //Llamar a todos lo Pokemones 
    const getGlobalPokemons = async() => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json();
        // console.log(data)

        const promises = data.results.map(async(pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)

        setGlobalPokemons(results)
        setLoading(false)
    }

    //Buscar Pokemon por ID
    const getPokemonByID = async(id) => {
        const baseURL = 'https://pokeapi.co/api/v2/'

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await  res.json()
        return data
    }

    useEffect(() =>{
        getAllPokemons()
    }, [])

    useEffect(() =>{
        getGlobalPokemons()
    }, [])
  
    return (
        <PokemonContext.Provider value={{
                valueSearch,
                onInputChange, 
                onResetForm,
                allPokemons,
                globalPokemons,
                getPokemonByID
        }}
        >
            {children}
        </PokemonContext.Provider>
    );
}