import React, { useState } from 'react';

import ChartElement from './ChartElement';
import DatePickerElement from './DatePickerElement';

const Main = () => {
    const [date, setDate] = useState();

    return (
        <>
            <DatePickerElement setDate={setDate} />
            <ChartElement date={date} />
        </>
    );
};

export default Main;
