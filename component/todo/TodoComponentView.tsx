"use client"

import { useEffect, useState } from "react";

interface TodoComponentViewProps {
    title: string
    callback?: () => void
    ticker?: () => void
}

export function TodoComponentView(props: TodoComponentViewProps) {
    useEffect(() => {
        const timeout = props.ticker ? setTimeout(props.ticker, 5000) : undefined

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [])

    return (
        <div
            style={{ padding: '5px', cursor: 'pointer', borderStyle: "solid", borderWidth: '1px', borderColor: 'lightgray', margin: '5px'}}
            onClick={props.callback}
        >
            {props.title}
        </div>
    )
}