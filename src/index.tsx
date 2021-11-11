/** @format */

import React, { useEffect, useState } from 'react';

export interface Variant {
  /** Variant ID. Example: 'variant-a' */
  id: string;
  /** React Node to render if this variant succeeds. Can be a React Component or HTML. Example: <div>Variant A</div> */
  element: any;
}

export interface VariantWrapper {
  /** Variant ID. Example: 'variant-a' */
  id: string;
}

interface ExperimentBaseProps {
  /** Experiment ID. Example: 'experiment-1' */
  id: string;
  /** Optional: Weight distribution as a number array. Has to match the length of the variant array. Defaults to equal distribution. E.g. [0.5, 0.5] */
  weights?: Array<number>;
  /** Optional: Boolean that indicates if the experiment result should be cached to the browsers local storage. This will ensure, that once an experiment is finished, the user will always sees the same variant. Example: true */
  cacheResult?: boolean;
  /** Optional: Callback function that is called when the experiment has been finished and a variant was selected. */
  onResult?: (experimentId: string, selectedVariant: Variant | VariantWrapper) => void | null;
}

export interface UseExperimentProps extends ExperimentBaseProps {
  /** An array of variants. Has to contain at least two items */
  variants: Array<Variant>;
}

export interface UseExperimentWrapperProps extends ExperimentBaseProps {
  /** An array of variants. Has to contain at least two items. The element attribute is left out here. */
  variants: Array<VariantWrapper>;
}

export interface UseVariantProps extends ExperimentBaseProps {
  /** An array of variants */
  variants: Array<Variant | VariantWrapper>;
  /** The type of variant. 'wrapper' will result in returning wrapper components for each variant of the experiment. Example: 'standard' */
  type: 'standard' | 'wrapper';
}

export interface UseExperimentWrapperResponse {
  /** An array containing a wrapper component for each of the previously passed variants. Only the Variant Wrapper that won will render it's children. */
  wrappers: Array<React.FC>;
  /** Callback function that is called when the experiment has been finished and a variant was selected. */
  onResult?: (experimentId: string, selectedVariantId: VariantWrapper) => void | null;
  /** Error string that is filled in case something breaks */
  error?: string | null;
}

export interface UseExperimentResponse {
  /** The selected variant that won the experiment and was chosen from the previously passed variants. */
  SelectedVariant: React.FC;
  /** Callback function that is called when the experiment has been finished and a variant was selected. */
  onResult?: (experimentId: string, selectedVariant: Variant) => void | null;
  /** Error string that is filled in case something breaks */
  error?: string | null;
}

/**
 * Returns the a random, weighted Integer based on the spec provided.
 *
 * @param spec - The distribution spec
 * @returns An integer between 0 and n (n being defined in the spec)
 *
 */
const getWeightedRandomInt = (spec: any): number => {
  let i, j;
  const table = [];
  for (i in spec) {
    for (j = 0; j < spec[i] * 10; j++) {
      table.push(i);
    }
  }
  return Number(table[Math.floor(Math.random() * table.length)]);
};

/**
 * Returns an Integer from local storage that represents the index of a variant that won in a given experiment.
 *
 * @param experimentId - The experimentId
 * @returns An integer indicating the position of the variant that won the given experiment.
 *
 */
const getVariantFromStorage = (experimentId: string): string | null => {
  try {
    if (experimentId?.length > 0) {
      return localStorage?.getItem(`experiment_result_${experimentId}`);
    }
    throw new Error('experimentId cant be empty');
  } catch (err) {
    return null;
  }
};

const useVariant = ({
  type,
  id,
  variants,
  weights,
  cacheResult = false,
  onResult,
}: UseVariantProps): {
  Variant: React.FC;
  wrappers: Array<React.FC>;
  error: string | null;
} => {
  const [resultIndex, setResultIndex] = useState<number>(
    cacheResult ? (Number(getVariantFromStorage(id)) !== NaN ? Number(getVariantFromStorage(id)) : -1) : -1,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      !variants ||
      variants.length < 2 ||
      (weights && weights.length > 0 && weights.length !== variants.length)
    ) {
      setError(
        'Please make sure to provide at least two variants. If you specify custom weights, you need to do so for each variant.',
      );
    } else if (resultIndex < 0) {
      try {
        const randomVariant = getWeightedRandomInt(
          variants.reduce((prev, _, crrIndex) => {
            return {
              ...prev,
              [crrIndex]:
                weights && weights.length === variants.length
                  ? weights[crrIndex]
                  : 1 / variants.length,
            };
          }, {}),
        );
        setResultIndex(randomVariant);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
  }, [variants, error, resultIndex, weights]);

  useEffect(() => {
    if (resultIndex >= 0 && cacheResult && id?.length > 0) {
      localStorage.setItem(`experiment_result_${id}`, resultIndex.toString());
    }
  }, [id, cacheResult, resultIndex]);

  useEffect(() => {
    if (id && resultIndex >= 0 && onResult && variants) {
      onResult(id, variants[resultIndex!]);
    }
  }, [onResult, id, variants, resultIndex]);

  return {
    error,
    Variant: () => {
      if (
        type === 'standard' &&
        variants &&
        resultIndex >= 0 &&
        variants.length - 1 >= resultIndex!
      ) {
        const result = variants[resultIndex!] as Variant;
        return <React.Fragment>{result?.element}</React.Fragment>;
      } else {
        return <React.Fragment />;
      }
    },
    wrappers:
      type === 'wrapper' && variants
        ? variants.map((variant, i) => {
            if (i === resultIndex) {
              return ({ children }) => <React.Fragment key={variant.id}>{children}</React.Fragment>;
            } else {
              return () => <React.Fragment key={variant.id} />;
            }
          })
        : [],
  };
};

/**
 * A hook that takes an AB-Test experiment configuration and choses a variant that won the experiment based on a probability distribution.
 * The probably distribution can be defined in the weights array (e.g [0.1, 0.9]). It defaults to an even distribution.
 * it will return the variant (as a React Element) that won the given experiment.
 *
 * @param props - object of type UseExperimentProps
 * @returns The Variant component that won the experiment.
 */
export const useExperiment = ({
  id,
  variants,
  weights,
  cacheResult,
  onResult,
}: UseExperimentProps): UseExperimentResponse => {
  const { Variant, error } = useVariant({
    type: 'standard',
    id,
    variants,
    weights,
    cacheResult,
    onResult,
  });

  return { SelectedVariant: Variant, onResult, error };
};

/**
 * A hook that takes an AB-Test experiment configuration and choses a variant that won the experiment based on a probability distribution.
 * The probably distribution can be defined in the weights array (e.g [0.1, 0.9]). It defaults to an even distribution.
 * it will return wrapper components for each variant provided in the variants parameter in props. Only the wrapper for the variant that won the
 * experiment will display its children.
 *
 * @param props - object of type UseExperimentWrapperProps
 * @returns An array containing wrapper components for each variant provided in this experiment.
 */
export const useExperimentWrappers = ({
  id,
  variants,
  weights,
  cacheResult,
  onResult,
}: UseExperimentWrapperProps): UseExperimentWrapperResponse => {
  const { wrappers, error } = useVariant({
    type: 'wrapper',
    id,
    variants,
    weights,
    cacheResult,
    onResult,
  });

  return { wrappers, onResult, error };
};
