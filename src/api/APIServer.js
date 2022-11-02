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
                    orderDate: '20221002',
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
                    registrationDate: '20221101',
                    specimen: 'EDTA',
                    reportDate: '20221101',
                    orderDate: '20221001',
                    checkupName: 'RBC',
                    resultValue: '8',
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
