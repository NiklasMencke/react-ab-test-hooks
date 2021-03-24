[react-ab-test-hooks](../README.md) / [Exports](../modules.md) / UseVariantProps

# Interface: UseVariantProps

## Hierarchy

* *ExperimentBaseProps*

  ↳ **UseVariantProps**

## Table of contents

### Properties

- [cacheResult](usevariantprops.md#cacheresult)
- [id](usevariantprops.md#id)
- [onResult](usevariantprops.md#onresult)
- [type](usevariantprops.md#type)
- [variants](usevariantprops.md#variants)
- [weights](usevariantprops.md#weights)

## Properties

### cacheResult

• `Optional` **cacheResult**: *boolean*

Optional: Boolean that indicates if the experiment result should be cached to the browsers local storage. This will ensure, that once an experiment is finished, the user will always sees the same variant. Example: true

Inherited from: void

Defined in: [index.tsx:23](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L23)

___

### id

• **id**: *string*

Experiment ID. Example: 'experiment-1'

Inherited from: void

Defined in: [index.tsx:19](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L19)

___

### onResult

• `Optional` **onResult**: (`experimentId`: *string*, `selectedVariant`: [*Variant*](variant.md) \| [*VariantWrapper*](variantwrapper.md)) => *null* \| *void*

Optional: Callback function that is called when the experiment has been finished and a variant was selected.

#### Type declaration:

▸ (`experimentId`: *string*, `selectedVariant`: [*Variant*](variant.md) \| [*VariantWrapper*](variantwrapper.md)): *null* \| *void*

#### Parameters:

Name | Type |
:------ | :------ |
`experimentId` | *string* |
`selectedVariant` | [*Variant*](variant.md) \| [*VariantWrapper*](variantwrapper.md) |

**Returns:** *null* \| *void*

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

Inherited from: void

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

___

### type

• **type**: *standard* \| *wrapper*

The type of variant. 'wrapper' will result in returning wrapper components for each variant of the experiment. Example: 'standard'

Defined in: [index.tsx:42](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L42)

___

### variants

• **variants**: ([*Variant*](variant.md) \| [*VariantWrapper*](variantwrapper.md))[]

An array of variants

Defined in: [index.tsx:40](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L40)

___

### weights

• `Optional` **weights**: *number*[]

Optional: Weight distribution as a number array. Has to match the length of the variant array. Defaults to equal distribution. E.g. [0.5, 0.5]

Inherited from: void

Defined in: [index.tsx:21](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L21)
