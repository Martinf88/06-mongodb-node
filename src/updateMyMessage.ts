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

		await updateMyMessage(col)
		await client.close()

	} catch(error: any) {
		console.log('An error occured. ' + error.message);
		
	}

	console.log('Program executed successfully');
	
}

async function updateMyMessage(col:Collection<Message>): Promise<void> {
	const filter = { senderId: "Beastman" }
	const updateFilter = {
		$set: {
			senderId: 'Lejonmanen'
		}
	} 

	const result = await col.updateOne(filter, updateFilter)
	if (!result.acknowledged) {
		console.log('Could not update message.')
		return
	} 
	console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount}.`);
	
	
}

connect()