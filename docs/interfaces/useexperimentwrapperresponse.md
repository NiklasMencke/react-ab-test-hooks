[react-ab-test-hooks](../README.md) / [Exports](../modules.md) / UseExperimentWrapperResponse

# Interface: UseExperimentWrapperResponse

## Table of contents

### Properties

- [error](useexperimentwrapperresponse.md#error)
- [onResult](useexperimentwrapperresponse.md#onresult)
- [wrappers](useexperimentwrapperresponse.md#wrappers)

## Properties

### error

• `Optional` **error**: *null* \| *string*

Error string that is filled in case something breaks

Defined in: [index.tsx:51](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L51)

___

### onResult

• `Optional` **onResult**: (`experimentId`: *string*, `selectedVariantId`: [*VariantWrapper*](variantwrapper.md)) => *null* \| *void*

Callback function that is called when the experiment has been finished and a variant was selected.

#### Type declaration:

▸ (`experimentId`: *string*, `selectedVariantId`: [*VariantWrapper*](variantwrapper.md)): *null* \| *void*

#### Parameters:

Name | Type |
:------ | :------ |
`experimentId` | *string* |
`selectedVariantId` | [*VariantWrapper*](variantwrapper.md) |

**Returns:** *null* \| *void*

Defined in: [index.tsx:49](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L49)

Defined in: [index.tsx:49](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L49)

___

### wrappers

• **wrappers**: *FC*<{}\>[]

An array containing a wrapper component for each of the previously passed variants. Only the Variant Wrapper that won will render it's children.

Defined in: [index.tsx:47](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L47)
