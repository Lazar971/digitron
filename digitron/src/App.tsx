import * as React from 'react';
import './App.css';
import Dugme from './Dugme'
import {Table,Input} from 'semantic-ui-react';

let pocetnaOperacija=(a:number,b:number)=>a;
let pocetnoStanje={
    prvi:0,
    drugi:0,
    operacija:pocetnaOperacija,
    tekst:"",
    prviAkt:true,
    dec:-1,
}
class App extends React.Component<any,typeof pocetnoStanje> {
    constructor(props:any){
        super(props);
        this.state=pocetnoStanje;
    }
    public brisanje=(e:any)=>{
        this.setState(pocetnoStanje);
    }
    public promena=(k:number)=>(e:any)=>{
        if(this.state.prviAkt){
            this.setState({prvi:this.state.prvi*k,tekst:(this.state.prvi*k).toFixed(2).toString()});
            return;
        }
        this.setState({drugi:this.state.drugi*k,tekst:(this.state.drugi*k).toFixed(2).toString()});
    }
    public broj=(k:number)=>(e:any)=>{
        if(this.state.prviAkt){
            if(this.state.dec===-1)
                this.setState((prev:typeof pocetnoStanje)=>{
                  return  {prvi:prev.prvi*10+k,tekst:(prev.prvi*10 +k).toFixed(2)}
                });
            else {
                let d=this.state.dec+1;
                for(let i=0;i<d;i++)
                    k=k/10;
                this.setState((prev:typeof pocetnoStanje)=>{
                   return {prvi: prev.prvi +k, dec: d,tekst: (prev.prvi +k).toFixed(2)};
                })
            }

            return
        }
        if(this.state.dec===-1)
            this.setState((prev:typeof pocetnoStanje)=>{
                return  {drugi:prev.drugi*10+k,tekst:(prev.drugi*10 +k).toFixed(2).toString()}
            });
        else {
            let d=this.state.dec+1;
            for(let i=0;i<d;i++)
                k=k/10;
            this.setState((prev:typeof pocetnoStanje)=>{
                return {drugi: prev.drugi +k, dec: d,tekst: (prev.drugi +k).toFixed(2).toString()};
            })
        }
    }
    public tacka=(e:any)=>{
        if(this.state.dec===-1)
            this.setState({dec:0});
    }
    public promeniOperaciju = (foo:typeof pocetnaOperacija)=>(e:any)=>{
        let a=this.state.operacija!==pocetnaOperacija;
        if(a)
            this.izvrsi(e);
        this.setState({operacija:foo,prviAkt:false,dec:-1});
        if(!a)
            this.setState({tekst:""});
    }
    public izvrsi=(e:any)=>{
        let a=this.state.operacija(this.state.prvi,this.state.drugi);
        this.setState({prvi:a,drugi:0,operacija:pocetnaOperacija,prviAkt:true,tekst:a.toFixed(2)});
    }

  public render() {
    return (
      <div className="App">
        <Table  >
            <Table.Row  >
                <Table.Cell width={4}>
                    <Input value={this.state.tekst}/>
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell>
                    <Dugme onClick={this.brisanje} tekst='AC'/>
                </Table.Cell>
                <Table.Cell>
                    <Dugme onClick={this.promena(-1)} tekst='+/-'/>
                </Table.Cell>
                <Table.Cell>
                    <Dugme onClick={this.promena(100)} tekst='%'/>
                </Table.Cell>
                <Table.Cell>
                    <Dugme onClick={this.promeniOperaciju((a:number,b:number)=>a/b)} tekst='/'/>
                </Table.Cell>
            </Table.Row>
            <Table.Row >
                {[7,8,9].map(
                    (value)=>(
                        <Table.Cell>
                            <Dugme onClick={this.broj(value)} tekst={value.toFixed(0)}/>
                        </Table.Cell>
                    )


                    )
                }
                <Table.Cell>
                    <Dugme onClick={this.promeniOperaciju((a:number,b:number)=>a*b)} tekst='x'/>
                </Table.Cell>
            </Table.Row>
            <Table.Row >

                    {[4,5,6].map(
                        (value)=>(
                            <Table.Cell>
                                <Dugme onClick={this.broj(value)} tekst={value.toFixed(0)}/>
                            </Table.Cell>
                        )


                    )
                    }
                    <Table.Cell>
                        <Dugme onClick={this.promeniOperaciju((a:number,b:number)=>a-b)} tekst='-'/>
                    </Table.Cell>
            </Table.Row>
            <Table.Row >

                    {[1,2,3].map(
                        (value)=>(
                            <Table.Cell>
                                <Dugme onClick={this.broj(value)}  tekst={value.toFixed(0)}/>
                            </Table.Cell>
                        )


                    )
                    }
                    <Table.Cell>
                        <Dugme onClick={this.promeniOperaciju((a:number,b:number)=>a+b)} tekst='+'/>
                    </Table.Cell>
            </Table.Row>
            <Table.Row >
                <Table.Cell width={2}>
                    <Dugme onClick={this.promena(0)} tekst={'0'}/>
                </Table.Cell>
                <Table.Cell>
                    <Dugme onClick={this.tacka} tekst={'.'}/>
                </Table.Cell>
                <Table.Cell>
                    <Dugme onClick={this.izvrsi} tekst='='/>
                </Table.Cell>
            </Table.Row>
        </Table>
      </div>
    );
  }
}

export default App;
