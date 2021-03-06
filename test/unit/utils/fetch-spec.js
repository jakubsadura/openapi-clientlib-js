// tests for saxo.utils.fetch.convertFetchResponse
import { convertFetchResponse } from '../../../src/utils/fetch';
import { FetchResponse } from '../mocks/fetch';

describe('utils fetch', () => {
    it('images are downloaded as a binary blob', (done) => {
        const contentType = 'image/jpeg';
        const result = new FetchResponse(200, 'this is a binary image', contentType);
        const promise = convertFetchResponse('url', 'body', result);

        promise.then((response) => {
            expect(response.response).toEqual('this is a binary image');
            expect(response.status).toEqual(200);
            expect(response.headers.get('content-type')).toEqual(contentType);
            expect(response.responseType).toEqual('blob');
            done();
        });

        Promise.resolve(promise);
    });

    it('json is downloaded and converted to an object', (done) => {
        const contentType = 'application/json';
        const result = new FetchResponse(200, '{"test":1}', contentType);
        const promise = convertFetchResponse('url', 'body', result);

        promise.then((response) => {
            expect(response.response).toEqual({ test: 1 });
            expect(response.status).toEqual(200);
            expect(response.headers.get('content-type')).toEqual(contentType);
            expect(response.responseType).toEqual('json');
            done();
        });

        Promise.resolve(promise);
    });

    it('xslx is downloaded as a binary blob', (done) => {
        const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const result = new FetchResponse(200, 'this is a binary string', contentType);
        const promise = convertFetchResponse('url', 'body', result);

        promise.then((response) => {
            expect(response.response).toEqual('this is a binary string');
            expect(response.status).toEqual(200);
            expect(response.headers.get('content-type')).toEqual(contentType);
            expect(response.responseType).toEqual('blob');
            done();
        });

        Promise.resolve(promise);
    });

    it('unknown file types are downloaded as text', (done) => {
        const contentType = 'unknown/file';
        const result = new FetchResponse(200, 'this is a string', contentType);
        const promise = convertFetchResponse('url', 'body', result);

        promise.then((response) => {
            expect(response.response).toEqual('this is a string');
            expect(response.status).toEqual(200);
            expect(response.headers.get('content-type')).toEqual(contentType);
            expect(response.responseType).toEqual('text');
            done();
        });

        Promise.resolve(promise);
    });

    it('empty responses throw an error', () => {
        expect(() => {
            convertFetchResponse('url', 'body', null);
        }).toThrow();
    });
});
