// import { Request, Response, NextFunction } from "express";
import * as store  from "memory-cache";
import RequestText from "../mongoSchema.js"
import pkg from 'lodash';
import { Types } from "mongoose";
const {assign} = pkg

const cache = new store.Cache();

export const cacheRead = (cacheId: string) => {
  if(cache.get(cacheId)) return cache.get(cacheId);
}

export const cacheWrite = (cacheId: string, payload:any) => {
  if(!cache.get(cacheId)) cache.put(cacheId, payload);
}