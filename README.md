# react-ab-test-hooks

> A fast and lightweight AB-Testing library for React and Next.js based on hooks and functional components. Full Typescript support and result caching is possible.

[![NPM](https://img.shields.io/npm/v/react-ab-test-hooks.svg)](https://www.npmjs.com/package/react-ab-test-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-ab-test-hooks
```

or

```bash
npm install --save react-ab-test-hooks
```

## Basic Usage

A simple usage example for an AB-Test would be to pass each respective React Element/Component directly in the Experiment's variants. The experiment hook will then chose a winner and return it as Variant, which can then be used in your UI.

Per default the result is not cached, meaning on every new page load, the experiment is run again. You can enable caching by passing: `cacheResult: true`.

Per default the weight distribution is equal among all variants provided in the experiment. If you wan't to provide a custom probability distribution, you can do so via `weights: [0.3, 0.7]`.

See further examples for more options.

```tsx
import React from 'react'

import { useExperiment, useExperimentWrappers } from 'react-ab-test-hooks'

export const SimpleExample = () => {
  const { SelectedVariant } = useExperiment({
    id: 'experiment-1',
    variants: [
      { id: 'A', element: <div>Variant A won</div> },
      { id: 'B', element: <div>Variant B won</div> }
    ],
    onResult: (experimentId, selectedVariant) =>
      console.log(
        `Experiment ${experimentId} finished. Selected Variant ID: ${selectedVariant.id}`
      )
  })

  return (
    <div className='wrapper'>
      <SelectedVariant />
    </div>
  )
}
```

## Generate variant wrapper components (+ result caching)

It's also possible to retrieve wrappers (as functional components) for each variant provided. In contrary to above example this would mean that in any case you will receive a wrapper for each variant and only the winning variant will actually render it's children. This can be convinient if you wanna render a more complex UI based on the experiment result. You can extract the Wrapper Components via array destructering.

NOTE: Only the children of the winning variant wrapper are rendered!

```tsx
import React from 'react'

import { useExperiment, useExperimentWrappers } from 'react-ab-test-hooks'

export const WrapperExample = () => {
  const {
    wrappers: [VariantA, VariantB, VariantC] // Extract the wrapper components here
  } = useExperimentWrappers({
    id: 'experiment-2',
    variants: [{ id: 'A' }, { id: 'B' }, { id: 'C' }], // more than 2 variants are possible
    cacheResult: true,
    onResult: (experimentId, selectedVariant) =>
      console.log(
        `Experiment ${experimentId} finished. Selected Variant Wrapper ID: ${selectedVariant.id}`
      )
  })

  return (
    <div className='wrapper'>
      <VariantA>Variant A won experiment</VariantA>
      <VariantB>Variant B won experiment</VariantB>
      <VariantC>Variant C won experiment</VariantC>
    </div>
  )
}
```

## With custom probability distribution

```tsx
import React from 'react'

import { useExperiment, useExperimentWrappers } from 'react-ab-test-hooks'

export const CustomWeightsExample = () => {
  const { SelectedVariant } = useExperiment({
    id: 'experiment-3',
    variants: [
      { id: 'A', element: <div>Variant A won</div> },
      { id: 'B', element: <div>Variant B won</div> }
    ],
    weights: [0.3, 0.7], // Has to add up to 1.0 and has to have the same length as the variant array
    cacheResult: false,
    onResult: (experimentId, selectedVariant) =>
      console.log(
        `Experiment ${experimentId} finished. Selected Variant ID: ${selectedVariant.id}`
      )
  })

  return (
    <div className='wrapper'>
      <SelectedVariant />
    </div>
  )
}
```

## Error handling example

```tsx
import React from 'react'

import { useExperiment, useExperimentWrappers } from 'react-ab-test-hooks'

export const ErrorExample = () => {
  const { SelectedVariant, error } = useExperiment({
    id: 'experiment-4',
    variants: [
      { id: 'A', element: <div>Variant A won</div> },
      { id: 'B', element: <div>Variant B won</div> }
    ],
    weights: [0.3], // distribution incorrect -> returns error
    cacheResult: false,
    onResult: (experimentId, selectedVariant) =>
      console.log(
        `Experiment ${experimentId} finished. Selected Variant ID: ${selectedVariant.id}`
      )
  })

  if (error) {
    console.log(error)
    return null
  }

  return (
    <div className='wrapper'>
      <SelectedVariant />
    </div>
  )
}
```

## Support

If you like this library it would be amazing if you would give it a star :)

## License

MIT © [NiklasMencke](https://github.com/NiklasMencke)

## API Documentation

Find the detailed API documentation attached.

# Interfaces

<a name="interfacesuseexperimentpropsmd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / UseExperimentProps

## Interface: UseExperimentProps

### Hierarchy

- _ExperimentBaseProps_

  ↳ **UseExperimentProps**

### Table of contents

#### Properties

- [cacheResult](#cacheresult)
- [id](#id)
- [onResult](#onresult)
- [variants](#variants)
- [weights](#weights)

### Properties

#### cacheResult

• `Optional` **cacheResult**: _boolean_

Optional: Boolean that indicates if the experiment result should be cached to the browsers local storage. This will ensure, that once an experiment is finished, the user will always sees the same variant. Example: true

Inherited from: void

Defined in: [index.tsx:23](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L23)

---

#### id

• **id**: _string_

Experiment ID. Example: 'experiment-1'

Inherited from: void

Defined in: [index.tsx:19](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L19)

---

#### onResult

• `Optional` **onResult**: (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd)) => _null_ \| _void_

Optional: Callback function that is called when the experiment has been finished and a variant was selected.

##### Type declaration:

▸ (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd)): _null_ \| _void_

##### Parameters:

| Name              | Type                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------- |
| `experimentId`    | _string_                                                                             |
| `selectedVariant` | [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd) |

**Returns:** _null_ \| _void_

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

Inherited from: void

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

---

#### variants

• **variants**: [_Variant_](#interfacesvariantmd)[]

An array of variants. Has to contain at least two items

Defined in: [index.tsx:30](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L30)

---

#### weights

• `Optional` **weights**: _number_[]

Optional: Weight distribution as a number array. Has to match the length of the variant array. Defaults to equal distribution. E.g. [0.5, 0.5]

Inherited from: void

Defined in: [index.tsx:21](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L21)

<a name="interfacesuseexperimentresponsemd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / UseExperimentResponse

## Interface: UseExperimentResponse

### Table of contents

#### Properties

- [SelectedVariant](#selectedvariant)
- [error](#error)
- [onResult](#onresult)

### Properties

#### SelectedVariant

• **SelectedVariant**: _FC_<{}\>

The selected variant that won the experiment and was chosen from the previously passed variants.

Defined in: [index.tsx:56](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L56)

---

#### error

• `Optional` **error**: _null_ \| _string_

Error string that is filled in case something breaks

Defined in: [index.tsx:60](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L60)

---

#### onResult

• `Optional` **onResult**: (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd)) => _null_ \| _void_

Callback function that is called when the experiment has been finished and a variant was selected.

##### Type declaration:

▸ (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd)): _null_ \| _void_

##### Parameters:

| Name              | Type                              |
| :---------------- | :-------------------------------- |
| `experimentId`    | _string_                          |
| `selectedVariant` | [_Variant_](#interfacesvariantmd) |

**Returns:** _null_ \| _void_

Defined in: [index.tsx:58](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L58)

Defined in: [index.tsx:58](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L58)

<a name="interfacesuseexperimentwrapperpropsmd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / UseExperimentWrapperProps

## Interface: UseExperimentWrapperProps

### Hierarchy

- _ExperimentBaseProps_

  ↳ **UseExperimentWrapperProps**

### Table of contents

#### Properties

- [cacheResult](#cacheresult)
- [id](#id)
- [onResult](#onresult)
- [variants](#variants)
- [weights](#weights)

### Properties

#### cacheResult

• `Optional` **cacheResult**: _boolean_

Optional: Boolean that indicates if the experiment result should be cached to the browsers local storage. This will ensure, that once an experiment is finished, the user will always sees the same variant. Example: true

Inherited from: void

Defined in: [index.tsx:23](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L23)

---

#### id

• **id**: _string_

Experiment ID. Example: 'experiment-1'

Inherited from: void

Defined in: [index.tsx:19](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L19)

---

#### onResult

• `Optional` **onResult**: (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd)) => _null_ \| _void_

Optional: Callback function that is called when the experiment has been finished and a variant was selected.

##### Type declaration:

▸ (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd)): _null_ \| _void_

##### Parameters:

| Name              | Type                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------- |
| `experimentId`    | _string_                                                                             |
| `selectedVariant` | [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd) |

**Returns:** _null_ \| _void_

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

Inherited from: void

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

---

#### variants

• **variants**: [_VariantWrapper_](#interfacesvariantwrappermd)[]

An array of variants. Has to contain at least two items. The element attribute is left out here.

Defined in: [index.tsx:35](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L35)

---

#### weights

• `Optional` **weights**: _number_[]

Optional: Weight distribution as a number array. Has to match the length of the variant array. Defaults to equal distribution. E.g. [0.5, 0.5]

Inherited from: void

Defined in: [index.tsx:21](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L21)

<a name="interfacesuseexperimentwrapperresponsemd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / UseExperimentWrapperResponse

## Interface: UseExperimentWrapperResponse

### Table of contents

#### Properties

- [error](#error)
- [onResult](#onresult)
- [wrappers](#wrappers)

### Properties

#### error

• `Optional` **error**: _null_ \| _string_

Error string that is filled in case something breaks

Defined in: [index.tsx:51](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L51)

---

#### onResult

• `Optional` **onResult**: (`experimentId`: _string_, `selectedVariantId`: [_VariantWrapper_](#interfacesvariantwrappermd)) => _null_ \| _void_

Callback function that is called when the experiment has been finished and a variant was selected.

##### Type declaration:

▸ (`experimentId`: _string_, `selectedVariantId`: [_VariantWrapper_](#interfacesvariantwrappermd)): _null_ \| _void_

##### Parameters:

| Name                | Type                                            |
| :------------------ | :---------------------------------------------- |
| `experimentId`      | _string_                                        |
| `selectedVariantId` | [_VariantWrapper_](#interfacesvariantwrappermd) |

**Returns:** _null_ \| _void_

Defined in: [index.tsx:49](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L49)

Defined in: [index.tsx:49](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L49)

---

#### wrappers

• **wrappers**: _FC_<{}\>[]

An array containing a wrapper component for each of the previously passed variants. Only the Variant Wrapper that won will render it's children.

Defined in: [index.tsx:47](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L47)

<a name="interfacesusevariantpropsmd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / UseVariantProps

## Interface: UseVariantProps

### Hierarchy

- _ExperimentBaseProps_

  ↳ **UseVariantProps**

### Table of contents

#### Properties

- [cacheResult](#cacheresult)
- [id](#id)
- [onResult](#onresult)
- [type](#type)
- [variants](#variants)
- [weights](#weights)

### Properties

#### cacheResult

• `Optional` **cacheResult**: _boolean_

Optional: Boolean that indicates if the experiment result should be cached to the browsers local storage. This will ensure, that once an experiment is finished, the user will always sees the same variant. Example: true

Inherited from: void

Defined in: [index.tsx:23](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L23)

---

#### id

• **id**: _string_

Experiment ID. Example: 'experiment-1'

Inherited from: void

Defined in: [index.tsx:19](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L19)

---

#### onResult

• `Optional` **onResult**: (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd)) => _null_ \| _void_

Optional: Callback function that is called when the experiment has been finished and a variant was selected.

##### Type declaration:

▸ (`experimentId`: _string_, `selectedVariant`: [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd)): _null_ \| _void_

##### Parameters:

| Name              | Type                                                                                 |
| :---------------- | :----------------------------------------------------------------------------------- |
| `experimentId`    | _string_                                                                             |
| `selectedVariant` | [_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd) |

**Returns:** _null_ \| _void_

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

Inherited from: void

Defined in: [index.tsx:25](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L25)

---

#### type

• **type**: _standard_ \| _wrapper_

The type of variant. 'wrapper' will result in returning wrapper components for each variant of the experiment. Example: 'standard'

Defined in: [index.tsx:42](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L42)

---

#### variants

• **variants**: ([_Variant_](#interfacesvariantmd) \| [_VariantWrapper_](#interfacesvariantwrappermd))[]

An array of variants

Defined in: [index.tsx:40](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L40)

---

#### weights

• `Optional` **weights**: _number_[]

Optional: Weight distribution as a number array. Has to match the length of the variant array. Defaults to equal distribution. E.g. [0.5, 0.5]

Inherited from: void

Defined in: [index.tsx:21](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L21)

<a name="interfacesvariantmd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / Variant

## Interface: Variant

### Table of contents

#### Properties

- [element](#element)
- [id](#id)

### Properties

#### element

• **element**: _any_

React Node to render if this variant succeeds. Can be a React Component or HTML. Example: <div>Variant A</div>

Defined in: [index.tsx:9](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L9)

---

#### id

• **id**: _string_

Variant ID. Example: 'variant-a'

Defined in: [index.tsx:7](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L7)

<a name="interfacesvariantwrappermd"></a>

[react-ab-test-hooks](#readmemd) / [Exports](#modulesmd) / VariantWrapper

## Interface: VariantWrapper

### Table of contents

#### Properties

- [id](#id)

### Properties

#### id

• **id**: _string_

Variant ID. Example: 'variant-a'

Defined in: [index.tsx:14](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L14)

<a name="modulesmd"></a>

[react-ab-test-hooks](#readmemd) / Exports

# react-ab-test-hooks

## Table of contents

### Interfaces

- [UseExperimentProps](#interfacesuseexperimentpropsmd)
- [UseExperimentResponse](#interfacesuseexperimentresponsemd)
- [UseExperimentWrapperProps](#interfacesuseexperimentwrapperpropsmd)
- [UseExperimentWrapperResponse](#interfacesuseexperimentwrapperresponsemd)
- [UseVariantProps](#interfacesusevariantpropsmd)
- [Variant](#interfacesvariantmd)
- [VariantWrapper](#interfacesvariantwrappermd)

### Functions

- [useExperiment](#useexperiment)
- [useExperimentWrappers](#useexperimentwrappers)

## Functions

### useExperiment

▸ `Const`**useExperiment**(`__namedParameters`: [_UseExperimentProps_](#interfacesuseexperimentpropsmd)): [_UseExperimentResponse_](#interfacesuseexperimentresponsemd)

A hook that takes an AB-Test experiment configuration and choses a variant that won the experiment based on a probability distribution.
The probably distribution can be defined in the weights array (e.g [0.1, 0.9]). It defaults to an even distribution.
it will return the variant (as a React Element) that won the given experiment.

#### Parameters:

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `__namedParameters` | [_UseExperimentProps_](#interfacesuseexperimentpropsmd) |

**Returns:** [_UseExperimentResponse_](#interfacesuseexperimentresponsemd)

The Variant component that won the experiment.

Defined in: [index.tsx:194](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L194)

---

### useExperimentWrappers

▸ `Const`**useExperimentWrappers**(`__namedParameters`: [_UseExperimentWrapperProps_](#interfacesuseexperimentwrapperpropsmd)): [_UseExperimentWrapperResponse_](#interfacesuseexperimentwrapperresponsemd)

A hook that takes an AB-Test experiment configuration and choses a variant that won the experiment based on a probability distribution.
The probably distribution can be defined in the weights array (e.g [0.1, 0.9]). It defaults to an even distribution.
it will return wrapper components for each variant provided in the variants parameter in props. Only the wrapper for the variant that won the
experiment will display its children.

#### Parameters:

| Name                | Type                                                                  |
| :------------------ | :-------------------------------------------------------------------- |
| `__namedParameters` | [_UseExperimentWrapperProps_](#interfacesuseexperimentwrapperpropsmd) |

**Returns:** [_UseExperimentWrapperResponse_](#interfacesuseexperimentwrapperresponsemd)

An array containing wrapper components for each variant provided in this experiment.

Defined in: [index.tsx:222](https://github.com/NiklasMencke/react-ab-testing/blob/9d3c239/src/index.tsx#L222)
