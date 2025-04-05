import React from 'react'
import { useParams } from 'react-router-dom'

function Docs() {

    const { path } = useParams();

    return (
        <div>{path}</div>
    )
}

export default Docs