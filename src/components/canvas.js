import {SketchField, Tools} from 'react-sketch';
import React from 'react'

export default class SketchFieldDemo extends React.Component {
     render() {
        return (
            <SketchField width='1024px'
                         height='768px'
                         tool={Tools.Pencil}
                         color='black'
                         backgroundColor='#000000'
                         lineWidth={3}/>
        )
     }
}
