export default function FormFieldTransformer(initFields: any) {
	const fieldsObject: any = {
		initialValues: {},
		validate: {},
	}

	Array(initFields)?.map((currentValue: any) => {
		if (currentValue.propName) {
			fieldsObject.initialValues[currentValue?.propName] = currentValue?.value
		}
		if (currentValue.validation) {
			fieldsObject.validate[currentValue?.propName] = currentValue?.validation
		}
	})

	return fieldsObject
}
