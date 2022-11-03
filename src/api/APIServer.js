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
                    registrationDate: '20221102',
                    specimen: 'EDTA',
                    reportDate: '20221102',
                    orderDate: '20221102',
                    checkupName: 'WBC',
                    resultValue: '10',
                    previousResultValue: '7',
                    referenceValue: '10 / -',
                    hl: '-',
                    status: '보고',
                    note: '-',
                    specimenNote: '-',
                },
                {
                    registrationDate: '20221002',
                    specimen: 'EDTA',
                    reportDate: '20221002',
                    orderDate: '20221002',
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
                    registrationDate: '20220902',
                    specimen: 'EDTA',
                    reportDate: '20220902',
                    orderDate: '20220902',
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
                    registrationDate: '20220102',
                    specimen: 'EDTA',
                    reportDate: '20220102',
                    orderDate: '20220102',
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
                    registrationDate: '20221102',
                    specimen: 'EDTA',
                    reportDate: '20221102',
                    orderDate: '20221102',
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
                    registrationDate: '20221002',
                    specimen: 'EDTA',
                    reportDate: '20221002',
                    orderDate: '20221002',
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
                    registrationDate: '20220902',
                    specimen: 'EDTA',
                    reportDate: '20220902',
                    orderDate: '20220902',
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
                    registrationDate: '20220102',
                    specimen: 'EDTA',
                    reportDate: '20220102',
                    orderDate: '20220102',
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
