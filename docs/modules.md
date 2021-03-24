[react-ab-test-hooks](README.md) / Exports

# react-ab-test-hooks

## Table of contents

### Interfaces

- [UseExperimentProps](interfaces/useexperimentprops.md)
- [UseExperimentResponse](interfaces/useexperimentresponse.md)
- [UseExperimentWrapperProps](interfaces/useexperimentwrapperprops.md)
- [UseExperimentWrapperResponse](interfaces/useexperimentwrapperresponse.md)
- [UseVariantProps](interfaces/usevariantprops.md)
- [Variant](interfaces/variant.md)
- [VariantWrapper](interfaces/variantwrapper.md)

### Functions

- [useExperiment](modules.md#useexperiment)
- [useExperimentWrappers](modules.md#useexperimentwrappers)

## Functions

### useExperiment

▸ `Const`**useExperiment**(`__namedParameters`: [*UseExperimentProps*](interfaces/useexperimentprops.md)): [*UseExperimentResponse*](interfaces/useexperimentresponse.md)

A hook that takes an AB-Test experiment configuration and choses a variant that won the experiment based on a probability distribution.
The probably distribution can be defined in the weights array (e.g [0.1, 0.9]). It defaults to an even distribution.
it will return the variant (as a React Element) that won the given experiment.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*UseExperimentProps*](interfaces/useexperimentprops.md) |

**Returns:** [*UseExperimentResponse*](interfaces/useexperimentresponse.md)

The Variant component that won the experiment.

Defined in: [index.tsx:194](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L194)

___

### useExperimentWrappers

▸ `Const`**useExperimentWrappers**(`__namedParameters`: [*UseExperimentWrapperProps*](interfaces/useexperimentwrapperprops.md)): [*UseExperimentWrapperResponse*](interfaces/useexperimentwrapperresponse.md)

A hook that takes an AB-Test experiment configuration and choses a variant that won the experiment based on a probability distribution.
The probably distribution can be defined in the weights array (e.g [0.1, 0.9]). It defaults to an even distribution.
it will return wrapper components for each variant provided in the variants parameter in props. Only the wrapper for the variant that won the
experiment will display its children.

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*UseExperimentWrapperProps*](interfaces/useexperimentwrapperprops.md) |

**Returns:** [*UseExperimentWrapperResponse*](interfaces/useexperimentwrapperresponse.md)

An array containing wrapper components for each variant provided in this experiment.

Defined in: [index.tsx:222](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L222)
