import { Collection} from "mongodb";
import { Message } from "./models/message";




export async function findAll(col: Collection<Message>): Promise<void> {
	try {
		// const projection = { messageText: 1, _id: 0 }
		// const found = await col.find().project(projection).toArray()
		const found = await col.find().toArray()

		if (found.length > 0) {
			console.log('Messages found: ', found);
			
		} else {
			console.log('No messages found...');
		}
	} catch(error: any) {
		console.log('An error occured while fetching the documents: ' + error.message);
		
	}

}


