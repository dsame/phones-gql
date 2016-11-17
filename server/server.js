import polyfill from 'babel-polyfill'
import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import logger from 'koa-logger';
import { apolloKoa,graphiqlKoa } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../graphQL/typeDefs'
import resolvers from './resolvers'
import {serverPort} from './config.json'
import cors from 'kcors';

const executableSchema = makeExecutableSchema({typeDefs,resolvers});

const router = new koaRouter();
const PORT = serverPort;
const app = new koa();

app.use(cors());

app.use(koaBody());

app.use(async (ctx, next) => {
  try {
    await next(); 
  } catch (err) {
    ctx.body = { message: err.message };
    ctx.status = err.status || 500;
  }
});

router.get('/graphiql', graphiqlKoa({
	endpointURL: '/graphql',
	query: `query {
		phones (after:10,first:10) {
			pageInfo{
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor
      },
      edges{
        cursor,
        node{
          id,
          no,
          name
        }
      }
		}
	}`,
	debug: true
}));
router.post('/graphql', apolloKoa({ schema:  executableSchema }));

app.use(logger())
	.use(router.routes())
	.use(router.allowedMethods());

export default app;

(async ()=>{
	try {
		await app.listen(PORT);
		console.log("Server is listening on "+PORT);
	}catch(error){
		console.log(error);
	}
})()
