import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChartComponents from './ChartComponents';
import DatePickerComponents from './DatePickerComponents';

import { i18n } from './utils';

const Main = () => {
    const [date, setDate] = useState();

    /* const { t } = useTranslation();

    if (router.query['lang'] && typeof router.query.lang === 'string') {
        i18n.changeLanguage(lang);
    }

    document.documentElement.setAttribute('lang', i18n.language); */

    return (
        <>
            <DatePickerComponents setDate={setDate} />
            <ChartComponents date={date} />
            {/* {t('Test')} */}
        </>
    );
};

export default Main;
