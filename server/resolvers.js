import {locatedError} from 'graphql/error'; 

let fakes=
			[
				{id:0,no:'000000000',name:'Aaaa 0 Aaaaaa'},
				{id:1,no:'111111110',name:'Bbbb 0 Bbbbbb'},
				{id:2,no:'222222220',name:'Cccc 0 Cccccc'},
				{id:3,no:'333333330',name:'Dddd 0 Dddddd'},
				{id:4,no:'444444440',name:'Eeee 0 Eeeeee'},
				{id:5,no:'555555550',name:'Ffff 0 Ffffff'},
	 			{id:6,no:'666666660',name:'Gggg 0 Gggggg'},
				{id:7,no:'777777770',name:'Hhhh 0 Hhhhhh'},
				{id:8,no:'888888880',name:'Iiii 0 Iiiiii'},
				{id:9,no:'999999990',name:'Jjjj 0 Jjjjjj'},
				{id:10,no:'000000001',name:'Aaaa 1 Aaaaaa'},
				{id:11,no:'111111111',name:'Bbbb 1 Bbbbbb'},
				{id:12,no:'222222221',name:'Cccc 1 Cccccc'},
				{id:13,no:'333333331',name:'Dddd 1 Dddddd'},
				{id:14,no:'444444441',name:'Eeee 1 Eeeeee'},
				{id:15,no:'555555551',name:'Ffff 1 Ffffff'},
				{id:16,no:'666666661',name:'Gggg 1 Gggggg'},
				{id:17,no:'777777771',name:'Hhhh 1 Hhhhhh'},
				{id:18,no:'888888881',name:'Iiii 1 Iiiiii'},
				{id:19,no:'999999991',name:'Jjjj 1 Jjjjjj'},
				{id:20,no:'000000002',name:'Aaaa 2 Aaaaaa'},
				{id:21,no:'111111112',name:'Bbbb 2 Bbbbbb'},
				{id:22,no:'222222222',name:'Cccc 2 Cccccc'},
				{id:23,no:'333333332',name:'Dddd 2 Dddddd'},
				{id:24,no:'444444442',name:'Eeee 2 Eeeeee'},
				{id:25,no:'555555552',name:'Ffff 2 Ffffff'},
				{id:26,no:'666666662',name:'Gggg 2 Gggggg'},
				{id:27,no:'777777772',name:'Hhhh 2 Hhhhhh'},
				{id:28,no:'888888882',name:'Iiii 2 Iiiiii'},
				{id:29,no:'999999992',name:'Jjjj 2 Jjjjjj'},
				{id:30,no:'000000003',name:'Aaaa 3 Aaaaaa'},
				{id:31,no:'111111113',name:'Bbbb 3 Bbbbbb'},
				{id:32,no:'222222223',name:'Cccc 3 Cccccc'},
				{id:33,no:'333333333',name:'Dddd 3 Dddddd'},
				{id:34,no:'444444443',name:'Eeee 3 Eeeeee'},
				{id:35,no:'555555553',name:'Ffff 3 Ffffff'},
				{id:36,no:'666666663',name:'Gggg 3 Gggggg'},
				{id:37,no:'777777773',name:'Hhhh 3 Hhhhhh'},
				{id:38,no:'888888883',name:'Iiii 3 Iiiiii'},
				{id:39,no:'999999993',name:'Jjjj 3 Jjjjjj'}
			];
export default  {
	Query: {
		phone:(root,args,ctx,info)=>{
			return fakes[args.id];
		},
		phones:(root,args,ctx,info)=>{
			let a=(args.after==undefined||args.after<0)?0:args.after+1;
			let b=(args.before==undefined||args.before>fakes.length)?fakes.length:args.before;

			if (args.first!=undefined){
				if (args.first<0)
					throw new Error('FIRST parameter must not be less than zero');
				if (a+args.first<b)
					b=a+args.first;
				if (args.last!=undefined)
					throw new Error('FIRST parameter must not be used simultaneously with LAST');
			}else if (args.last!=undefined){
				if (args.last<0)
					throw locatedError(new Error('LAST parameter must not be less than zero'));
				if (b-args.last>a){
					a=(b-args.last);
				}
			}
		
			return {
				pageInfo:{
					hasNextPage:b<fakes.length,
					hasPreviousPage:a>0,
					startCursor:fakes[a].id,
					endCursor:fakes[b-1].id
				},
				edges:fakes.slice(a,b).map((fake)=>({cursor:fake.id,node:fake}))
			}
		},
	},
	Mutation: {
		submitPhone:(root,args)=>{
			let {id,no,name}=args.input;
			if (id && id!='add' && id<40){
				throw locatedError({message:"ID must be above 39"})
			}
			let max_id=-1;
			fakes=fakes.map(v=>{
				if (v.id==id){
					max_id=-2; //flag of updated
					return {id,no,name}
				}else{
					if (max_id!=-2 && v.id>max_id) max_id=v.id;
					return v;
				}
			});
			if (max_id!=-2) { //not update, i.e. new
				id=max_id+1;
				fakes.push({id,no,name});
			}
			return {phone:{id,no,name},clientMutationId:args.input.clientMutationId};
		},
		deletePhone:(root,args)=>{
			const id=(args.input.id);
			if (id<40){
				throw locatedError({message:"ID must be above 39"})
			}else{
				const prev=fakes;
				fakes=fakes.filter(fake=>fake.id!=id);
				return {
					success:prev.length>fakes.length,
					clientMutationId:args.input.clientMutationId
				}
			}
		}
	}
}
