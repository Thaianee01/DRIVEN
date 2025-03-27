import React from 'react';

export default function Suggestion({props}) {
    return (
        <>
            {props.map((props) => (
                <div className="sugestao" key={props.user}>
                    <div className="usuario">
                        <img src={`assets/${props.user}.svg`} alt={props.user} />
                        <div className="texto">
                            <div className="nome">{props.user}</div>
                            <div className="razao">{props.reason}</div>
                        </div>
                    </div>
                    <div className="seguir">Seguir</div>
                </div>
            ))}
        </>
    );
}