import React from "react";
export default class LeftPanel extends React.Component{
    state={
        order:["None","newest","relevance","oldest"],
        sections:[
            {display:"Business",value:"business",},
            {display:"Technology",value:"technology",},
            {display:"Politics",value:"politics",},
            {display:"LifeStyle",value:"lifeandstyle"}],
    }
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let s1 = {...this.props.option}
        s1[input.name]=input.value;
        this.props.onOptionChange(s1);
    }
    render(){
        const{order,sections}=this.state;
        const{orderby="",section}=this.props.option;
        return(<div className="row border my-2 bg-light">
            <div className="col-12">
            {this.makeDD(order,orderby,"orderby","Order By")}<br/><hr/>
           <br/><br/> {this.makeRadio(sections,section,"section","Sections")}
            </div>
        </div>)

    }
    makeDD=(arr,value,name,label)=>(
        <React.Fragment>
            <label className="font-weight-bold bg-light">{label}</label><br/>
            <select className="from-control" name={name} value={value} onChange={this.handleChange}>
                <option  value="">{label}</option>
                {arr.map(v=><option key={v}>{v}</option>)}
            </select>
        </React.Fragment>
    );
    makeRadio=(arr,value,name,label)=>(
        <React.Fragment>
         <label className="font-weight-bold bg-light">{label}</label>
         {arr.map(v=><div className="form-check"key={v.value}>
                <input type="radio" className="form-check-input" name={name} value={v.value}
                checked={value==v.value} onChange={this.handleChange}/>
                <label className="form-check-label">{v.display}</label>
            </div>)}
        </React.Fragment>
    )
}