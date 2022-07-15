import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch('https://young-arctic-server.herokuapp.com/graphql', {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Event = IEvent & {
  __typename?: 'Event';
  cost?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type IEvent = {
  cost?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type IUser = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createVkEvent?: Maybe<VkEvent>;
  createVkUser?: Maybe<VkUser>;
  takePart?: Maybe<Scalars['String']>;
};

export type MutationCreateVkEventArgs = {
  input?: InputMaybe<VkEventInput>;
};

export type MutationCreateVkUserArgs = {
  input?: InputMaybe<VkEventInput>;
};

export type MutationTakePartArgs = {
  raffleId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getVkEvents: Array<Maybe<VkEvent>>;
  getVkUsers: Array<Maybe<VkUser>>;
};

export type Raffle = {
  __typename?: 'Raffle';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type RaffleUserInput = {
  __typename?: 'RaffleUserInput';
  raffleId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type User = IUser & {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type VkEvent = IEvent & {
  __typename?: 'VkEvent';
  cost?: Maybe<Scalars['String']>;
  creatorVkId: Scalars['String'];
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  groupVkId: Scalars['String'];
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  raffleId?: Maybe<Scalars['Int']>;
};

export type VkEventInput = {
  cost?: InputMaybe<Scalars['String']>;
  creatorVkId: Scalars['String'];
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  groupVkId: Scalars['String'];
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  raffleName?: InputMaybe<Scalars['String']>;
};

export type VkUser = IUser & {
  __typename?: 'VkUser';
  id: Scalars['ID'];
  name: Scalars['String'];
  vkId: Scalars['String'];
};

export type VkUserInput = {
  __typename?: 'VkUserInput';
  name: Scalars['String'];
  vkId: Scalars['String'];
};

export type CreateEventMutationVariables = Exact<{
  input?: InputMaybe<VkEventInput>;
}>;

export type CreateEventMutation = {
  __typename?: 'Mutation';
  createVkEvent?: {
    __typename?: 'VkEvent';
    id: string;
    name: string;
    date: any;
    description?: string | null;
    cost?: string | null;
    location?: string | null;
    raffleId?: number | null;
    creatorVkId: string;
    groupVkId: string;
  } | null;
};

export type GetEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEventsQuery = {
  __typename?: 'Query';
  getVkEvents: Array<{
    __typename?: 'VkEvent';
    id: string;
    name: string;
    date: any;
    description?: string | null;
    cost?: string | null;
    location?: string | null;
    raffleId?: number | null;
    creatorVkId: string;
    groupVkId: string;
  } | null>;
};

export type TakePartMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  raffleId?: InputMaybe<Scalars['Int']>;
}>;

export type TakePartMutation = { __typename?: 'Mutation'; takePart?: string | null };

export type CreateUserMutationVariables = Exact<{
  input?: InputMaybe<VkEventInput>;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createVkUser?: { __typename?: 'VkUser'; id: string; name: string; vkId: string } | null;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'Query';
  getVkUsers: Array<{ __typename?: 'VkUser'; id: string; name: string; vkId: string } | null>;
};

export const CreateEventDocument = `
    mutation createEvent($input: VkEventInput) {
  createVkEvent(input: $input) {
    id
    name
    date
    description
    cost
    location
    raffleId
    creatorVkId
    groupVkId
  }
}
    `;
export const useCreateEventMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateEventMutation, TError, CreateEventMutationVariables, TContext>,
) =>
  useMutation<CreateEventMutation, TError, CreateEventMutationVariables, TContext>(
    ['createEvent'],
    (variables?: CreateEventMutationVariables) =>
      fetcher<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, variables)(),
    options,
  );
export const GetEventsDocument = `
    query getEvents {
  getVkEvents {
    id
    name
    date
    description
    cost
    location
    raffleId
    creatorVkId
    groupVkId
  }
}
    `;
export const useGetEventsQuery = <TData = GetEventsQuery, TError = unknown>(
  variables?: GetEventsQueryVariables,
  options?: UseQueryOptions<GetEventsQuery, TError, TData>,
) =>
  useQuery<GetEventsQuery, TError, TData>(
    variables === undefined ? ['getEvents'] : ['getEvents', variables],
    fetcher<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, variables),
    options,
  );
export const TakePartDocument = `
    mutation takePart($userId: Int, $raffleId: Int) {
  takePart(userId: $userId, raffleId: $raffleId)
}
    `;
export const useTakePartMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<TakePartMutation, TError, TakePartMutationVariables, TContext>,
) =>
  useMutation<TakePartMutation, TError, TakePartMutationVariables, TContext>(
    ['takePart'],
    (variables?: TakePartMutationVariables) =>
      fetcher<TakePartMutation, TakePartMutationVariables>(TakePartDocument, variables)(),
    options,
  );
export const CreateUserDocument = `
    mutation createUser($input: VkEventInput) {
  createVkUser(input: $input) {
    id
    name
    vkId
  }
}
    `;
export const useCreateUserMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
) =>
  useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
    ['createUser'],
    (variables?: CreateUserMutationVariables) =>
      fetcher<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, variables)(),
    options,
  );
export const GetUsersDocument = `
    query getUsers {
  getVkUsers {
    id
    name
    vkId
  }
}
    `;
export const useGetUsersQuery = <TData = GetUsersQuery, TError = unknown>(
  variables?: GetUsersQueryVariables,
  options?: UseQueryOptions<GetUsersQuery, TError, TData>,
) =>
  useQuery<GetUsersQuery, TError, TData>(
    variables === undefined ? ['getUsers'] : ['getUsers', variables],
    fetcher<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, variables),
    options,
  );
