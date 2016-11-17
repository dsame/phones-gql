# phones-gql
Sample GraphQL server

[GraphIQL](http://phones-gql.devbucket.me:3000/graphiql)
[GraphQL endpoint](http://phones-gql.devbucket.me:3000/graphql)

Sample queries:

[Add a phone](http://phones-gql.devbucket.me:3000/graphiql?query=mutation%20SubmitPhone(%24input%3A%20SubmitPhoneInput!)%20%7B%0A%09submitPhone(input%3A%20%24input)%20%7B%0A%20%20%20%20phone%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20no%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20clientMutationId%0A%20%20%7D%0A%7D%0A&operationName=SubmitPhone&variables=%7B%22input%22%3A%20%7B%22id%22%3A%20%22add%22%2C%22clientMutationId%22%3A%20%22123%22%2C%22name%22%3A%20%22new%22%2C%22no%22%3A%20%22000000004%22%7D%7D)
[Remove a phone](http://phones-gql.devbucket.me:3000/graphiql?query=mutation%20d(%24input%3ADeleteByIdInput!)%7B%0A%09deletePhone(input%3A%24input)%7B%0A%20%20%20%20success%0A%20%20%20%20clientMutationId%0A%20%20%7D%0A%7D&operationName=d&variables=%7B%22input%22%3A%20%7B%22id%22%3A%2041%2C%22clientMutationId%22%3A%20%22123%22%7D%7D)
[List phones](http://phones-gql.devbucket.me:3000/graphiql?query=query%20Q%20%7B%0A%20%20phones(after%3A%2037)%20%7B%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20hasPreviousPage%0A%20%20%20%20%20%20startCursor%0A%20%20%20%20%20%20endCursor%0A%20%20%20%20%7D%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20cursor%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20no%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=Q)
