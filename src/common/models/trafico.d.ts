export interface trafico {
    name: string;
    rxPacketsPerSecond: number;
    rxBitsPerSecond: number;
    fpRxPacketsPerSecond: number;
    fpRxBitsPerSecond: number;
    txPacketsPerSecond: number;
    txBitsPerSecond: number;
    fpTxPacketsPerSecond: number;
    fpTxBitsPerSecond: number;
    txQueueDropsPerSecond: number;
}