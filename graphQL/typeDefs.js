const schema = `

interface Node {
	id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Phone implements Node {
  id: ID!
  no: String!
  name: String!
}

type PhoneEdge {
	cursor: String!
	node: Phone!
}

type PhoneConnection {
	pageInfo: PageInfo!
	edges: [PhoneEdge]!
}

type Query {
	phone(id:ID!): Phone
	phones(after:Int,first:Int,before:Int,last:Int): PhoneConnection!
}

input SubmitPhoneInput{
	id: ID!
	name: String
	no: String
	clientMutationId: String!
}

type SubmitPhonePayload{
	phone: Phone
	clientMutationId: String!
}

input DeleteByIdInput{
	id: ID!
	clientMutationId: String!
}

type DeleteByIdPayload{
	success: Int!
	clientMutationId: String!
}

type Mutation {
	deletePhone(input:DeleteByIdInput!):DeleteByIdPayload!
	submitPhone(input:SubmitPhoneInput!):SubmitPhonePayload!
}

schema {
    query: Query
    mutation: Mutation
  }
`;

export default schema;
