/** @format */

import React, { useEffect, useState } from 'react';

interface Variant {
  id: string;
  element: any;
}

interface VariantWrapper {
  id: string;
}

interface ExperimentBaseProps {
  id: string;
  weights?: Array<number>;
  cacheResult?: boolean;
  onResult?: (experimentId: string, selectedVariant: Variant | VariantWrapper) => void | null;
}

interface UseExperimentProps extends ExperimentBaseProps {
  variants: Array<Variant>;
}

interface UseExperimentWrapperProps extends ExperimentBaseProps {
  variants: Array<VariantWrapper>;
}

interface UseVariantProps extends ExperimentBaseProps {
  variants: Array<Variant | VariantWrapper>;
  type: 'standard' | 'wrapper';
}

interface UseExperimentWrapperResponse {
  wrappers: Array<React.FC>;
  onResult?: (experimentId: string, selectedVariantId: VariantWrapper) => void | null;
  error?: string | null;
}

interface UseExperimentResponse {
  SelectedVariant: React.FC;
  onResult?: (experimentId: string, selectedVariant: Variant) => void | null;
  error?: string | null;
}

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
    cacheResult ? (Number(getVariantFromStorage(id)) ? Number(getVariantFromStorage(id)) : -1) : -1,
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
