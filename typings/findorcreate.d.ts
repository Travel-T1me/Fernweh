declare module 'mongoose-findorcreate' {
  import mongoose from 'mongoose';

  interface FindOrCreateResult<T> {
    doc: T;
    created: boolean;
  }

  interface FindOrCreateOption {
    upsert?: boolean;
  }

  interface FindOrCreateModel<T extends mongoose.Document> extends mongoose.Model<T> {
    findOrCreate(
      conditions: any,
      doc?: any,
      options?: FindOrCreateOption,
      callback?: (err: any, doc: T, created: boolean) => void
    ): Promise<FindOrCreateResult<T>>;
  }

  function findOrCreatePlugin(schema: mongoose.Schema, options?: any): void;

  export = findOrCreatePlugin;
}