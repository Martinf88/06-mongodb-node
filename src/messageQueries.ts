import { MongoClient, Db, Collection, WithId } from "mongodb";
import { Message } from "./models/message";

export async function connect() {
	const con: string | undefined = process.env.CONNECTION_STRING
	if(!con) {
		console.log('Error: connection string not found');
		return
	}
	try {
		const client: MongoClient = new MongoClient(con!)
		
		const db: Db = client.db('exercises')
		const col: Collection<Message> = db.collection<Message>('chat')

		// await zeroLikes(col)
		// await eightOrMoreLikes(col)
		// await fromGreta(col)
		// await toPaul(col)
		// await fromZoroToHassan(col)
		await betweenZoroAndHassan(col)

		await client.close()

	} catch(error: any) {
		console.log('An error occured. ' + error.message);
		
	}

	console.log('Program executed successfully');
	
}

async function zeroLikes(col: Collection<Message>): Promise<void> {
	const filter = { likes: 0}
	const found: WithId<Message>[] = await col.find(filter).toArray()

	if(found) {
		console.log('Messages found: ', found);
		
	} else {
		console.log('No messages found...');
		
	}
}

async function eightOrMoreLikes(col:Collection<Message>): Promise<void> {
	const filter = { likes: {$gte: 8}}
	const found: WithId<Message>[] = await col.find(filter).toArray()

	if(found) {
		console.log('Messages found: ', found);
		
	} else {
		console.log('No messages found...');
		
	}
	
}
async function fromGreta(col:Collection<Message>): Promise<void> {
	const filter = { senderId: "Greta"}
	const found: WithId<Message>[] = await col.find(filter).toArray()

	if(found) {
		console.log('Messages found: ', found);
		
	} else {
		console.log('No messages found...');
		
	}

}
async function toPaul(col:Collection<Message>): Promise<void> {
	const filter = { receiverId: "Paul"}
	const found: WithId<Message>[] = await col.find(filter).toArray()

	if(found) {
		console.log('Messages found: ', found);
		
	} else {
		console.log('No messages found...');
		
	}
	
}
async function fromZoroToHassan(col:Collection<Message>): Promise<void> {
	const filter = { receiverId: "Hassan", senderId: "Zoro"}
	const found: WithId<Message>[] = await col.find(filter).toArray()

	if(found) {
		console.log('Messages found: ', found);
		
	} else {
		console.log('No messages found...');
		
	}
	
}
async function betweenZoroAndHassan(col:Collection<Message>): Promise<void> {
	const filter = { $or: [ {receiverId: "Hassan", senderId: "Zoro"}, {receiverId: "Zoro", senderId: "Hassan"} ]  }
	const found: WithId<Message>[] = await col.find(filter).toArray()

	if(found) {
		console.log('Messages found: ', found);
		
	} else {
		console.log('No messages found...');
		
	}
	
}

connect()