import { MongoClient, Collection } from 'mongodb';

export const MongoHelper = {
  client: MongoClient,
  uri: String,

  async connect (uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect (): Promise<void> {
    await this.client.close();
    this.client = null;
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri);
    }

    return this.client.db().collection(name);
  }
};
