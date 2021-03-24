[react-ab-test-hooks](../README.md) / [Exports](../modules.md) / UseExperimentResponse

# Interface: UseExperimentResponse

## Table of contents

### Properties

- [SelectedVariant](useexperimentresponse.md#selectedvariant)
- [error](useexperimentresponse.md#error)
- [onResult](useexperimentresponse.md#onresult)

## Properties

### SelectedVariant

• **SelectedVariant**: *FC*<{}\>

The selected variant that won the experiment and was chosen from the previously passed variants.

Defined in: [index.tsx:56](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L56)

___

### error

• `Optional` **error**: *null* \| *string*

Error string that is filled in case something breaks

Defined in: [index.tsx:60](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L60)

___

### onResult

• `Optional` **onResult**: (`experimentId`: *string*, `selectedVariant`: [*Variant*](variant.md)) => *null* \| *void*

Callback function that is called when the experiment has been finished and a variant was selected.

#### Type declaration:

▸ (`experimentId`: *string*, `selectedVariant`: [*Variant*](variant.md)): *null* \| *void*

#### Parameters:

Name | Type |
:------ | :------ |
`experimentId` | *string* |
`selectedVariant` | [*Variant*](variant.md) |

**Returns:** *null* \| *void*

Defined in: [index.tsx:58](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L58)

Defined in: [index.tsx:58](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L58)
