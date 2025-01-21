import React, { useState } from 'react'

export function Hexinput() {
    const [colorValue, SetColorValue] = useState('#34495e');
    const [colorRgbValue, SetColorRgbValue] = useState(convert(colorValue));
    const [strError, SetStrError] = useState(false);

    const errColor = '#e74c3c';
    const errMessage = 'Ошибка!';

    function convert(hex: string): string | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) {
            return null;
        }
        result.shift();
        return result ? `rgb(${result.map(i => parseInt(i, 16)).join(', ')})` : null;
    }

    function checkColor(color: string): boolean {
        return /^#?([\da-f]{6})$/i.test(color);
    }


    const handleColorChange = ({ target }) => {
        const { value } = target;
        SetColorValue(value);        
        if (value.length === 7) {
            if (checkColor(value)) {

                SetStrError(false);
                SetColorRgbValue(convert(value));
            }
            else {
                SetStrError(true);
                SetColorRgbValue(convert(errColor));
            }

        }
    }

    return (
        <figure style={{ backgroundColor: colorRgbValue }}>
            <input
                value={colorValue}
                onChange={handleColorChange}
                type="text"
                className="hex-field js-hex-field"
                placeholder="#000000" />
            <div className="message">{strError ? errMessage : colorRgbValue}</div>
        </figure>
    );
};


