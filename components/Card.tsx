import React, {Component} from 'react'

type CardProps = {
    title:string,
    children: Component,
}

const Card = (props:any) => {
    return (<>
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                {props.children}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div></div></>)
};
export default Card;