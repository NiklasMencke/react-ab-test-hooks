[react-ab-test-hooks](../README.md) / [Exports](../modules.md) / UseExperimentProps

# Interface: UseExperimentProps

## Hierarchy

* *ExperimentBaseProps*

  ↳ **UseExperimentProps**

## Table of contents

### Properties

- [cacheResult](useexperimentprops.md#cacheresult)
- [id](useexperimentprops.md#id)
- [onResult](useexperimentprops.md#onresult)
- [variants](useexperimentprops.md#variants)
- [weights](useexperimentprops.md#weights)

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

### variants

• **variants**: [*Variant*](variant.md)[]

An array of variants. Has to contain at least two items

Defined in: [index.tsx:30](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L30)

___

### weights

• `Optional` **weights**: *number*[]

Optional: Weight distribution as a number array. Has to match the length of the variant array. Defaults to equal distribution. E.g. [0.5, 0.5]

Inherited from: void

Defined in: [index.tsx:21](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L21)
