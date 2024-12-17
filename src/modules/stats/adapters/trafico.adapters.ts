import {trafico } from "@/common/models/trafico";

export const traficoAdapter = (data): trafico => {
  return {
    name: data.name,
    rxPacketsPerSecond: data.rxPacketsPerSecond,
    rxBitsPerSecond: data.rxBitsPerSecond,
    fpRxPacketsPerSecond: data.fpRxPacketsPerSecond,
    fpRxBitsPerSecond: data.fpRxBitsPerSecond,
    txPacketsPerSecond: data.txPacketsPerSecond,
    txBitsPerSecond: data.txBitsPerSecond,
    fpTxPacketsPerSecond: data.fpTxPacketsPerSecond,
    fpTxBitsPerSecond: data.fpTxBitsPerSecond,
    txQueueDropsPerSecond: data.txQueueDropsPerSecond,
    };
}