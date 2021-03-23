/** @format */

import React, { useEffect, useState } from 'react';
interface ExperimentProps {
  id: string;
  variants: Array<any>;
  weights?: Array<number>;
  persistResult?: boolean;
  onResult?: Function;
}

interface VariantProps {
  experimentId: string;
  variants: Array<any>;
  weights?: Array<number>;
  persistResult?: boolean;
  onResult?: Function;
}

const getWeightedRandomInt = (spec: any): string => {
  let i;
  let j;
  const table = [];
  for (i in spec) {
    for (j = 0; j < spec[i] * 10; j++) {
      table.push(i);
    }
  }
  return table[Math.floor(Math.random() * table.length)];
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
  experimentId,
  variants,
  weights,
  persistResult = false,
  onResult,
}: VariantProps): {
  Variant: React.FC;
  error: string | null;
} => {
  const [variant, setVariant] = useState<string | null>(
    persistResult ? getVariantFromStorage(experimentId) : null,
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
    } else if (!variant) {
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
        setVariant(randomVariant);
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    }
  }, [variants, error, variant, weights]);

  useEffect(() => {
    if (variant && persistResult && experimentId?.length > 0) {
      localStorage.setItem(`experiment_result_${experimentId}`, variant);
    }
  }, [experimentId, persistResult, variant]);

  useEffect(() => {
    if (variant && onResult) {
      onResult();
    }
  }, [onResult, variant]);

  return {
    error,
    Variant: () => {
      if (variants && typeof variant !== null) {
        return <React.Fragment>{variants[variant!]}</React.Fragment>;
      } else {
        return <React.Fragment />;
      }
    },
  };
};

export const useExperiment = ({
  id,
  variants,
  weights,
  persistResult,
  onResult,
}: ExperimentProps) => {
  const { Variant } = useVariant({ experimentId: id, variants, weights, persistResult, onResult });

  return { Variant };
};

export const ExampleComponent = () => {
  const { Variant } = useExperiment({
    id: 'test',
    variants: [<div key='1'>Test1</div>, <div key='2'>Test2</div>],
  });
  return (
    <div>
      <Variant />
    </div>
  );
};
