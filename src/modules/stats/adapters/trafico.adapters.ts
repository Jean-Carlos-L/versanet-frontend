import {trafico } from "@/common/models/trafico";

export const traficoAdapter = (data): trafico => {
  return {
    name: data.name,
    rxPacketsPerSecond: data.rxPacketsPerSecond,
    rxBitsPerSecond: data.rxBitsPerSecond,
    txPacketsPerSecond: data.txPacketsPerSecond,
    txBitsPerSecond: data.txBitsPerSecond,
    };
}