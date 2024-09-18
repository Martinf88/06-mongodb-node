import { MongoClient, Db, Collection, WithId, ObjectId, InsertOneResult } from "mongodb";
import { Message } from "./models/message";


async function connect() {
	const con: string | undefined = process.env.CONNECTION_STRING
	if(!con) {
		console.log('Error: connection string not found');
		return
	}
	try {
		const client: MongoClient = new MongoClient(con!)
		
		const db: Db = client.db('exercises')
		const col: Collection<Message> = db.collection<Message>('chat')

		const newMessage: Message = { senderId: 'Beastman', receiverId: 'Greta', messageText: 'You Go Girl', likes: 0}

		await sendMessage(col, newMessage)
		await client.close()

	} catch(error: any) {
		console.log('An error occured. ' + error.message);
		
	}

	console.log('Program executed successfully');
	
}


async function sendMessage(col:Collection<Message>, newMessage: Message): Promise<ObjectId | null> {
	const result: InsertOneResult<Message> = await col.insertOne(newMessage)

	if( !result.acknowledged ) {
		console.log('Could not insert new message');
		return null
	}

	return result.insertedId
}


connect()