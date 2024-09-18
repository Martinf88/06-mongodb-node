import { MongoClient, Db, Collection, WithId, DeleteResult } from "mongodb";
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

		await deleteMyMessage(col)
		await client.close()

	} catch(error: any) {
		console.log('An error occured. ' + error.message);
		
	}

	console.log('Program executed successfully');
	
}


async function deleteMyMessage(col:Collection<Message>): Promise<void> {
	const filter = { senderId: 'Lejonmanen'}
	const result: DeleteResult = await col.deleteOne(filter)

	if(!result.acknowledged) {
		console.log('Could not delete any Lejonmanen');
		return
	}
	console.log(`Deleted ${result.deletedCount} Lejonmanen`);
	
}

connect()