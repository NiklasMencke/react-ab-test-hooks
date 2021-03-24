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
  persistResult?: boolean;
  onResult?: Function;
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
  persistResult = false,
  onResult,
}: UseVariantProps): {
  Variant: React.FC;
  Wrappers: Array<React.FC>;
  error: string | null;
} => {
  const [resultIndex, setResultIndex] = useState<number | null>(
    persistResult ? Number(getVariantFromStorage(id)) : null,
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
    } else if (!resultIndex) {
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
    if (resultIndex && persistResult && id?.length > 0) {
      localStorage.setItem(`experiment_result_${id}`, resultIndex.toString());
    }
  }, [id, persistResult, resultIndex]);

  useEffect(() => {
    if (typeof resultIndex !== undefined && onResult && variants) {
      onResult(variants[resultIndex!]);
    }
  }, [onResult, variants, resultIndex]);

  return {
    error,
    Variant: () => {
      if (
        type === 'standard' &&
        variants &&
        typeof resultIndex !== undefined &&
        variants.length - 1 >= resultIndex!
      ) {
        const result = variants[resultIndex!] as Variant;
        return <React.Fragment>{result?.element}</React.Fragment>;
      } else {
        return <React.Fragment />;
      }
    },
    Wrappers: [({ children }) => <React.Fragment key='1'>{children}</React.Fragment>],
  };
};

export const useExperiment = ({
  id,
  variants,
  weights,
  persistResult,
  onResult,
}: UseExperimentProps) => {
  const { Variant } = useVariant({
    type: 'standard',
    id,
    variants,
    weights,
    persistResult,
    onResult,
  });

  return { Variant };
};

export const useExperimentWrappers = ({
  id,
  variants,
  weights,
  persistResult,
  onResult,
}: UseExperimentWrapperProps) => {
  const { Variant } = useVariant({
    type: 'wrapper',
    id,
    variants,
    weights,
    persistResult,
    onResult,
  });

  return { Variant };
};

export const ExampleComponent = () => {
  const { Variant } = useExperiment({
    id: 'test',
    variants: [
      { id: 'A', element: <div key='1'>Test1</div> },
      { id: 'B', element: <div key='2'>Test2</div> },
    ],
  });
  return (
    <div>
      <Variant />
    </div>
  );
};
