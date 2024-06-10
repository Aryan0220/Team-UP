"use client";

import { memo } from "react";
import { Cursor } from "./cursor";
import { useOthersConnectionIds } from "@/liveblocks.config";

const Cursors = () => {
    const ids = useOthersConnectionIds();
    return(
        <>
            {ids.map((connectionId) => (
                <Cursor 
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return (
        <>
            <Cursors />
        </>
    );
});

CursorsPresence.displayName = "CursorsPresence"