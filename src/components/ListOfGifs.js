import React, {useEffect, useState} from 'react'
import Gif from './Gif'
import getGifs from '../services/getGifs'

export default function ListOfGifs ({ params }) {
  const { keyword } = params
  const [gifs, setGifs] = useState(
    { loading: false, results: [] })

  // This funcion only execute one time for [] in second param.
  useEffect(function() {
    setGifs(actualGifs => ({loading: true, results: actualGifs.results}))
    
    getGifs({ keyword })
    .then(gifs => {
      setGifs({loading: false, results: gifs})
      })
  }, [keyword])

  if (gifs.loading) return <i>Cargando...</i>

  return <>
    {
      gifs.results.map(({id, title, url}) => 
        <Gif
          id={id} 
          key={id}
          title={title}
          url={url}
        />
      )
    }
  </>
}