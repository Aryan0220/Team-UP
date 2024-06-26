"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useSelf, useStorage } from "@/liveblocks.config";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { Hanalei } from "next/font/google";
import { memo } from "react";

interface SelectionBoxProps{
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({
    onResizeHandlePointerDown
}: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) => 
        me.presence.selection.length === 1 ? me.presence.selection[0] : null    
    );

    const isShowingHandles = useStorage((root) => 
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if(!bounds){
        return null;
    }

    return(
        <>
            <rect 
                className="fill-transparent stroke-blue-500 stroke-2 pointer-events-none"
                style={{
                    transform : `translate(${bounds.x}px, ${bounds.y}px)`,
                }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
            {isShowingHandles && (
                <>
                    {/* Top-Left */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
                        }}
                    />
                    {/* Top-Right */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
                            ${bounds.y - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
                        }}
                    />
                    {/* Top */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                            ${bounds.y - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top, bounds);
                        }}
                    />
                    {/* Bottom-Left */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "nesw-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, 
                            ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
                        }}
                    />
                    {/* Left */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, 
                            ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Left, bounds);
                        }}
                    />
                    {/* Bottom-Right */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "nwse-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, 
                            ${bounds.y + bounds.height  - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
                        }}
                    />
                    {/* Bottom */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "ns-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                            ${bounds.y + bounds.height  - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom, bounds);
                        }}
                    />
                    {/* Right */}
                    <rect 
                        className="fill-white stroke-2 stroke-blue-500"
                        style={{
                            cursor: "ew-resize",
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width  - HANDLE_WIDTH / 2}px, 
                            ${bounds.y + bounds.height / 2  - HANDLE_WIDTH / 2}px)`
                        }}
                        x={0}
                        y={0}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Right, bounds);
                        }}
                    />

                </>
                    
            )}
        </>
    )
})

SelectionBox.displayName = "SelectionBox";