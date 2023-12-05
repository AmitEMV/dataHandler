import { WebSocketServer } from 'ws';
import {createClient} from 'redis';
import { TimeSeriesDuplicatePolicies, TimeSeriesEncoding } from '@redis/time-series';

const wsserver = new WebSocketServer({ port: 8080 });

const client = createClient({
  url: 'redis://127.0.0.1:9876'
}); // Redis write instance for data ingestion

await client.connect();

const key = 'performancedata';
const tsExists = await client.exists(key);
const labels = ['perf'];

if(!tsExists){
    await client.ts.create(key, {
    RETENTION: 86400000, 
    ENCODING: TimeSeriesEncoding.UNCOMPRESSED, 
    DUPLICATE_POLICY: TimeSeriesDuplicatePolicies.BLOCK
  });
}

wsserver.on('connection', (socket) => {
    socket.on('message', async (data) => {  
        var curTime = new Date().getTime();
        var perfData = JSON.parse(data);
        var num = Number(perfData.systemMemoryUsage);
        await client.ts.add(key, curTime, num);
    });
});

wsserver.on('close', () => {
    client.quit();
});

console.log('Service is now running ... ');
