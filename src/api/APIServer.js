import { rest, setupWorker } from 'msw';

const handlers = [
    rest.get('/api/checkup-result', (req, res, ctx) => {
        // error handling example
        const errorCode = req.url.searchParams.get('error_code');

        if (errorCode) {
            return res(ctx.status(errorCode));
        }

        return res(
            ctx.status(200),
            ctx.delay(500),
            ctx.json([
                {
                    registrationDate: '2022-11-02',
                    specimen: 'EDTA',
                    reportDate: '2022-11-02',
                    orderDate: '2022-11-02',
                    checkupName: 'WBC',
                    resultValue: '10',
                    previousResultValue: '7',
                    referenceValue: '15 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-10-02',
                    specimen: 'EDTA',
                    reportDate: '2022-10-02',
                    orderDate: '2022-10-02',
                    checkupName: 'WBC',
                    resultValue: '20',
                    previousResultValue: '7',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-09-02',
                    specimen: 'EDTA',
                    reportDate: '2022-09-02',
                    orderDate: '2022-09-02',
                    checkupName: 'WBC',
                    resultValue: '8',
                    previousResultValue: '7',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-01-02',
                    specimen: 'EDTA',
                    reportDate: '2022-01-02',
                    orderDate: '2022-01-02',
                    checkupName: 'WBC',
                    resultValue: '15',
                    previousResultValue: '7',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-11-02',
                    specimen: 'EDTA',
                    reportDate: '2022-11-02',
                    orderDate: '2022-11-02',
                    checkupName: 'RBC',
                    resultValue: '5',
                    previousResultValue: '10',
                    referenceValue: '15 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-10-02',
                    specimen: 'EDTA',
                    reportDate: '2022-10-02',
                    orderDate: '2022-10-02',
                    checkupName: 'RBC',
                    resultValue: '30',
                    previousResultValue: '10',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-09-02',
                    specimen: 'EDTA',
                    reportDate: '2022-09-02',
                    orderDate: '2022-09-02',
                    checkupName: 'RBC',
                    resultValue: '5',
                    previousResultValue: '10',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '2022-01-02',
                    specimen: 'EDTA',
                    reportDate: '2022-01-02',
                    orderDate: '2022-01-02',
                    checkupName: 'RBC',
                    resultValue: '20',
                    previousResultValue: '10',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
            ]),
        );
    }),
];

export default handlers;

export const worker = setupWorker(...handlers);
