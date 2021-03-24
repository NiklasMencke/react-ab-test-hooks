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

const App = () => {
  return <SimpleExample />
}

export default App
