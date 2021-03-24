react-ab-test-hooks / [Exports](modules.md)

<a name="readmemd"></a>

react-ab-test-hooks / [Exports](#modulesmd)

<a name="readmemd"></a>

react-ab-test-hooks / [Exports](#modulesmd)

# react-ab-test-hooks

> A fast and lightweight AB-Testing library for React and Next.js based on hooks and functional components

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

```tsx
import React from 'react'

import { useExperiment, useExperimentWrappers } from 'react-ab-testing'
import 'react-ab-testing/dist/index.css'

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

## Generate Variant Wrapper Components (+ Result Caching)

```tsx
import React from 'react'

import { useExperiment, useExperimentWrappers } from 'react-ab-testing'
import 'react-ab-testing/dist/index.css'

export const WrapperExample = () => {
  const {
    wrappers: [VariantA, VariantB, VariantC]
  } = useExperimentWrappers({
    id: 'experiment-2',
    variants: [{ id: 'A' }, { id: 'B' }, { id: 'C' }],
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

import { useExperiment, useExperimentWrappers } from 'react-ab-testing'
import 'react-ab-testing/dist/index.css'

export const CustomWeightsExample = () => {
  const { SelectedVariant } = useExperiment({
    id: 'experiment-3',
    variants: [
      { id: 'A', element: <div>Variant A won</div> },
      { id: 'B', element: <div>Variant B won</div> }
    ],
    weights: [0.3, 0.7], // even distribution per default
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

import { useExperiment, useExperimentWrappers } from 'react-ab-testing'
import 'react-ab-testing/dist/index.css'

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

## License

MIT © [NiklasMencke](https://github.com/NiklasMencke)
