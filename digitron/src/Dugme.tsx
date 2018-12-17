import * as React from 'react';
import {Button} from 'semantic-ui-react';

interface IDugme{
    tekst:String,
    onClick:(e:any)=>(void)

}
export default (props:IDugme)=>(
    <Button onClick={props.onClick}>{props.tekst}</Button>
)