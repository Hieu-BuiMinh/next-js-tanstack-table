
const getBase64 = (file: File) => {
	return new Promise<any>((resolve) => {
		// Make new FileReader
		let reader = new FileReader()

		// Convert the file to base64 text
		reader.readAsDataURL(file)

		// on reader load somthing...
		reader.onload = () => {
			// Make a fileInfo Object
			resolve(reader.result)
		}
	})
}

export default getBase64