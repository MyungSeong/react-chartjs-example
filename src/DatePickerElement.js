import React, { memo, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerElement = ({ setDate }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        setDate({ startDate, endDate });
    }, [startDate, endDate]);

    return (
        <Container>
            <StyledDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat='yyyy-MM-dd'
                locale={ko}
                selectsStart
                startDate={startDate}
                endDate={endDate}
            />
            <StyledDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat='yyyy-MM-dd'
                locale={ko}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
            />
        </Container>
    );
};

const Container = styled.div`
    display: grid;
`;

const StyledDatePicker = styled(DatePicker)`
    margin-top: 1.5rem;
    width: 150px;
    height: 42px;
    box-sizing: border-box;
    padding: 8px 20px;
    border-radius: 4px;
    border: 1px solid lightGray;
    font-size: 12px;
    font-family: fantasy;
`;

export default memo(DatePickerElement);
