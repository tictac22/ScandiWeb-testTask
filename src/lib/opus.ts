import { client, Field, Query } from "@tilework/opus"

client.setEndpoint("http://localhost:4000/")
// Single requests

export const getProductsByCategory = async (title: string) => {
	const query = new Query("category")
		.addArgument("input", "CategoryInput", { title })
		.addField("name")
		.addField(
			new Field("products")
				.addFieldList(["name", "id"])
				.addField(
					new Field("attributes")
						.addFieldList(["name", "type"])
						.addField(new Field("items").addFieldList(["displayValue", "value"]))
				)
				.addField(
					new Field("prices")
						.addField("amount")
						.addField(new Field("currency").addFieldList(["label", "symbol"]))
				)
				.addFieldList(["gallery", "inStock"])
		)
	const queryResult = await client.post(query)
	return queryResult.category
}

export const getProductById = async (id: string) => {
	const query = new Query("product")
		.addArgument("id", "String!", id)
		.addFieldList(["name", "description", "gallery", "id"])
		.addField(
			new Field("prices").addField("amount").addField(new Field("currency").addFieldList(["label", "symbol"]))
		)
		.addField(
			new Field("attributes")
				.addFieldList(["name", "type"])
				.addField(new Field("items").addFieldList(["displayValue", "value"]))
		)
	const queryResult = await client.post(query)
	return queryResult.product
}
