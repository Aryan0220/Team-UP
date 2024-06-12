"use client";

import { colorToCss } from "@/lib/utils";
import { Color, Camera } from "@/types/canvas";

interface ColorPickerProps {
    camera: Camera;
    onChange: (color: Color) => void;
}

export const ColorPicker = ({onChange}: ColorPickerProps) => {
    return (
        <div
            className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton color={{r: 255, g: 0, b: 0}} onClick={onChange} />{/* red */}
            <ColorButton color={{r: 68, g: 202, b: 99}} onClick={onChange} />{/* green */}
            <ColorButton color={{r: 173, g: 216, b: 230}} onClick={onChange} />{/* blue */}
            <ColorButton color={{r: 255, g: 249, b: 99}} onClick={onChange} />{/* yellow */}
            <ColorButton color={{r: 0, g: 0, b: 0}} onClick={onChange} />{/* black */}
            <ColorButton color={{r: 255, g: 0, b: 255}} onClick={onChange} />{/* purple */}
            <ColorButton color={{r: 230, g: 149, b: 0}} onClick={onChange} />{/* orange */}
            <ColorButton color={{r: 255, g: 255, b: 180}} onClick={onChange} />{/* cream */}
        </div>
    )
}

interface ColorButtonProps {
    onClick: (color : Color) => void;
    color: Color;
};

const ColorButton = ({
    onClick,
    color,
}: ColorButtonProps) => {
    return(
        <button
            className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
                className="h-8 w-8 rounded-md border border-neutral-300"
                style={{
                    background: colorToCss(color)
                }}
            />
        </button>
    )
}
