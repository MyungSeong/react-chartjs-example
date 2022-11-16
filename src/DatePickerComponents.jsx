import React, { memo, useEffect, useState, useRef } from 'react';
import { DateRange } from 'react-date-range';
import { subDays, subYears } from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale';
import moment from 'moment/moment';
import i18n from 'i18next';
import styled from 'styled-components';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import './styles/DatePickerComponents.css';

const DatePickerComponents = ({ setDate }) => {
    const ref = useRef(null);

    const [dates, setDates] = useState([0, 0]);
    const [visibleCalendar, setVisibleCalendar] = useState(true);
    const [focusedDateRange, setFocusedDateRange] = useState([0, 0]);

    useEffect(() => {
        if (i18n.isInitialized) return;
    }, [i18n.isInitialized]);

    useEffect(() => {
        document.addEventListener('mousedown', clickedOutside);

        return () => {
            document.removeEventListener('mousedown', clickedOutside);
        };
    }, [visibleCalendar]);

    const visibleCalendarHandler = () => {
        if (focusedDateRange[1] === 1) {
            setVisibleCalendar(false);
        }
    };

    const clickedOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setVisibleCalendar(false);
        }
    };

    const onSelectDateRanges = ({ selection }) => {
        let { startDate, endDate } = selection;

        startDate = moment(startDate);
        startDate = startDate.isValid() ? startDate.toDate() : undefined;

        endDate = moment(endDate);
        endDate = endDate.isValid() ? endDate.toDate() : undefined;

        setDates([startDate, endDate]);
        setDate({ startDate, endDate });
    };

    return (
        <div className={visibleCalendar ? 'date-range-modal' : ''}>
            {visibleCalendar && (
                <div ref={ref} className='date-range-modal-2'>
                    <DateRange
                        locale={
                            i18n.language.substring(0, 2) in dateFnsLocales
                                ? dateFnsLocales[i18n.language.substring(0, 2)]
                                : dateFnsLocales['enUS']
                        }
                        months={1}
                        onChange={(range) => {
                            onSelectDateRanges(range);
                            visibleCalendarHandler();
                        }}
                        focusedRange={focusedDateRange}
                        onRangeFocusChange={setFocusedDateRange}
                        showMonthAndYearPickers={true}
                        moveRangeOnFirstSelection={false}
                        showDateDisplay={false}
                        ranges={[
                            {
                                startDate: dates[0],
                                endDate: dates[1],
                                key: 'selection',
                            },
                        ]}
                        staticRanges={undefined}
                        inputRanges={undefined}
                        maxDate={subDays(new Date(), 0)}
                        // scroll={{ enable: true }}
                    />
                </div>
            )}
        </div>
    );
};

export default memo(DatePickerComponents);
