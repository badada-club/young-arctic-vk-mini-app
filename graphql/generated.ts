export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Event = {
  __typename?: 'Event';
  creatorVkId: Scalars['String'];
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  groupVkId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type EventInput = {
  creatorVkId: Scalars['String'];
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  groupVkId: Scalars['String'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<Event>;
};


export type MutationCreateEventArgs = {
  input?: InputMaybe<EventInput>;
};

export type Query = {
  __typename?: 'Query';
  getEvents: Array<Maybe<Event>>;
};
