function discordNotification(parsedResult, callback) {
	if (configuration.discord.active) {
		if (parsedResult.image === undefined || parsedResult.image === null) {
		var img = configuration.noImageURL
		} else {
		var img = parsedResult.image
		}

		var stockCount
		lib.getStockData(parsedResult.link, (res, err) => {
		if (err) {
			api.log('error', `Error occured while fetching stock data from ${parsedResult.link}`)
			return process.exit()
		}
		sendMessage(res)
		})
	
		function sendMessage(res) {
			if (isNaN(res.stock)) {
				var stock = 'Unavailable'
			} else {
				var stock = res.stock
			}
				var price = res.price

				var links;
				if (Array.isArray(res.links)) {
					links = res.links.join('\n');
				} else {
					links = 'Unavailable'
				}
				
				var message = 'Stock: ' + stock + ', Price: ' + price + ',
				Links: ' + links
				callback(message)
			}
		}
		
	}

}
