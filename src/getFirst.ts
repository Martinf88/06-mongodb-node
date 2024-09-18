import { MongoClient, Db, Collection, WithId } from "mongodb";
import { Message } from "./models/message";
import { findAll } from "./getAll";

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

		await findFirstDoc(col)
		await findAll(col)
		await client.close()

	} catch(error: any) {
		console.log('An error occured. ' + error.message);
		
	}

	console.log('Program executed successfully');
	
}

async function findFirstDoc(col: Collection<Message>): Promise<void> {
	const found: WithId<Message> | null = await col.findOne()

	if( found ) {
		console.log('Found message: ', found);
		
	} else {
		console.log('No messages found...');
		
	}
}

connect()



