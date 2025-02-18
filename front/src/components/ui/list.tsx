import { Card,CardTitle,CardContent,CardHeader } from "./card";
import React, { ReactHTMLElement, RefObject, useRef } from "react";
import { Label } from "./label";
import { Input } from "./input";

export interface IListProps {
    title?:string;
    content:ReactHTMLElement<HTMLElement>;
    key:string|number
}
const list = React.forwardRef(({list}:{list:IListProps[]},listRef:RefObject<HTMLElement>)=>{

    const elem = list.map((elem:IListProps)=>{

        return <article>
                <Card>
                        <CardHeader>
                            <CardTitle>{elem.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                                {elem.content}
                        </CardContent>
                </Card>
        </article>
    });

    return (
        <section ref={listRef}>
                {(elem.length==0) ?<h1>No existen datos</h1>:elem}   
        </section>
    );
});

export {list as List}