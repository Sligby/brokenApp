const fs = require('fs');
const path = require('path');
const http = require('http');
const { promises: fsPromises } = require('fs');
const urlsScript = require('../urls'); 

jest.mock('http', () => {
    const { EventEmitter } = require('events');
    const mockResponse = new EventEmitter();

    return {
        createServer: () => ({
            listen: (port, cb) => {
                cb();
            },
            close: () => {
                mockResponse.emit('close');
            },
            on: (event, listener) => {
                if (event === 'request') {
                    listener({ headers: { host: 'example.com' } }, mockResponse);
                }
            }
        })
    };
});

jest.mock('fs', () => {
    const fs = jest.requireActual('fs');
    const mockWriteFile = jest.fn((filename, data, options, callback) => {
        callback();
    });

    return {
        ...fs,
        writeFile: mockWriteFile
    };
});

describe('URLs Script Tests', function () {
    it('should download and save URLs', async function () {
        const mockUrls = ['http://example.com'];

        await urlsScript.processUrls(mockUrls);

        // Check if the writeFile function was called with the correct arguments
        expect(fsPromises.writeFile).toHaveBeenCalledWith(
            'example.com.txt',
            expect.any(String),
            'utf8'
        );
    });
});